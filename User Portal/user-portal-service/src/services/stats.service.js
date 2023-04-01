// Importing Required model
const Course = require("../models/course.model");
const User = require("../models/user.model");
const Assignment = require("../models/assignment.model");
const Submission = require("../models/assignment.submission.model");
const TestPaper = require("../models/test.question.model");
const TestAnswer = require("../models/test.answer.model");
// Importing Constants
const { UserRole } = require("../constants/enum");


// Get Head Info
const getHeadInfo = async (id, role) => {
    let user = await User.findById(id);
    let courses = user?.courses || [];
    let students = await User.count({
        courses: { '$in': courses },
        role: UserRole[0]
    });
    let teachers = await User.count({
        courses: { '$in': courses },
        role: UserRole[1]
    });
    let testPapers = await TestPaper.find({
        courseId: { '$in': courses }
    });
    let assignments = await Assignment.find({
        courseId: { '$in': courses }
    });
    let testSubmissions = [];
    let assignmentSubmissions = [];
    // User Role 0 ==> Student, 1 ==> Teacher
    if (role === UserRole[0]) {
        testSubmissions = await TestAnswer.find({
            testPaperId: { '$in': testPapers },
            submittedBy: id
        });
        assignmentSubmissions = await Submission.find({
            assignmentId: { '$in': assignments },
            submittedBy: id
        });
    } else {
        testSubmissions = await TestAnswer.find({
            testPaperId: { '$in': testPapers }
        });
        assignmentSubmissions = await Submission.find({
            assignmentId: { '$in': assignments }
        });
    }

    let gradedTest = testSubmissions.filter(testSubmission => testSubmission.isGraded);
    let gradedAssignment = assignmentSubmissions.filter(assignmentSubmission => assignmentSubmission.isGraded);

    const responseData = {
        courses: courses.length,
        users: {
            students: students,
            teachers: teachers
        },
        testsSubmitted: {
            total: testSubmissions.length,
            graded: gradedTest.length
        },
        assignmentsSubmitted: {
            total: assignmentSubmissions.length,
            graded: gradedAssignment.length
        }
    }

    return {
        success: true,
        data: responseData,
        message: "Fetched head information successfully."
    }

}
// Get Head Info


// Get course stat
const getCourseStat = async (id) => {
    const totalCourses = await Course.count({});
    const user = await User.findById(id);
    const registeredCourses = user?.courses?.length || 0;
    return {
        success: true, data: {
            total: totalCourses, registered: registeredCourses
        }
    }
}
// Get course stat


const getAssignmentStat = async (courses, id, role) => {
    // UserRole 0 ==> Student 1 ==> Teacher
    let courseName = '';
    if (courses.length > 1) {
        courseName = 'ALL';
    } else if (courses.length === 1) {
        let course = await Course.findById(courses[0]);
        courseName = course.name;
    }

    const assignments = await Assignment.find({
        courseId: { '$in': courses }
    });
    const assignmentIds = assignments.map(assignment => assignment._id);

    let submissions = [];
    let graded = [];


    if (assignments) {
        if (role === UserRole[0]) {
            submissions = await Submission.find({
                assignmentId: assignmentIds,
                submittedBy: id
            });
        }
        else {
            submissions = await Submission.find({
                assignmentId: assignmentIds
            });
        }
        graded = submissions.filter(submission => submission.isGraded);

        return {
            success: true,
            data: {
                course: courseName,
                total: assignments.length,
                submitted: submissions.length,
                graded: graded.length
            },
            message: "Assignment Stats fetched successfully"
        }
    }
    else {
        return {
            success: false,
            data: null, message: "No assignments found."
        }
    }
}


const getTestStat = async (courses, id, role) => {
    // UserRole 0 ==> Student 1 ==> Teacher
    let courseName = '';
    if (courses.length > 1) {
        courseName = 'ALL';
    } else if (courses.length === 1) {
        let course = await Course.findById(courses[0]);
        courseName = course.name;
    }

    const tests = await TestPaper.find({
        courseId: { '$in': courses }
    });
    const testIds = tests.map(test => test._id);

    let submissions = [];
    let graded = [];


    if (tests) {
        if (role === UserRole[0]) {
            submissions = await TestAnswer.find({
                testPaperId: testIds,
                submittedBy: id
            });
        }
        else {
            submissions = await TestAnswer.find({
                testPaperId: testIds
            });
        }
        graded = submissions.filter(submission => submission.isGraded);

        return {
            success: true,
            data: {
                course: courseName,
                total: tests.length,
                submitted: submissions.length,
                graded: graded.length
            },
            message: "Test Stats fetched successfully"
        }
    }
    else {
        return {
            success: false,
            data: null, message: "No tests found."
        }
    }
}

const reverseList = (list) => {
    let newList = [];
    for (let i = list.length - 1; i >= 0; i--) {
        newList.push(list[i])
    }
    return newList;
}


const getTestProgress = async (courses, students, take) => {
    const testPapers = await TestPaper.find({
        courseId: { '$in': courses },
    });
    let testIds = testPapers.map(paper => paper._id);

    let testAnswerPapers = await TestAnswer.find({
        submittedBy: { '$in': students },
        testPaperId: { '$in': testIds },
        isGraded: true
    })
        .populate('testPaperId')
        .sort({ 'createdAt': -1 }).limit(take);

    if (testAnswerPapers.length) {
        testAnswerPapers = reverseList(testAnswerPapers);
    }

    let testAnsFormatted = testAnswerPapers.map(answerPaper => {
        let score = (answerPaper.marksObtained * 100) / answerPaper.testPaperId.fullMark;
        score = score > 100 ? 100 : score;
        return {
            title: answerPaper.testPaperId.title,
            score: score
        }
    })

    return {
        success: true, data: {
            datasets: testAnsFormatted.map(item => item.score),
            labels: testAnsFormatted.map(item => item.title)
        }, message: "Test Progress data fetched successfully."
    }
}

const getAssignmentProgress = async (courses, students, take) => {
    const assignments = await Assignment.find({
        courseId: { '$in': courses },
    });
    let assignmentIds = assignments.map(assignment => assignment._id);

    let submissions = await Submission.find({
        submittedBy: { '$in': students },
        assignmentId: { '$in': assignmentIds },
        isGraded: true
    })
        .populate('assignmentId')
        .sort({ 'createdAt': -1 }).limit(take);

    if (submissions.length) {
        submissions = reverseList(submissions);
    }

    let submissionsFormatted = submissions.map(submission => {
        let score = (submission.marksObtained * 100) / submission.assignmentId.fullMark;
        score = score > 100 ? 100 : score;
        return {
            title: submission.assignmentId.title,
            score: score
        }
    })

    return {
        success: true, data: {
            datasets: submissionsFormatted.map(item => item.score),
            labels: submissionsFormatted.map(item => item.title)
        }, message: "Assignment Progress data fetched successfully."
    }
}

module.exports = {
    getHeadInfo, getCourseStat, getAssignmentStat,
    getTestStat, getTestProgress, getAssignmentProgress
};

