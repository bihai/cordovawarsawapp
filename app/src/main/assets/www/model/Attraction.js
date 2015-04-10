define(function (require, exports, module) {

module.exports = function (data) {
	
	this.name = data.name;
	this.street = data.street;
	this.number = data.number;
	this.lat = data.lat;
	this.lon = data.lon;
	this.url_img = data.url_img;
	this.km = data.km;
	this.email = data.email;
	this.phone = data.phone;
	this.category = data.category;
	this.desc = data.desc;
};
});
