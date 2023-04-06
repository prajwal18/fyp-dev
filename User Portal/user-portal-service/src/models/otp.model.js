const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Provide a valid user.']
    },
    otp: {
        type: String, 
        required: [true, 'Provide a valid otp value']
    }
});

//Below line will automatically generate createdAt & updatedAt
otpSchema.set("timestamps", true);


module.exports = mongoose.model('OTP', otpSchema);