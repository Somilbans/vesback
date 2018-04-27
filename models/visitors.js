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
            unique: false
        },
         name:{
            type: String,
            required: false 
            
        },

       contactPersons:[contactSchema]
    },
     {
        timestamps: true
});
    

 
var visitors = mongoose.model('Visitor', visitorSchema);

module.exports = visitors;