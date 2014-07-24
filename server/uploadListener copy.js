// server that listens for file uploads

var express = require('express'),
    http = require('http'),
    path = require('path');

var Percolator = require('percolator').Percolator;
var server = new Percolator({port : 3456});

server.route(

  '*', {  
    PUT : function(req, res){
    	console.log("got PUT request");
		res.object({message : 'heard your PUT request'}).send();    	
	},
    POST : function(req, res){
    	console.log("got POST request");
    	console.log(req);
    	console.log("\n\n*************************\n\n");
    	console.log(res);
		res.object({message : 'heard your POST request'}).send();    	
	},
    GET : function(req, res){
    	console.log("got GET request");
		res.object({message : 'heard your GET request'}).send();    	
	}
	
});


server.listen(function(err){
	if(err){
		console.log(err);
	}
  console.log('server is listening on port ', server.port);
});
