var mongoose = require('mongoose');
var appointments = mongoose.model('appointmentsModel');
var moment = require('moment');

function appointmentsController(){
	var votes;

	this.createAppointment = function(req,res){
		var error =[];
		if (!req.body.time ) {
			error.push("Can only Schecule appointments from 8 am to 5 pm")
		}
		if (!req.body.date) {
			error.push ('only future appointments allowed')
		}
		if(error.length>0){
			console.log("data----------0",error)
			return res.json({errors:error});
		}
		else {
			// var dateCheck = new Date(req.body.date);
			appointments.count({'date': {$gte: req.body.date,$lte: new Date(req.body.date) + 24 * 60 * 60 * 1000 }},function(err,data){
				console.log("data----------1",data);
				if (err){
					return res.json({error:err});
				}
				else if (data >= 3){
					return error.push("All appointments booked for requested date");
				}
				else {
					appointments.find({addedBy:req.body.addedBy,'date': {$gte: req.body.date}}, function(err,data){
						console.log("data----------2",data);
						if (err){
							return res.json({error:err});
						}
						else if (data.length >= 1){
							return error.push("You already have an appointment for that day");
						}
						else {
							console.log("data----------3");
							req.body.date = moment(req.body.date).format("LL");
							console.log(req.body.date);
							var appointment = new appointments(req.body);
								appointment.save(function(err,data){
								if(err) {
									for(key in err.errors){
										error.push(err.errors[key].message)
									}
									res.json({errors: error,data:data});
								}
								else {
									res.json({errors:error,data:data})
								}
							})
						}
					})
				}
			})
		}
	}
	this.getappointments = function(req,res){
		console.log(new Date() === new Date());
		appointments.find({'date': {'$gt':new Date()}}).sort('date').exec(function(err,data){
			res.json(data);
		})
	}
	this.destroy = function(req,res){
		appointments.remove({_id:req.params.id},function(err,data){
			res.json({err:err,data:data});
		})
	}
}

module.exports = new appointmentsController();