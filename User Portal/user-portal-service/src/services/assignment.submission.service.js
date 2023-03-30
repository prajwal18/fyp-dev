const { AssignmentType, UserRole } = require("../constants/enum");
// Importing submission model
const Submission = require("../models/assignment.submission.model");
const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");
// Importing string to image function. ( Will replace it with string to file function )
const { base64ToPdf, removePdf } = require("../utils/read.write.pdf");

// Check to see if the assignment submission of a specific student for a specific assignment exists
const checkSubmissionExist = async (assignmentId, studentId) => {
    const submission = await Submission.findOne({ assignmentId, submittedBy: studentId });
    if (submission) {
        return {
            submissionExists: true,
            data: submission._id,
            message: "Assignment submission for the students exists."
        }
    } else {
        return {
            submissionExists: false,
            data: null,
            message: "Assignment submission for the student does not exist."
        }
    }
}

// Verify Request
const verifyCreateRequest = async ({ assignmentId, submittedBy, ...rest }) => {
    if (assignmentId && submittedBy) {
        const assignment = await Assignment.findById(assignmentId);

        if (assignment) {
            const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
            const dueDate = new Date(assignment.dueDate);


            if (today.getTime() <= dueDate.getTime()) {
                return {
                    isVerified: true,
                    isVerifiedMessage: null
                }

            } else {
                return {
                    isVerified: false,
                    isVerifiedMessage: 'You cannot submit a assignment past it\'s due date'
                }
            }

        } else {
            return {
                isVerified: false,
                isVerifiedMessage: 'Sorry cannot find the associated assignment paper.'
            }
        }
    } else {
        return { isVerified: false, isVerifiedMessage: "Provide all the necessary parameters." }
    }
}
// Verify Request

// Verify Update Request
const verifyUpdateRequest = async (id) => {
    const submission = await Submission.findById(id);
    const { isVerified, isVerifiedMessage } = await verifyCreateRequest(submission);
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
const verifyGradeRequest = async (data, id) => {
    const submission = await Submission.findById(id);
    if (submission && data.gradedBy && data.marksObtained) {
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
    if (data.submissionFile) {
        const filePath = await base64ToPdf(data.submissionFile, "submissions");
        data.submissionFile = filePath;
    }
    const submissionDate = new Date();
    const submission = await Submission.create({ ...data, submissionDate });
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
    const submission = await Submission.findById(id);
    if (data.submissionFile) {
        const filePath = await base64ToPdf(data.submissionFile, "submissions");
        data.submissionFile = filePath;
        if (submission.submissionFile) {
            removePdf(submission.submissionFile);
        }
    }
    const updtedSubmission = await Submission.findByIdAndUpdate(id, { ...data, submissionDate: new Date() });
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
    const submission = await Submission.findById(id)
        .populate({
            path: 'assignmentId',
            populate: [
                {
                    path: 'createdBy',
                    model: 'User'
                },
                {
                    path: 'courseId',
                    model: 'Course'
                }
            ]
        })
        .populate('submittedBy')
        .populate('gradedBy');
    if (submission) {
        return { success: true, data: submission, message: "Assignment submission fetched successfully." }
    } else {
        return { success: false, data: null, message: "Cannot find assignment submission." }
    }
}
// Get assignment submission


const getAllSpecificAssignmentPapers = async (courses, searchTerm, skip, take, role) => {
    // 0 ==> Student 1 ==> Teacher :indexes UserRole
    let preCount = 0;
    let assignments = await Assignment.find({
        courseId: { '$in': courses },
        title: { '$regex': searchTerm, '$options': 'i' }
    })
        .populate('courseId', 'name', Course);

    if (assignments) {
        if (role === UserRole[0]) {
            assignments = assignments.filter(assignment => {
                const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
                const releaseDate = new Date(assignment.releaseDate);
                if (releaseDate <= today) {
                    return true;
                } else {
                    return false;
                }
            })
        }
        preCount = assignments.length;
        assignments = assignments.splice(skip, take);
        return { success: true, data: assignments, message: "Successfully fetched assignments.", hits: preCount }
    } else {
        return { success: false, data: null, message: 'Problem fetching assignments.', hits: 0 }
    }

}

const getAllSpecificSubmissionPapers = async (courses, type, searchTerm, skip, take, userId, role) => {

    const isGraded = type === AssignmentType.GRADED;
    let assignments = await Assignment.find({
        courseId: { '$in': courses },
        title: { '$regex': searchTerm, '$options': 'i' },
    });

    if (assignments) {
        let assignmentIds = assignments.map(assignment => assignment._id);
        let submissions = null;
        // 0 ==> Student 1 ==> Teacher :indexes
        if (role === UserRole[0]) {
            submissions = await Submission.find({
                assignmentId: { '$in': assignmentIds },
                isGraded: isGraded,
                submittedBy: userId
            })
                .populate({
                    path: 'assignmentId',
                    populate: [{
                        path: 'createdBy',
                        model: 'User'
                    }, {
                        path: 'courseId',
                        model: 'Course'
                    }]
                })
                .populate('submittedBy')
                .populate('gradedBy');
        }
        else {
            submissions = await Submission.find({
                assignmentId: { '$in': assignmentIds },
                isGraded: isGraded
            })
                .populate({
                    path: 'assignmentId',
                    populate: [{
                        path: 'createdBy',
                        model: 'User'
                    }, {
                        path: 'courseId',
                        model: 'Course'
                    }]
                })
                .populate('submittedBy')
                .populate('gradedBy');
        }

        // Returing the results
        if (submissions) {
            let preCount = submissions.length;
            submissions = submissions.splice(skip, take);
            return { success: true, data: submissions, message: "Successfully fetched assignment submissions.", hits: preCount }
        } else {
            return { success: false, data: null, message: 'Problem fetching assignment submissions.', hits: 0 }
        }
    }

    else {
        return { success: false, data: null, message: 'Cannot find any assignment submissions.', hits: 0 }
    }
}

const getAllSpecificAssignments = async (courses, type, searchTerm, skip, take, userId, role) => {

    if (type === AssignmentType.ASSIGNMENT) {
        return getAllSpecificAssignmentPapers(courses, searchTerm, skip, take, role)
    }
    else {
        return getAllSpecificSubmissionPapers(courses, type, searchTerm, skip, take, userId, role);
    }
}




module.exports = {
    checkSubmissionExist, verifyCreateRequest, verifyUpdateRequest,
    verifyGradeRequest, create, update, grade, getSubmission,
    getAllSpecificAssignments
};