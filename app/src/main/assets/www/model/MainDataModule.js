define(function (require, exports, module) {
var _ = require("../lib/underscore");
var AjaxDataModule = require("../model/AjaxDataModule");
var Attraction = require("../model/Attraction");

function MainDataModule() {
	
	var self = this;
	this.ajaxDataModule = new AjaxDataModule();
	
	this.parseResponse = function(response) {
        var json = JSON.parse(response);
		var attractions = [], attraction;
		
		_.each(json.atrakcje, function(value) {
			attraction = new Attraction({
				name: value.nazwa,
				street : value.ulica,
				number : value.lokal,
				lat : value.lat,
				lon : value.lon,
				url_img : value.link,
				km : value.km,
				email : value.email,
				phone : value.numer,
				category : value.kategoria,
				desc : value.opis
			});


			
			attractions.push(attraction);
		});
		
		return attractions;
	};
	
	this.getAttractions = function (streetItem, callback, error) {
		this.ajaxDataModule.getAttractions(streetItem, 
		function(response) {
			callback(self.parseResponse(response));	
		}, error);
	};
	
	this.getAttractionsByCategory = function (categoryItem, callback, error) {
		this.ajaxDataModule.getAttractionsByCategory(categoryItem, 
		function(response) {
			callback(self.parseResponse(response));	
		}, error);
	};
	
	this.getAttractionsByGeo = function (lat, lon, callback, error) {
		this.ajaxDataModule.getAttractionsByGeo(lat, lon, 
		function(response) {
			callback(self.parseResponse(response));	
		}, error);
	};
	
}

module.exports = MainDataModule;

});
