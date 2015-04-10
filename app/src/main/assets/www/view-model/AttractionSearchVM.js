define(function (require, exports, module) {
var _ = require("../lib/underscore");
var ko = require("../lib/knockout");
var StreetVM = require("StreetVM");
var CategoryVM = require("CategoryVM");
var GeoVM = require("GeoVM");
var DatabaseHandler = require("../util/DatabaseHandler");

function AttractionSearchVM(app) {
	
	var self = this;
	this.viewModelName = "attractionSearchView";	
	
	this.searchString = ko.observable("Krakowskie Przedmiescie");
	this.searchItem = undefined;
	this.offlineState = ko.observable();
		
	this.searchAttractions = function() {
		function success(results) {
            if(results.length == 0)
				alert("Brak wyników wyszukiwania, spróbuj raz jeszcze");
			else {
				app.goToSearchResultsPage(results, self.searchItem); 
			}
		}
		
		function error(error) {
            navigator.notification.confirm(
                'Spróbować wczytać atrakcje z pamięci urządzenia?',
                onConfirm,
                'Odczyt atrakcji',
                ['Tak','Nie']
            );

            function onConfirm(buttonIndex) {
                if(buttonIndex == 1)
                    self.getAttractionsFromOfflineDatabase();
            }
		}
		
		self.searchItem.getAttractions(success, error);
	};
	
	this.getAttractionsFromOfflineDatabase = function() {
		DatabaseHandler.init(self.searchItem);
		DatabaseHandler.getAllAttractions(function (results) {
            if (results.length == 0) {
                alert("Niestety baza danych nie zawiera żadnych pasujących atrakcji");
            } else
                app.goToSearchResultsPage(results, self.searchItem);
        });

	};	
	
	this.streetItemSearch = function() {
		self.searchItem = new StreetVM(app);
		self.searchItem.init(self.searchString);
		this.searchAttractions();
	};
	
	this.categoryItemSearch = function(category) {
		self.searchItem = new CategoryVM(app);
		self.searchItem.init(category);
		self.searchAttractions();
	};
	
	
	this.myLocationItemSearch = function () {

		function success(result) {
			self.searchItem = new GeoVM(app);
			self.searchItem.init(result.coords.latitude, result.coords.longitude);
			//self.searchItem.init("52.257953", "20.977423");
			self.searchAttractions();	
		}
		
		function error(error) {
			alert("Przykro mi, nie mogę pobrać Twojej lokalizacji. Proszę upewnij się, że masz włączone udostępnianie lokalizacji i spróbuj ponownie");
		}

        navigator.geolocation.getCurrentPosition(success, error, { maximumAge: 0, enableHighAccuracy: true });
		
	};

}

module.exports = AttractionSearchVM;
});
