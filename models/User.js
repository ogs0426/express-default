var mongoose = require('mongoose')
var	Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
	// id: Number,
	username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
	firstName: String,
    lastName: String,
    userStatus: { type: Number, default: 0 },

    /*
    SchemaType
	// carriers: Array,
    // manufacturer: mongoose.Schema.ObjectId,
    String
    Number
    Date
    Buffer
    Boolean
    Mixed
    Objectid
    Array 
    */
    
});

exports.model = mongoose.model('user', userSchema);

exports.def =  
	{
		"Phone":{
			"id":"Phone",
			"required": ["_id", "carriers", "manufacturer", "name", "status"],
			"properties":{
				"_id":{
					"type":"integer",
					"format": "int64",
					"description": "Phone unique identifier",
					"minimum": "1"
				},
				"carriers":{
					"type":"array",
					"description": "The carriers that offer this phone"
				},
				"manufacturer":{
					"type":"string",
					"description": "Name of which company makes this phone"
				},
				"name":{
					"type":"string",
					"description": "Name of the phone"
				},
				"status":{
					"type":"string",
					"description": "Availability status"
				}
			}
		}
};
