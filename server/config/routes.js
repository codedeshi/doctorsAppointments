var mongoose = require('mongoose');

var uc = require('../controller/usersController.js');  
var ac = require('../controller/appointmentsController.js');


module.exports = function(app){
	app.post('/user', uc.register);
	app.post('/createAppointment', ac.createAppointment);
	app.get('/getappointments', ac.getappointments);
	app.delete('/destroy/:id', ac.destroy);
}
