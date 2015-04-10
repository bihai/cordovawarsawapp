define(function (require, exports, module) {
var _ = require("../lib/underscore");
var ko = require("../lib/knockout");
var cordova =  require("../lib/cordova");
var server = require('../service/SERVICE');

function AttractionVM(app) {

	var that = this;
	this.name = ko.observable();
	this.desc = ko.observable();
	this.street = ko.observable();
	this.number = ko.observable();
	this.lat = ko.observable();
	this.lon = ko.observable();
	this.url_img = ko.observable();
	this.km = ko.observable();
	this.email = ko.observable();
	this.phone = ko.observable();
	this.category = ko.observable();
    this.all = ko.observableArray();

	this.viewModelName = "attractionView";


	this.init = function(attraction, wasInit) {
		this.name(ko.utils.unwrapObservable(attraction.name));
		this.desc(ko.utils.unwrapObservable(attraction.desc));
		this.street(ko.utils.unwrapObservable(attraction.street));
		this.number(ko.utils.unwrapObservable(attraction.number));
		this.lat(ko.utils.unwrapObservable(attraction.lat));
		this.lon(ko.utils.unwrapObservable(attraction.lon));
		this.url_img(ko.utils.unwrapObservable(attraction.url_img));
		this.km(ko.utils.unwrapObservable(attraction.km));
		this.email(ko.utils.unwrapObservable(attraction.email));
		this.phone(ko.utils.unwrapObservable(attraction.phone));
		this.category(ko.utils.unwrapObservable(attraction.category));

		if(!wasInit)
			this.prepareUrl();
	};

	this.goToAttraction = function() {
        app.goToAttractionPage(this);
	};

    this.attractionForMap = function() {
		that.all.push({lat: this.lat, lon: this.lon, name: this.name });
    }

    this.back = function() {
        $.mobile.back();
    }
	
	this.prepareUrl = function() {
		this.url_img(server.url + this.url_img() + ".jpg");
	}

	this.saveContact = function() {

        function onSuccess(contact) {
            alert("Dane kontaktowe atrakcji zapisano poprawnie.");
        };

        function onError(contactError) {
            alert("Pojawił się problem. Spróbuj zapisać dane kontaktowe atrakcji raz jeszcze.");
        };

        var contact = navigator.contacts.create();
        contact.displayName =  this.name();
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('work', this.phone(), false);
        contact.phoneNumbers = phoneNumbers;
        var emails = [];
        emails[0] = new ContactField('work', this.email(), false);
        contact.emails = emails;
        var adres = []
        adres[0] = new ContactAddress(true, 'work',
			this.street() + " " + this.number(),
			this.street() + " " + this.number(),
			'Warszawa', "", "", 'Polska' );
        contact.addresses = adres;

        contact.save(onSuccess,onError);
	};
};

module.exports = AttractionVM;
});
