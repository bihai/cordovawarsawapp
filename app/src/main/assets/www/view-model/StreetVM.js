define(function (require, exports, module) {

function StreetVM(app) {
	
	this.searchItem = undefined;
	
	this.init = function (newItem) {
		this.searchItem = newItem;
	};
	
	this.getAttractions = function (callback, error) {
		app.mainDataModule.getAttractions(this.searchItem, callback, error);
	};
}

module.exports = StreetVM;
});