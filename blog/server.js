var express = require('express');
var path    = require('path');
var Bourne  = require("bourne");

var app      = express();
var posts    = new Bourne("simpleBlogPosts.json");
var comments = new Bourne("simpleBlogComments.json");

app.configure(function () {
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/*', function (req, res) {
    res.render("index.ejs");
});

app.listen(8888);
