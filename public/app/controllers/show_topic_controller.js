FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api) {
	$scope.newMessage = {};

	Api.getTopic($routeParams.id).success(function(data, status, headers, config) {
		$scope.topic = data;
	}).error(function(data, status, headers, config) {
		alert(":( " + status + " " + data);
	});
	
	$scope.sendMessage = function() {
		Api.addMessage($scope.newMessage, $scope.topic.id).success(function(data, status, headers, config) {
			//$scope.topic.Messages.push(data);
			$location.path("/messages/" + data.id);
		}).error(function(data, status, headers, config) {
			alert(":( " + status + " " + data);
		});
	};
});
