define(function (require, exports, module) {

function CategoryVM(app) {
	
	var self = this;
	this.categoryItem = undefined;
	
	this.init = function(categorySelected) {		
		var categoryLowerCase = categorySelected.toLowerCase();
		self.categoryItem = categoryLowerCase.charAt(0).toUpperCase() + categoryLowerCase.slice(1);
	}; 
	
	this.getAttractions = function (callback, error) {
		app.mainDataModule.getAttractionsByCategory(this.categoryItem, callback, error);
	};
};

module.exports = CategoryVM;
});