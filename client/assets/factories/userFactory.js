myApp.factory('userFactory', function($http,$routeParams,$cookies) {

	function userFactory(){
		var _this = this;

		_this.register = function(user,callback){
			user = {
				user : user
			}
			$http.post('/user',user).then(function(res){
				if ('error' in res.data) {
					callback(res.data);
				}
				else{
					$cookies.putObject('current_user',res.data);
					callback(res.data);
				}
			});
		}
	}
	return new userFactory();
});
