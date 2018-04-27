const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    emailId: {
        type:String,
        required: true
    }
    }, {
        timestamps: true
});
    
  

var Employees = mongoose.model('Employee', EmployeeSchema);

module.exports = Employees;