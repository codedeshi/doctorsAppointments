var mongoose = require('mongoose'),
	length = 3,
	complainlength = 10,
	requiredMessage = '{PATH} cannot be empty',
	error = '`{PATH}` should be at least {MINLENGTH} characters.';

var appointmentsSchema = new mongoose.Schema({
	date		: 	{	
					type 	: Date,
					required:  requiredMessage
	},
	time		: 	{	
					type 	: Date,
					required:  requiredMessage
	},
	complain	: 	{
					type : String, 
					unique : true, 
					required:  requiredMessage,
					minlength: [complainlength , error],
					trim: true
				},
	addedBy	:	{
					type : String,
					required:  requiredMessage,
	},
},  {timestamps: true});

var appointmentsModel = mongoose.model('appointmentsModel', appointmentsSchema);
