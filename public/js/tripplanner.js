$( document ).ready(function() {
    $('.selection-panel').on('click','button',function(){
    	var $button = $(this);

    	var $selected = $button.siblings('select').find('option:selected');
    	typeName = $button.siblings('h4').text();
    	//console.log($selected, $selected.text());
    	console.log("hotels",all_hotels);
    	console.log("name",typeName);
    	var typeArray = getType(typeName);
    	var eName = $selected.text();
    	var typeStr = typeArray[1];
    	var result =  $.grep(typeArray[0], function(e){
    		return e.name==eName;
    	});
    	var $itineraryList = $(typeStr).children('.list-group')
    	.append('<div class="itinerary-item"><span class="title">'+eName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    	//console.log($itineraryList);
    	//append to itinerary, the text
    	//update the map
    });
});

//function that searches thingstodo
//
var getType = function(typeName){

	if(typeName == 'Hotels'){
		return [all_hotels,'#hotel-list'];
	}
	else if(typeName =='Restaurants'){
		return [all_restaurants,'#restaurant-list'];
	}
	else if(typeName== 'Things To Do'){
		return [all_things_to_do,'#things-list'];
	}
};