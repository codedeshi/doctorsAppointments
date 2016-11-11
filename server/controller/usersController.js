var mongoose = require('mongoose');
var Users = mongoose.model('userModel');

function usersController(){
	this.register = function(req,res){
		Users.find({user:req.body.user.user},function(err,data){
			if (err){
				return res.json({error:err});
			}
			else if (data.length ==1){
				return res.json(data[0])
			}
			else {
				var user = new Users(req.body.user);
				user.save(function(err,data){
					if (err){
						return res.json({error:err});
					}
					else {
						return res.json(data);
					}
				})
			}
		})
	}
	
}

module.exports = new usersController();