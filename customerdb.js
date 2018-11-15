var mysql = require('mysql');

module.exports = 
{
	hello: function() { return "hello"; },
	
	CustomerDB: function () {
		var results;
		var mysql = require('mysql');
		var hello = "hello";

		var connection = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "admin",
		  database: "devl"
		});

		connection.connect();
		console.log("connected to DB");

		this.getCustomers = function(callback) {
			connection.query('SELECT * FROM customer', function(err, rows) 
			{
			  if (err) 
				  callback(err,null);
			  else {
				  callback(null,rows);
				  this.results = rows;
			  }
			});
			return 0;
		};
		 
		this.getCustomerByID = function(id) {
			console.log('id = ' + id.toString());
			//cursor = self.db.cursor()
			//cursor.execute("select lastname, firstname from customer where customerid = %s" % (id) );
			//results = cursor.fetchone();
			//customerjson = '{"last":"' + results[last_name_pos] + '","first":"' + results[first_name_pos] +
			'"}';
			customerjson = '{"last":"Wayne","first":"John","street":"555 East St","city":"Anytown","state":"CA","zip":"30000","phone":"555-200-1234"}';
			console.log(customerjson);
			return customerjson
		}
			
		var closeConnection = function() {
			connection.end();
		};
	}
}