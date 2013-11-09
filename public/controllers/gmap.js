
(function () {
	var module = angular.module("angular-google-maps-example", ["google-maps"]);
}());

function ExampleController ($scope, $timeout, $log) {
  
    // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
    google.maps.visualRefresh = true;
	
	angular.extend($scope, {
	    position: {
	      coords: {
	        latitude: 45,
	        longitude: -73
	      }
	    },
		
		/** the initial center of the map */
		centerProperty: {
			latitude: 45,
			longitude: -73
		},
		
		/** the initial zoom level of the map */
		zoomProperty: 4,
		
		/** list of markers to put in the map */
		markersProperty: [ {
				latitude: 45,
				longitude: -74
			}],
			
		// These 2 properties will be set when clicking on the map
		clickedLatitudeProperty: null,	
		clickedLongitudeProperty: null,
		
		eventsProperty: {
		  click: function (mapModel, eventName, originalEventArgs) {	
		    // 'this' is the directive's scope
		    $log.log("user defined event on map directive with scope", this);
		    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
		  }
		}
	});
}


function Ctrl($scope) {
  $scope.items = ['settings', 'home', 'other'];
  $scope.selection = $scope.items[0];
}

function UserGeos($scope, $http){
	var pathArray = window.location.pathname.split('/')
	$http.get('/user/' + pathArray[2] + '/' + pathArray[3] + '/JSON').success(function(data){
		$scope.geos = $.parseJSON(data.data);
	})
}

function UserData($scope, $http){
	var pathArray = window.location.pathname.split('/')
	$http.get('/profile/' + pathArray[3] + '/JSON').success(function(data){
		$scope.user = $.parseJSON(data.data);
		//console.log($scope.user)
	})
	$http.get('/user/' + pathArray[2] + '/' + pathArray[3] + '/JSON').success(function(data){
		$scope.geos = $.parseJSON(data.data);
	})
}

function UserProfile($scope, $http){
	var pathArray = window.location.pathname.split('/')
	$http.get('/profile/' + pathArray[2] + '/JSON').success(function(data){
		$scope.user = $.parseJSON(data.data);

		$scope.dateJoined = (new Date( parseInt( $scope.user._id.toString().substring(0,8) , 16 ) * 1000 )).toString()

		$scope.prependPic = "https://graph.facebook.com/";
		$scope.appendPic = "/picture?width=200&height=200";
		$http.get("https://graph.facebook.com/"+$scope.user.fbId+"?fields=cover").success(function(response) {
		    $scope.coverUrl = response["cover"].source;
		});
		$scope.appendCover = "?fields=cover"
	});
	$http.get('/profile/' + pathArray[2] + '/geos/JSON').success(function(data){
		$scope.geos = $.parseJSON(data.data);
	})
}