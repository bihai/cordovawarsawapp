define(function (require, exports, module) {
var _ = require("../lib/underscore");
var ko = require("../lib/knockout");
var AttractionVM = require("AttractionVM");
var MapVM = require("MapVM");
var QuickSort = require("../util/QuickSort");
var DatabaseHandler = require("../util/DatabaseHandler");

function ResultsListsVM(app) {

    this.refreshListview = function(element) {
        var listview = $(element).closest("[data-role='listview']");
        if (listview.data("mobile-listview")) {
            listview.listview('refresh');
        }
    };
	var self = this;
	this.viewModelName = "resultsListsView";
	this.searchItem = undefined;
	this.attractions = ko.observableArray();
	this.coordinates = {
		lat : undefined,
		lon : undefined
	};
	this.saveBtnClicked = ko.observable();

	this.sortingItems =  {
		items: ko.observableArray(["Nazwa alfabetycznie","Ulica alfabetycznie"]),
        selected: ko.observable("")
		};
	

	this.init = function(results, searchItem) {


		this.searchItem = searchItem;
		this.coordinates.lat = searchItem.lat;
		this.coordinates.lon = searchItem.lon;

        this.attractions(results.map(function (attraction) {
            var viewModel = new AttractionVM(app);
            viewModel.init(attraction, false);
            return viewModel;
        }));
		this.sort(0);
		this.availableMethods();
	};
	

    this.sortingItems.selected.subscribe(function(event) {
        if(event !== undefined) {
            if(event === "Nazwa alfabetycznie") {
                self.sort(0);
             } else if(event === "Ulica alfabetycznie") {
                self.sort(1);
             }else
                self.sort(2);
            self.refreshListview();
        }
    });
	
	 $( window ).on( "pagecontainershow", function( event, ui ) {
		if(ui.prevPage.attr('id') === "attractionSearchView")
			$('select').selectmenu('refresh', true);
	 });
	
    this.availableMethods = function(){
			
            if(self.sortingItems.items.length != 2) {
                self.sortingItems.items.splice(2, 1);
            }

             if(self.coordinates.lat != undefined)  {
               self.sortingItems.items.push('Po odległości');
             }		 
    };
	
	this.showSaveAlert = function() {
		if (this.saveBtnClicked() === "true")
			this.saveBtnClicked("false");
		else
			this.saveBtnClicked("true");

        navigator.notification.confirm(
            'Czy chcesz zapisać atrkacje w pamięci urządzenia? Opcja dla trybu offline aplikacji',
            onConfirm, 'Zapis atrakcji', 
            ['Tak','Nie']
        );

        function onConfirm(buttonIndex) {
            if(buttonIndex == 1)
                self.saveAttractionsInDatabase();
        }

    };

	this.saveAttractionsInDatabase = function() {
			DatabaseHandler.init(this.searchItem);
			DatabaseHandler.deleteAllAttractions();
			try {
				DatabaseHandler.addAttraction(this.attractions());
				alert("Atrakcje zapisano poprawnie!");
			} catch (err) {
				alert("Atrkacje nie zostały zapisane! Spróbuj ponownie");
			}
			DatabaseHandler.getAllAttractions();
		
	};

	this.goToMapView = function() {
		var viewModel = new MapVM(app);
		app.goToMapPage(this.attractions, this.coordinates);
	};

	this.sort = function(type) {	
		var tmp = this.attractions.slice();
		var ret = QuickSort.sort(tmp, type);
		this.attractions(ret);
	};
	
	/*
	this.saveAndRemoveContacts = function() {
         for(i = 0; i < this.attractions().length; i++) {
             self.saveContact(this.attractions()[i]);
         }
        //self.removeContact();
    };

	
    this.removeContact = function(callback) {

        function onError(contactError) {
            alert("Pojawił się problem. Spróbuj zapisać dane kontaktowe atrkacji raz jeszcze. " + contactError.code);
        };

        var deleteContact = function(contacts) {
            if (contacts.length == 0) {
				alert("Kontakty usuniete poprawnie.");
                return;
            }

            var contact = contacts.pop();
            contact.remove(function() {
                deleteContact(contacts);
            }, null);
        };

        navigator.contacts.find(["*"], deleteContact, onError, {
            "multiple": true
        });

    };

    this.saveContact = function(attraction) {

        function onSuccess(contact) {
            alert("Dane kontaktowe atrakcji zapisano poprawnie.");
        };

        function onError(contactError) {
            alert("Pojawił się problem. Spróbuj zapisać dane kontaktowe atrkacji raz jeszcze.");
        };

        var contact = navigator.contacts.create();
        contact.displayName =  attraction.name();
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', attraction.phone(), false);
        contact.phoneNumbers = phoneNumbers;
        var emails = [];
        emails[0] = new ContactField('work', attraction.email(), false);
        contact.emails = emails;
        var adres = []
        adres[0] = new ContactAddress(true, 'work',
			attraction.street() + " " + attraction.number(),
			attraction.street() + " " + attraction.number(),
			'Warszawa', "", "", 'Polska' );
        contact.addresses = adres;

        contact.save(onSuccess,onError);
    }; */

    this.back = function() {
        $.mobile.back();
    }

};

module.exports = ResultsListsVM;
});