// Importing submission model
const Submission = require("../models/submission.model");
// Importing string to image function. ( Will replace it with string to file function )
const { base64toImg } = require("../utils/read.write.image");

// Validate Request
const validateRequest = (data) => {
    if (
        data.assignmentId && data.studentId && data.submissionFile
    ) {
        return true;
    } else {
        return false
    }
}
// Validate Request

// Submit Assignment answer/paper
const submitAssignment = async (data) => {
    const reqData = JSON.parse(JSON.stringify(data)); // Making a deep copy of an object
    const submissionFileData = await base64toImg(reqData.submissionFile, "submissions"); // Note this line here will be replaced.
    reqData.submissionFile = submissionFileData;
    const submission = await Submission.create({ data });
    if (submission) {
        return { success: true, data: submission, message: "Assignment submited successfully." }
    } else {
        return { success: false, data: null, message: "Assignment submission unsuccessful." }
    }
}
// Submit Assignment answer/paper

// Greade Assignment Submission
const gradeSubmission = async (id, data) => {
    const submission = await Submission.findById(id);
    if (submission) {
        if (data.remark && data.gradedBy && data.score) {
            const updatedSubmission = await submission.findByIdAndUpdate({
                remark: data.remark, gradedBy: data.gradedBy, score: data.score,
                isGraded: true
            });
            return { success: false, data: updatedSubmission, message: "Assignment submission graded successfully." }
        } else {
            return { success: false, data: null, message: "Please provide all necessary data to grade an assignment submission." }
        }
    } else {
        return { success: false, data: null, message: "Cannot find assignment submission." }
    }

}
// Greade Assignment Submission

// Get Submission, retrive submited file/paper
const getSubmission = async (id) => {
    const submission = await Submission.findById(id);
    if (submission) {
        return { success: true, data: submission, message: "Assignment submission fetched successfully." }
    } else {
        return { success: false, data: null, message: "Cannot find assignment submission." }
    }
}
// Get Submission, retrive submited file/paper

// Get all submited files/papers
const getAllSubmissions = async (studentId, assignmentId) => {
    if (studentId || assignmentId) {
        let submissions = null;
        if (studentId) {
            submissions = await Submission.find({ studentId: studentId });
        }
        if (assignmentId) {
            submissions = await Submission.find({ assignmentId: assignmentId });
        }

        return { success: true, data: submissions, message: "Assignment Submissions fetched successfully." };

    } else {
        return { success: false, data: null, message: "Cannot find assignment submission. Please provide assignment id or student id" }
    }
}
// Get all submited files/papers

module.exports = { validateRequest, submitAssignment, gradeSubmission, getSubmission, getAllSubmissions };