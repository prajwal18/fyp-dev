const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name cannot be less than 3 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters'],
        required: [true, 'Provide a valid name for Admin']
    },
    email: {
        type: String,
        required: [true, 'Admin\'s email must be provided'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: [true, 'The email cannot be duplicate']
    },
    password: {
        type: String,
        minLength: [6, 'Password cannot be less than 6 characters long'],
        required: [true, 'Admin\'s password must be provided']
    },
    contact: {
        type: String,
        match: [
            /^(\d{7})|(\d{10})$/,
            'Please provide a valid contact number'
        ],
        unique: [true, 'Contact number needs to be unique'],
    },
    profilePicture: {
        type: String
    }

});

//Below line will automatically generate createdAt & updatedAt
adminSchema.set("timestamps", true);

module.exports = mongoose.model('Admin', adminSchema);