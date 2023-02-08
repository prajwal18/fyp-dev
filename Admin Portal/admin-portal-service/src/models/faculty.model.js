const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Faculty name cannot be less than 3 characters.'],
        maxLength: [50, 'faculty name cannot exceed 50 characters.'],
        required: [true, "Faculty name is required."]
    }
});


module.exports = mongoose.model('Faculty', facultySchema);