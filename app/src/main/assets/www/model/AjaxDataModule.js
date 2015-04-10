define(function (require, exports, module) {
var server = require('../service/SERVICE');

module.exports = function () {
  var _ = require("../lib/underscore");
  var $ = require("../lib/jquery");

  this.callRequest = function(_url, params, callback, error) {
 
      $.ajax({
          timeout:5000,
          url: _url,
          type: "GET",
          contentType: "application/json; charset=utf-8",
          data: params,
          success:function(result){
              if ( callback ) {
                  callback( result );
              }
          },
          error:function(err){
              if ( error ){
                  error( err );
              }
          }
      });
    };
  
  this.getAttractions = function (streetItem, callback, error) {
  		
  		var _url = server.url + "atrakcje";
  		var params = {
  			p : streetItem
  		};
  	
  	this.callRequest(_url, params, callback, error);
  };
  
  this.getAttractionsByCategory = function (categoryItem, callback, error) {
  		
  		var _url = server.url + "atrakcje";
  		var params = {
  			q : categoryItem
  		};
  	
  	this.callRequest(_url, params, callback, error);
  };
  
  this.getAttractionsByGeo = function(latitude, longitude, callback, error) {
  		
  		var _url = server.url + "location";
  		var params = {
  			lat : latitude,
  			lon: longitude
  		};
  		
  	this.callRequest(_url, params, callback, error);
  };
  
  
};
});