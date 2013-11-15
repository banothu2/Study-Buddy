
(function () {
	var module = angular.module("angular-google-maps-example", ["google-maps"]);
}());

function ExampleController ($scope, $timeout, $log, $http) {
  
    // Enable the new Google Maps visuals until it gets enabled by default.
    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
    google.maps.visualRefresh = true;
    var mapPoints = new Array(); 

	var pathArray = window.location.pathname.split('/')
	$http.get('/user/UIUC/kbanothu/JSON').success(function(data){
		$scope.geos = $.parseJSON(data.data);
		console.log($scope.geos.length);
		for(var i = 0; i < $scope.geos.length; i++){
			mapPoints[i] = {
				latitude: $scope.geos[i].latitude,
				longitude: $scope.geos[i].longitude
			}
		}
	})

	angular.extend($scope, {
	    position: {
	      coords: {
	        latitude: 40.109789,
	        longitude: -88.227261
	      }
	    },
		
		/** the initial center of the map */
		centerProperty: {
			latitude: 40.109789,
			longitude: -88.227261
		},
		
		/** the initial zoom level of the map */
		zoomProperty: 15,
		
		/** list of markers to put in the map */
		markersProperty: mapPoints, 
			

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

	var access_token;
	/*$http.get('https://graph.facebook.com/oauth/access_token?client_id=532629850094137&client_secret=03e0c0e52c7d3b1987c219c27d30c9a0&grant_type=client_credentials').success(function(data){
		$scope.access_token = data;
		console.log($scope.access_token)
	}) */


	//https://graph.facebook.com/kbanothu/fql?q=SELECT+uid,+name,is_app_user+FROM+user+WHERE+is_app_user+AND+uid+IN+(SELECT+uid2+FROM+friend+WHERE+uid1+=+me())&access_token?client_id=532629850094137&client_secret=03e0c0e52c7d3b1987c219c27d30c9a0
	$http.get('https://graph.facebook.com/kbanothu/fql?q=SELECT+uid,+name,is_app_user+FROM+user+WHERE+is_app_user+AND+uid+IN+(SELECT+uid2+FROM+friend+WHERE+uid1+=+me())&access_token=CAAHkbI0CZBjkBAFGSGRoIGFQZBZBFm7NCwNA5UNLBZBUF6wZAuCoojDRv4XSMhJ7Jjgoj2S3ZBf7XhAJ6GF5kbcVqcnv5qB6npkZCXWP4dG9RrZB03NocuashHXH3O5KPOV3nGyTKEZC0GUtSFQoiwOmdE62OyZApOjlviJxTAVS09XZAws4rviZBPF08jrRMPZAK06mLebcQ9lOFhQZDZD').success(function(data){
		$scope.friends = data.data;
		$scope.friendsCount = $scope.friends.length
	}) 

	// https://graph.facebook.com/kbanothu/friends?fields=installed,name&access_token=532629850094137|03e0c0e52c7d3b1987c219c27d30c9a0
   /* $http.get('https://graph.facebook.com/kbanothu/fql?q={SELECT uid, name,is_app_user FROM user WHERE is_app_user AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())}').success(function(data){
    	$scope.friends = data.data;
    	console.log($scope.friends)
    }) */
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