myApp.controller('appointmentsController', function($routeParams,$location, appointmentsFactory, userFactory,$cookies) {
	var self = this;
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	this.AppointmentsCreateError = [];
	// this.minDate = new Date(Date.now()+ 24 * 60 * 60 * 1000);
	this.newAppointment = {
		date : new Date(Date.now()+ 24 * 60 * 60 * 1000), 
		time : new Date()
	};
	this.appointmentsCreateError = [];
	this.cu = $cookies.getObject('current_user');

	this.logCheck = function(){
		if (!this.cu) {
			$location.path('/');
		}
	}

	this.logout = function(){
		$cookies.putObject('current_user',null);
		this.cu = $cookies.getObject('current_user');
		$location.path('/');
	}

	this.createAppointment = function() {
		this.logCheck();
		this.newAppointment.addedBy = self.cu.user;
		appointmentsFactory.createAppointment(this.newAppointment,function(returnData) {
			if (returnData.length){
				self.appointmentsCreateError  = returnData;
				$location.path("/newAppointment");
			}
			else {
				self.newAppointment = {
					date : new Date(Date.now()+ 24 * 60 * 60 * 1000), 
					time : new Date(2016, 0, 1, 08, 0, 0)
				};
				$location.path("/appointments");
			}
		});
	}

	this.getAppointments = function(){
		this.logCheck();
		appointmentsFactory.getappointments(function(returnData){
			self.apts = returnData;
		});
	}
	
	this.destroy = function(id){
		this.logCheck();
		appointmentsFactory.destroy(id,function(res){
			self.getAppointments();
		})
	}
})
