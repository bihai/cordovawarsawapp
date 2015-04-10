var typeFLG;
function swap(array, indexA, indexB) {
    var temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
  }
  
  function chooseElementToSort(array, index) {
  	if (typeFLG == 0) {
  		return array[index].name().toLocaleString();
  	} else if (typeFLG == 1) {
  		return array[index].street().toLocaleString();
  	} else {
  		return array[index].km();
  	}
  }
  
  function strcmp ( str1, str2 ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +      input by: Steve Hilder
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: gorthaur
    // *     example 1: strcmp( 'waldo', 'owald' );
    // *     returns 1: 1
    // *     example 2: strcmp( 'owald', 'waldo' );
    // *     returns 2: -1

    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}
  
 
 
  /**
   * Partitions the (sub)array into values less than and greater
   * than the pivot value
   *
   * @param {Array} array The target array
   * @param {int} pivot The index of the pivot
   * @param {int} left The index of the leftmost element
   * @param {int} left The index of the rightmost element
   */
  function partition(array, pivot, left, right) {
    var storeIndex = left,
        pivotValue = chooseElementToSort(array, pivot);
 
    // put the pivot on the right
    swap(array, pivot, right);
 
    // go through the rest
    for(var v = left; v < right; v++) {
 
      // if the value is less than the pivot's
      // value put it to the left of the pivot
      // point and move the pivot point along one
      var tmp = chooseElementToSort(array, v);
      if(strcmp(tmp, pivotValue) == -1) {
        swap(array, v, storeIndex);
        storeIndex++;
      }
    }
 
    // finally put the pivot in the correct place
    swap(array, right, storeIndex);
 
    return storeIndex;
  }
 
  /**
   * Sorts the (sub-)array
   *
   * @param {Array} array The target array
   * @param {int} left The index of the leftmost element, defaults 0
   * @param {int} left The index of the rightmost element,
   defaults array.length-1
   */
  function sorting(array, left, right) {
 
    var pivot = null;
 
    if(typeof left !== 'number') {
      left = 0;
    }
 
    if(typeof right !== 'number') {
      right = array.length - 1;
    }
 
    // effectively set our base
    // case here. When left == right
    // we'll stop

    if(left < right) {
 
      // pick a pivot between left and right
      // and update it once we've partitioned
      // the array to values < than or > than
      // the pivot value
      pivot     = left + Math.ceil((right - left) * 0.5);
      newPivot  = partition(array, pivot, left, right);
      // recursively sort to the left and right
      sorting(array, left, newPivot - 1);
      sorting(array, newPivot + 1, right);
    }
    
 
 
  }
define(function (require, exports, module) {
module.exports = {
	
	sort : function(attractions, type) {
		typeFLG = type;
		sorting(attractions, 0, attractions.length - 1);
		return attractions;
	}
	
	
	
};

});