myApp.controller('usersController', function($routeParams, $location, userFactory,$cookies) {
	var self = this;
	var errors =[];

	this.user = {};

	this.reset = function(){
		$cookies.put('current_user',null);
	}

	this.register = function(){
		userFactory.register(self.user, function(returned_data){
			if('user' in returned_data){
				self.user ={};
				$location.path('/appointments');
			}
			else {
				error = 'Please put a valid username';
				$location.path('/');
			}
		})
	}
});
