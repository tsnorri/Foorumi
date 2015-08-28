FoorumApp.controller('TopicsListController', function($scope, $location, Api){
	$scope.newTopic = {};
	
	Api.getTopics().success(function(data, status, headers, config) {
		$scope.topics = data;
	}).error(function(data, status, headers, config) {
		alert(":( " + status + " " + data);
	});
	
	$scope.addTopic = function() {
		Api.addTopic($scope.newTopic).success(function(data, status, headers, config) {
			//$scope.topics.push(data);
			$location.path("/topics/" + data.id);
		}).error(function(data, status, headers, config) {
			alert(":( " + status + " " + data);
		});
	};
});
