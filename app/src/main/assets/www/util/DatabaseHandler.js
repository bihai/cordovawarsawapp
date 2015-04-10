define(function (require, exports, module) {
var CategoryVM = require("CategoryVM");
var GeoVM = require("GeoVM");
  
  var DATABASE_VERSION = 1;
  var DATABASE_NAME = "attractionsDB";
  var TABLE_NAME = "attractions";
 
  var KEY_ID = "id";
  var KEY_NAME = "name";
  var KEY_STREET = "street";
  var KEY_NUMBER = "number";
  var KEY_LAT = "lat";
  var KEY_LON = "lon";
  var KEY_CAT = "category";
  var KEY_DESC = "desc";
  var KEY_IMG = "img";
  var KEY_EMAIL = 'email';
  var KEY_PHONE = 'phone';
  var db;

  var searchItem = undefined;
  	
module.exports = {
	
	init : function(item) {
		searchItem = item;
        db = window.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_NAME, 200000);
        db.transaction(populateDB, errorCB, successCB);

        function populateDB(tx) {
            var query = "CREATE TABLE IF NOT EXISTS " + TABLE_NAME +"("
                + KEY_ID + " INTEGER PRIMARY KEY," + KEY_NAME + " TEXT,"
                + KEY_STREET + " TEXT, " + KEY_NUMBER + " TEXT, "
                + KEY_LAT + " TEXT, " + KEY_LON + " TEXT, "
                + KEY_CAT + " TEXT, " + KEY_DESC + " TEXT, "
                + KEY_EMAIL + " TEXT, " + KEY_PHONE + " TEXT"
                +")";
           tx.executeSql(query);

        }

        function errorCB(tx, err) {
            console.log("Error processing SQL during initialization: "+err);
        }

        function successCB() {
            //console.log("Database initiated ok!");
        }
	},
	
	addAttraction : function(attraction) {
        db.transaction(populateDB, errorCB, successCB);

        function populateDB(tx) {
        	for(k = 0; k < attraction.length; k++) {
        		var sql = 'INSERT INTO ' + TABLE_NAME + '(' + KEY_NAME +','+ KEY_STREET +','+ KEY_NUMBER +','+ KEY_LAT +','+
                    	KEY_LON +','+ KEY_CAT +','+ KEY_DESC + ','+ KEY_EMAIL +','+ KEY_PHONE + ') VALUES (?,?,?,?,?,?,?,?,?)';

        		tx.executeSql(sql, [attraction[k].name(),  attraction[k].street(), attraction[k].number(), attraction[k].lat(), 
        		                    attraction[k].lon(), attraction[k].category(), attraction[k].desc(), attraction[k].email(), attraction[k].phone()]);
        	}
        }

        function errorCB(tx, err) {
            console.log("Error processing SQL during insert: "+err);
        }

        function successCB() {
			console.log("Values inserted OK!");
        }
     

	},
	
	deleteAllAttractions : function() {
		
        db.transaction(populateDB, errorCB, successCB);

        function populateDB(tx) {
            tx.executeSql("DELETE FROM " + TABLE_NAME);

        }

        function errorCB(tx, err) {
            console.log("Error processing SQL during delete: "+err);
        }

        function successCB() {
            console.log("Values deleted ok!");
        }
        

	},
	
	 getAllAttractions : function(callback) {
	 	var attractions = [];
	 	var query = "SELECT * FROM " + TABLE_NAME;
	 	
	 	if (searchItem instanceof CategoryVM) {
	 		query += " where " + KEY_CAT + " = " + "\"" + searchItem.categoryItem + "\"";
	 	} else if (searchItem instanceof GeoVM) {

	 	} else {
	 		query += " where " + KEY_STREET + " = " + "\"" + searchItem.searchItem() + "\"";
	 	}

         function queryDB(tx) {
             tx.executeSql(query, [], querySuccess, errorCB);
         }


         function querySuccess(tx, results) {
             var len = results.rows.length;
            for (var i=0; i<len; i++){
                 var dBname = results.rows.item(i).name;
                 var dBstreet = results.rows.item(i).street;
                 var dBnumber = results.rows.item(i).number;
                 var dBlat = results.rows.item(i).lat;
                 var dBlon = results.rows.item(i).lon;
                 var dBcategory = results.rows.item(i).category;
                 var dBdesc = results.rows.item(i).desc;
                 var dBemail = results.rows.item(i).email;
                 var dBphone = results.rows.item(i).phone;

                 var attr = {name : dBname, street : dBstreet, number : dBnumber, lat : dBlat, lon : dBlon, desc : dBdesc, category : dBcategory, email : dBemail, phone : dBphone};
                 attractions.push(attr);
				 
             }
			 callback(attractions);
         }

         function errorCB(err) {
             console.log("Error processing SQL3: "+err.code);
         }
         db.transaction(queryDB, errorCB);

	 }

};
});