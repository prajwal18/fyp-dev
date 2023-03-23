const { TestAns_AssignmentSub_Type } = require("../constants/enum");
// Importing submission model
const Submission = require("../models/assignment.submission.model");
const Assignment = require("../models/assignment.model");
// Importing string to image function. ( Will replace it with string to file function )
const { base64toImg } = require("../utils/read.write.image");

// Verify Request
const verifyCreateRequest = async ({ assignmentId, studentId, submissionFile, ...rest }) => {
    const assignment = await Assignment.findById(assignmentId);
    if (assignment) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(assignment.dueDate + ' 00:00:00');

        if (today.getTime() <= dueDate.getTime()) {
            return {
                isVerified: true,
                isVerifiedMessage: null
            }
        } else {
            return {
                isVerified: false,
                isVerifiedMessage: 'You cannot take a assignment past it\'s due date'
            }
        }

    } else {
        return {
            isVerified: false,
            isVerifiedMessage: 'Sorry cannot find the associated assignment paper.'
        }
    }
}
// Verify Request

// Verify Update Request
const verifyUpdateRequest = async (id) => {
    const submission = await Submission.findById(id);
    const { isVerified, isVerifiedMessage } = verifyCreateRequest(submission);
    if (isVerified) {
        if (submission.isGraded) {
            return {
                isVerified: false,
                isVerifiedMessage: 'Sorry, you cannot update the paper, it\'s already been graded'
            }
        } else {
            return {
                isVerified: true, isVerifiedMessage: null
            }
        }
    } else {
        return { isVerified, isVerifiedMessage }
    }
}
// Verify Update Request

// Verify Grade Request
const verifyGradeRequest = async (id) => {
    const submission = await Submission.findById(id);
    if (submission.remark && submission.gradedBy && submission.marksObtained) {
        return {
            isVerified: true, isVerifiedMessage: null
        }
    } else {
        return {
            isVerified: false, isVerifiedMessage: 'Provide all the fields necessary to grade an assignment submission.'
        }
    }
}
// Verify Grade Request

// Create assignment submission
const create = async (data) => {
    const submission = await Submission.create(data);
    if (submission) {
        return {
            success: true, data: submission, message: "Assignment submission done successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems submitting assignment."
        }
    }
}
// Create assignment submission

// Update assignment submission
const update = async (data, id) => {
    const updtedSubmission = await Submission.findByIdAndUpdate(id, data);
    if (updtedSubmission) {
        return {
            success: true, data: updtedSubmission, message: "Assignment submission updated successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems updating Assignment Submission."
        }
    }
}
// Update assignment submission

// Grade assignment submission
const grade = async (data, id) => {
    const gradedSubmission = await Submission.findByIdAndUpdate(id, { ...data, isGraded: true });
    if (gradedSubmission) {
        return {
            success: true, data: gradedSubmission, message: "Assignment submission paper graded successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems grading assignment submission paper."
        }
    }
}
// Grade assignment submission

// Get assignment submission
const getSubmission = async (id) => {
    const submission = await Submission.findById(id);
    if (submission) {
        return { success: true, data: submission, message: "Assignment submission fetched successfully." }
    } else {
        return { success: false, data: null, message: "Cannot find assignment submission." }
    }
}
// Get assignment submission

// Get all assignment submission
const getAllSubmissions = async (courses, type) => {
    let assignments = await Assignment.find({
        courseId: { '$in': courses }
    });

    if (assignments.length) {
        assignments = assignments.map(assignment => assignment._id);
        let submissions = await Submission.find({
            assignmentId: { '$in': assignments }
        });

        if (type === TestAns_AssignmentSub_Type.GRADED) {
            submissions = submissions.filter(submission => {
                return submission.isGraded;
            })
        }

        if (submissions) {
            return {
                success: true, data: submissions, message: "Fetched all assignment submissions successfully.", hits: submissions.length
            }
        } else {
            return {
                success: false, data: null, message: "Sorry, cannot fetch assignment submissions.", hits: 0
            }
        }
    } else {
        return {
            success: false, data: null, message: "Sorry, cannot fetch assignment submissions.", hits: 0
        }
    }

}
// Get all assignment submission




module.exports = { verifyCreateRequest, verifyUpdateRequest, verifyGradeRequest, create, update, grade, getSubmission, getAllSubmissions };