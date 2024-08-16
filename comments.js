// Create web server
var express = require('express');
var app = express();
// Load the comments array
var comments = require('./comments.json');
// Create a GET route that returns all comments
app.get('/comments', function(req, res){
    res.send(comments);
});
// Create a GET route that returns a single comment
app.get('/comments/:id', function(req, res){
    var comment = comments.filter(function(comment){
        return comment.id == req.params.id;
    });
    res.send(comment[0]);
});
// Create a POST route that adds a new comment
app.post('/comments', function(req, res){
    var comment = {
        id: comments.length + 1,
        body: req.body.body
    };
    comments.push(comment);
    res.send(comment);
});
// Create a PUT route that updates a comment
app.put('/comments/:id', function(req, res){
    var comment = comments.filter(function(comment){
        return comment.id == req.params.id;
    })[0];
    var index = comments.indexOf(comment);
    var keys = Object.keys(req.body);
    keys.forEach(function(key){
        comment[key] = req.body[key];
    });
    comments[index] = comment;
    res.send(comment);
});
// Create a DELETE route that deletes a comment
app.delete('/comments/:id', function(req, res){
    var comment = comments.filter(function(comment){
        return comment.id == req.params.id;
    })[0];
    var index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});
// Start the web server
app.listen(3000, function(){
    console.log('Listening on port 3000');
});