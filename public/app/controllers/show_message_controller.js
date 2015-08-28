FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
	$scope.newReply = {};

	Api.getMessage($routeParams.id).success(function(data, status, headers, config) {
		$scope.message = data;
	}).error(function(data, status, headers, config) {
		alert(":( " + status + " " + data);
	});
	
	$scope.sendReply = function() {
		Api.addReply($scope.newReply, $scope.message.id).success(function(data, status, headers, config) {
			$scope.message.Replies.push(data);
			$scope.newReply = {};
		}).error(function(data, status, headers, config) {
			alert(":( " + status + " " + data);
		});
	};
});
