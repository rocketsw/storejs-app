var customerdb = require('./customerdb.js'),
    express = require( 'express' ),
    serveStatic = require( 'serve-static' );

var custDB = new customerdb.CustomerDB();

var app = express();
app.use(express.static('public'));

const port = 3001;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get( '/customers', ( req, res ) => {
  custDB.getCustomers( getCustomerCallback(res) );
} );
	
function callback(err,data){
	if (err) {
		// error handling code goes here
		console.log("ERROR : ",err);            
	} else {            
		// code to execute on data retrieval
		console.log(data[0]);
		console.log(data.length);
	}
}

var getCustomerCallback = function(response) { 
    var innerCallback = function (err,data) {
		var res = response;
		if (err) {
			// error handling code goes here
			console.log("ERROR : ",err);            
		} else {            
			// code to execute on data retrieval
			console.log(data[0]);
		
			var customerjson = '[';
			for(i=0; i< data.length; i++ ) {
				if( customerjson.length > 1 ) {
					customerjson = customerjson + ',';
				}
				customerjson = customerjson + '{"id":"' + data[i].CustomerID.toString() + '","first":"' + data[i].FirstName + '","last":"' + data[i].LastName  + '","street":"' + data[i].Street + '","city":"' + data[i].City + '","state":"' + data[i].State + '","zip":"' + data[i].Zipcode + '","phone":"' + data[i].Phone + '"}';
			}
		}
        customerjson = customerjson + ']';
        console.log('customerjson: ' + customerjson );
		
		res.write( customerjson );
		res.end();
	} 
	return innerCallback;
}



