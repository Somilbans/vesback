const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var contactSchema = new Schema({
    contacttype: {
        type: String,
        required: true,
    }
    },
     {
        timestamps: true
});


const visitorSchema = new Schema({
       mobilenum:{
            type: Number,
            required: true,
        },
       contactPersons:[contactSchema]
    },
     {
        timestamps: true
});
    
  

var visitors = mongoose.model('Visitor', visitorSchema);

module.exports = visitors;