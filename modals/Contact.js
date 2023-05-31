const mongoose = require('mongoose');
 
const ContactSchema = new mongoose.Schema({
	firstname: { type: String,  trim: true,required: true },
	lastname: { type: String,required: true },
    gender: { type: String,require:true },
	address: {
        line1: { type: String, default: "" ,required:true},
        line2: { type: String, default: "" },
        city: { type: String, default: "" ,required:true},
        country: { type: String, default: "" ,required:true},
        zipcode: { type: String, default: "",required:true },
    },
	email: { type: String, require:true},
	phone: { type: Number, require:true },
	generic_date: { type: Date, default: new Date().toISOString() }
});

ContactSchema.index({
	 
	"email": "text",
  }, {
	"default_language": "en",
	"language_override": "en"
  });


  module.exports = mongoose.model('Contact', ContactSchema);