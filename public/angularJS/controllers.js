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