var application_root = __dirname,
		express = require('express'),
		path = require('path'),
		mongoose = require('mongoose');

var app = express();

app.configure( function() {
	//parses request body and populates request.body 
	app.use( express.bodyParser() );
	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );
	//perform route lookup based on URL and HTTP method
	app.use( app.router );
	//Where to serve static content
	app.use( express.static( path.join( application_root, 'public_html') ) );
	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

var port = 4711;
app.listen( port, function() {
	console.log('Express server listening on port %d in %s mode', port, app.settings.env );
});
