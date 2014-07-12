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


// define APIs
app.get('/api', function( request, response) {
	response.send('Library API is running');
});

app.get('/api/books', function( request, response ) {
	return BookModel.find( function( err, books ) {
		if ( !err ) {
			return response.send( books );
		} else {
			return console.log( err );
		}
	});
});

app.post( '/api/books', function( request, response) {
	var book = new BookModel({
		title: request.body.title,
		author: request.body.author,
		releaseDate: request.body.releaseDate
	});

	book.save( function( err ) {
		if ( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});

	return response.send( book );
});

// connect to db
mongoose.connect('mongodb://localhost/library_database');

// db schema
var Book = new mongoose.Schema({
	title: String,
	author: String,
	releaseDate: Date 
});

// db model
var BookModel = mongoose.model('Book', Book);
