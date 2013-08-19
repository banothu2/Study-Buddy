'use strict';

// function Test($scope, $http){
// 	$http.get('/test').success(function(data){
// 		$scope.teams = $.parseJSON(data.data);
// 	})
// }

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
		$scope.prependPic = "https://graph.facebook.com/";
		$scope.appendPic = "/picture?width=200&height=200";
		$http.get("https://graph.facebook.com/"+$scope.user.fbId+"?fields=cover").success(function(response) {
		    $scope.coverUrl = response["cover"].source;
		});
		$scope.appendCover = "?fields=cover"
	})
}