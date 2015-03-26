$( document ).ready(function() {
		var hotelExists = false;
    	var restaurantLocations = [];
    	var thingToDoLocations = [];
    	initialize_gmaps();
    	var lastHotelId;

    $('.selection-panel').on('click','button',function(){
    	var $button = $(this);


    	var $selected = $button.siblings('select').find('option:selected');
    	typeName = $button.siblings('h4').text();

    	var typeArray = getType(typeName);
    	var eName = $selected.text();
    	var typeStr = typeArray[1];
    	var result =  $.grep(typeArray[0], function(e){
    		return e.name==eName;
    	});

    	var $locationListElement = $(typeStr).children('.list-group');
    	if(typeStr[1]=='h' && hotelExists){
    		//deletes marker
    		deleteMarker(lastHotelId);
    		// updates list - replace existing
    		$locationListElement.find('span').text(eName);
    	}
    	else{
	    	$locationListElement
	    	.append('<div class="itinerary-item"><span class="title">'
	    		+eName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
		}

    	var locationArr = result[0].place[0].location;
    	if(typeStr[1]=='h'){
			hotelExists = true;
			lastHotelId = drawLocation(locationArr, {
	          icon: '/images/lodging_0star.png'
	        }, eName, typeStr);
	    }
		else if(typeStr[1]=='r'){
			drawLocation(locationArr, {
	        	icon: '/images/restaurant.png'
	      	},eName, typeStr);
	    }
		else if(typeStr[1]=='t'){
			drawLocation(locationArr, {
            	icon: '/images/star-3.png'
          	},eName, typeStr);

		}


    	//update the map
    });

	$('.itinerary-panel').on('click','button',function(){
		// var marker = getMarker(markers,'Tamarind');
		// console.log(marker);
		var $button = $(this);
		var placeName = $button.siblings('span').text();
    	
		var markerToRemove = getMarker(markers, placeName);
		if(markerToRemove.type[1] =='h'){
			hotelExists =false;
		}
		deleteMarker(markerToRemove.id);
		//if we just deleted a hotel, make hotelExists=false or hotelExistsArr=[]
		$button.parent().remove();
	});

	$('.day-buttons').on('click','button',function(){
		var $button= $(this);

		var numOfDays = $('.day-buttons').children().length-1;
		if($button.text() =='+'){
			$button.prev().after('<button class="btn btn-circle day-btn">'+(numOfDays+1)+'</button>');
		}
		else{
			$button.siblings().removeClass('current-day');
			$button.addClass('current-day');
		}
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

var getMarker = function(markers, eName){
	return $.grep(markers, function(marker){
    		return marker.name==eName;
    	})[0];
};
