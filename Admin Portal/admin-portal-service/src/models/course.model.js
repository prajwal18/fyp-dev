const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name cannot be less than 3 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters'],
        required: [true, "Course name is a required field"]
    },
    description: {
        type: String,
        minLength: [5, 'Description cannot be less than 20 characters'],
        maxLength: [1000, 'Description cannot exceed 1000 characters'],
        required: [true, "Course description is required"]
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    students: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
    teachers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});

//Below line will automatically generate createdAt & updatedAt
courseSchema.set("timestamps", true);


module.exports = mongoose.model('Course', courseSchema);