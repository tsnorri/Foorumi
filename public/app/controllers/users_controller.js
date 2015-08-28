FoorumApp.controller('UsersController', function($scope, $location, Api){
	$scope.user = {};
	$scope.errorMessage = "";
	
	$scope.login = function() {
		$scope.errorMessage = "";
		
		Api.login($scope.user)
			.success(function(user) {
				$location.path("/");
			})
			.error(function() {
				$scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
			});
			
		$scope.user = {};
	};
	
	$scope.register = function() {
		$scope.errorMessage = "";
		
		Api.register($scope.user)
			.success(function(user) {
				$location.path("/");
			})
			.error(function(error) {
				$scope.errorMessage = error.error;
			});
			
		$scope.user = {};
	};
});
