define(function (require) {
var _ = require("../lib/underscore");
var ko = require("../lib/knockout");
var $ = require("../lib/jquery");

	var viewAfterBindings = {};
	var viewModels = {};	
	this.viewModelStack = ko.observableArray();
	this.mainDataModule = new (require("../model/MainDataModule"))();
	
	this.goToMainPage = function() {
		this.viewModelStack.push(viewModels.attractionSearch);
	};
	
	this.goToSearchResultsPage = function(results, searchItem) {
		viewModels.searchResults.init(results, searchItem);
		this.viewModelStack.push(viewModels.searchResults);
	};
	
	this.goToAttractionPage = function(attraction) {
		viewModels.attraction.init(attraction, true);
        viewModels.attraction.attractionForMap();
		this.viewModelStack.push(viewModels.attraction);
	};
	
	this.goToMapPage = function(attractions, coords) {
		viewModels.map.init(attractions, coords);
		this.viewModelStack.push(viewModels.map);
	};
	 
  	this.getCurrentVM = ko.computed(function () {
  		return this.viewModelStack()[this.viewModelStack().length - 1];
  	}, this);
  	
  	this.getCurrentViewName = ko.computed(function() {
  		var viewModel = this.getCurrentVM();
		if(viewModel)
			return viewModel.viewModelName;
  		
		return "";
  	}, this);
  
 
  this.goToNextView = function(view) {
	$.mobile.changePage(view);
  };
  
   this.backToLastPage = function () {
    	this.viewModelStack.pop();
  };
  
	function setUp() {
		viewModels.attractionSearch = new (require("AttractionSearchVM"))(this);
		viewModels.searchResults = new (require("ResultsListsVM"))(this);
		viewModels.attraction = new (require("AttractionVM"))(this);
		viewModels.map = new (require("MapVM"))(this);
		
		$.mobile.defaultPageTransition = "slide";
		$(document).bind("pagechange", function (event, args) {
			if (args.options.reverse) {
				backToLastPage();
			}
		});
	}
  
    function init() {
        var lastViewStackLen = viewModelStack().length;
        getCurrentVM.subscribe(function (viewModel) {			
            var viewStackLen = viewModelStack().length;
			var viewName = getCurrentViewName();
            if (viewAfterBindings[viewName] === undefined) {
				var view = $("#" + viewName);
                viewAfterBindings[viewName] = view;
                ko.applyBindings(viewModel, view[0]);
            }
			
            if (lastViewStackLen < viewStackLen) {
				goToNextView(viewAfterBindings[viewName]);
            } 
            lastViewStackLen = viewStackLen;
        });

        goToMainPage();

    }

	setUp();
	//init();
	document.addEventListener("deviceready", init, false);
});
