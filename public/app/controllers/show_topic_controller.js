FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api) {
	Api.getTopic($routeParams.id).success(function(data, status, headers, config) {
		$scope.topic = data;
	}).error(function(data, status, headers, config) {
		alert(":( " + status + " " + data);
	});
});
