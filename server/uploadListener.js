// server that listens for file uploads

var express = require('express'),
    http = require('http'),
    path = require('path');

var Percolator = require('percolator').Percolator;
var server = new Percolator();
server.port= 3456;

server.route(

  '*', {  
    PUT : function(req, res){
    	console.log("got request");
	}
	
});


server.listen(function(err){
  console.log('server is listening on port ', server.port);
});
