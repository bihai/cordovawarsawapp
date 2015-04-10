define(function (require, exports, module) {

function GeoVM(application) {
	
	var self = this;
	this.lat = undefined;
	this.lon = undefined;
	
	this.init = function(lat, lon) {
		self.lat = lat;
		self.lon = lon;	
	};
	
	this.getAttractions = function (callback, error) {
		application.mainDataModule.getAttractionsByGeo(this.lat, this.lon, callback, error);
	};
	
};

module.exports = GeoVM;
});