//command line app read data from three types of input files. Do data parse and sort.
var fs = require('fs');
var readline = require('readline');
//use 'request' or 'http' method post data from client side to server side.
var request = require('request');
var http = require('http');
var methods = require('./methods.js');

$.ajax({
    url: "/save",
    type: "POST",
    dataType: "json",
    data: {objectData: someObject},
    contentType: "application/json",
    cache: false,
    timeout: 5000,
    complete: function() {
      //called when complete
      console.log('process complete');
    },

    success: function(data) {
      console.log(data);
      console.log('process sucess');
   },

    error: function() {
      console.log('process error');
    },
  });