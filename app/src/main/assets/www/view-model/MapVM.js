define(function (require, exports, module) {
var _ = require("../lib/underscore");
var ko = require("../lib/knockout");


function MapVM(app) {
	
	var self = this;
	
	this.viewModelName = "mapView";
	this.attractions = ko.observableArray();
    this.coordinates = { lat: ko.observable(), lon: ko.observable() };
	
	this.init = function(data, coords) {
		self.coordinates.lat(coords.lat);
		self.coordinates.lon(coords.lon);

        var markers = [];
        if(coords.lat != undefined) {
            var myPosition = {
                lat: coords.lat,
                lon: coords.lon,
                name: "Tu jesteś!"
            };
            markers.push(myPosition);
        }


		for(i = 0; i < data().length; i++) {
			var attraction = {
					lat: data()[i].lat(),
					lon: data()[i].lon(),
					name: data()[i].name(),
					street: data()[i].street(),
					number: data()[i].number()
				};
			markers.push(attraction);

		}
        self.attractions(markers);
	};

    this.back = function() {
        $.mobile.back();
    }

	//http://stackoverflow.com/questions/10776516/centering-map-around-multiple-points-annotations-on-the-map-titanium-mobile
    this.center = function ()
    {

        var total_locations = self.attractions().length;
        var minLongi = null, minLati = null, maxLongi = null, maxLati = null;
        var totalLongi = 0.0, totalLati = 0.0;

        for(var i = 0; i < total_locations; i++)
        {
            if(minLati == null || minLati > self.attractions()[i].lat) {
                minLati = self.attractions()[i].lat;
            }
            if(minLongi == null || minLongi > self.attractions()[i].lon) {
                minLongi = self.attractions()[i].lon;
            }
            if(maxLati == null || maxLati < self.attractions()[i].lat) {
                maxLati = self.attractions()[i].lat;
            }
            if(maxLongi == null || maxLongi < self.attractions()[i].lon) {
                maxLongi = self.attractions()[i].lon;
            }
        }

        var ltDiff = maxLati-minLati;
        var lgDiff = maxLongi-minLongi;
        var delta = ltDiff>lgDiff ? ltDiff : lgDiff;
        var retValue = {lat: (maxLati+minLati)/2, lon: (maxLongi+minLongi)/2, delta: delta};
        if(total_locations>0 && delta>0)
        {
            return retValue;
        }

    }
    
	
		ko.bindingHandlers.map = {
          init: function (element, valueAccessor, allBindings) {
    	  
              var mapObj = ko.utils.unwrapObservable(valueAccessor());
              var mapOptions = {
                  zoom: 12,
                  mapTypeId: google.maps.MapTypeId.ROADMAP};

              markers = [];
              var divType = allBindings.get('divType');
              
              if(divType == 1)
                bigGoogleMap = new google.maps.Map(element, mapOptions);
              else
                smallGoogleMap = new google.maps.Map(element, mapOptions);
          },
          update: function (element, valueAccessor, allBindings) {
              var mapObj = ko.utils.unwrapObservable(valueAccessor());
              var center = allBindings.get('centerMap');
              center !== false ? centerVar = center() : 
								 centerVar = {  lat: ko.utils.unwrapObservable(mapObj[0].lat),
												lon: ko.utils.unwrapObservable(mapObj[0].lon) 
											 };

              allBindings.get('divType') == 1 ? googleMap = bigGoogleMap : googleMap = smallGoogleMap;
             
			 //to do
              $("#map").click(function(){
                  google.maps.event.trigger(googleMap, 'resize');
              });
              $("#mapDiv").click(function(){
                  google.maps.event.trigger(googleMap, 'resize');
              });

              var latLng = new google.maps.LatLng(centerVar.lat, centerVar.lon);
              googleMap.panTo(latLng);
              var infowindow = new google.maps.InfoWindow();
              markers = [];

              for(i = 0; i < mapObj.length; i++) {
                var latLng = new google.maps.LatLng(
                    ko.utils.unwrapObservable(mapObj[i].lat),
                    ko.utils.unwrapObservable(mapObj[i].lon));
                
				var marker = new google.maps.Marker({
                   position: latLng,
                   map: googleMap,
                   title: ko.utils.unwrapObservable(mapObj[i].name)
                });
                
				google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent('<h3>' + this.title + '</h3>');
                    infowindow.open(googleMap,this);
                });
                markers.push(marker);
              }

          }
      };	  

};

module.exports = MapVM;
});