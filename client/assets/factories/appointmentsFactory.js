myApp.factory('appointmentsFactory', function($http,$routeParams) {
		function appointmentsFactory(){
		var _this = this;

		this.createAppointment = function(newAppointment,callback){
			$http.post("/createAppointment",newAppointment).then(function(returnedData){
				if (returnedData.data.errors.length == 0) {
					console.log(returnedData.data.errors.length)
					callback(returnedData.data.data);
				}
				else {
					callback(returnedData.data.errors)
				}
			})
		}
		this.getappointments = function(callback){
			$http.get("/getappointments").then(function(returnedData){
				callback(returnedData.data);
			})
		}
		this.destroy = function(id,callback){
			$http.delete("/destroy/"+id).then(function(res){
				callback(res);
			})
		}
	}
	return new appointmentsFactory();
});
