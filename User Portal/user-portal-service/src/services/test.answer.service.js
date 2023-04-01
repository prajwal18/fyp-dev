const { TestAns_AssignmentSub_Type, TestPaperType, UserRole } = require("../constants/enum");
const TestAnswer = require("../models/test.answer.model");
const TestPaper = require("../models/test.question.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

// Check to see if the test answer of a specific student for a specific test exists
const checkTestAnswerExist = async (testId, studentId) => {
    const test = await TestAnswer.findOne({ testPaperId: testId, submittedBy: studentId });
    if (test) {
        return {
            testExists: true,
            data: test._id,
            message: "Test Answer paper for the students exists."
        }
    } else {
        return {
            testExists: false,
            data: null,
            message: "Test Answer for the student does not exist."
        }
    }
}


/**
 * The function checks to see if the request has all the parameters needed to 
 * create a new Test Answer, i.e The Test Answer has to be created (submitted) before the due date.
 * The function will return isVerified true if the request is valid.
 * The funciton will return isVerified false if the request is invalid, along with a message as to why the request was invalid. 
 * @param testPaperId (*) Reference to the test paper
 * @param submissionDate (*) The date the test answer was submitted
 * @param submittedBy (*) The student who submitted the test answer
 * @param rest (*) Other properties
 * 
 * @returns { {isVerified:boolean, isVerifiedMessage:string} }
 */
const verifyCreateRequest = async ({ testPaperId, submittedBy, ...rest }) => {
    const test = await TestPaper.findById(testPaperId);

    if (test) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(test.dueDate);
        if (today.getTime() <= dueDate.getTime()) {
            return {
                isVerified: true,
                isVerifiedMessage: null
            }
        } else {
            return {
                isVerified: false,
                isVerifiedMessage: 'You cannot take a test past it\'s due date'
            }
        }

    } else {
        return {
            isVerified: false,
            isVerifiedMessage: 'Sorry cannot find the associated test paper.'
        }
    }
}


/**
 * The function checks to see if the request is allowed to update an existing test answer paper.
 * The request will be valid if the test answer paper is not graded and its updated befor the due date.
 * The function will return isVerified true if the request is valid.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param id To identify the test that is to be updated.
 * 
 * @returns { {isVerified:boolean, isVerifiedMessage:string} }
 */
const verifyUpdateRequest = async (id) => {
    const testAnswer = await TestAnswer.findById(id);
    const { isVerified, isVerifiedMessage } = await verifyCreateRequest(testAnswer);
    if (isVerified) {
        if (testAnswer.isGraded) {
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


/**
 * The function checks to see if the request is allowed to grade an existing test answer paper.
 * The function will return isVerified true if the request is valid.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param id To identify the test that is to be updated.
 * 
 * @returns { {isVerified:boolean, isVerifiedMessage:string} }
*/
const verifyGradeRequest = async (data, id) => {
    const testAnswer = await TestAnswer.findById(id);
    if (testAnswer && data.remark && data.gradedBy && data.marksObtained) {
        return {
            isVerified: true, isVerifiedMessage: null
        }
    } else {
        return {
            isVerified: false, isVerifiedMessage: 'Provide all the fields necessary to grade a test answer paper.'
        }
    }
}


const create = async (data) => {
    const test = await TestAnswer.create({ ...data, submissionDate: new Date() });
    if (test) {
        return {
            success: true, data: test, message: "Test created successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems creating test."
        }
    }
}


const update = async (data, id) => {
    const updatedTest = await TestAnswer.findByIdAndUpdate(id, { ...data, submissionDate: new Date() });
    if (updatedTest) {
        return {
            success: true, data: updatedTest, message: "Test updated successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems updating test."
        }
    }
}


const grade = async (data, id) => {
    const gradedTest = await TestAnswer.findByIdAndUpdate(id, { ...data, isGraded: true });
    if (gradedTest) {
        return {
            success: true, data: gradedTest, message: "Test answer paper graded successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Problems grading test answer paper."
        }
    }
}


const deleteTestAnswer = async (id) => {
    const test = await TestAnswer.findByIdAndDelete(id);
    if (test) {
        return { success: true, data: test, message: "Successfully delete test answer paper." }
    } else {
        return { success: false, data: null, message: "Sorry, cannot delete Test answer paper." }
    }
}

const getTest = async (id) => {
    const test = await TestAnswer.findById(id)
        .populate({
            path: 'testPaperId',
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
    if (test) {
        return {
            success: true, data: test, message: "Fetched test successfully."
        }
    } else {
        return {
            success: false, data: null, message: "Sorry, cannot fetch test."
        }
    }
}

const getAllSpecificTestPapers = async (courses, searchTerm, skip, take, role) => {
    // 0 ==> Student 1 ==> Teacher :indexes
    let preCount = 0;
    let testPapers = await TestPaper.find({
        courseId: { '$in': courses },
        title: { '$regex': searchTerm, '$options': 'i' }
    })
        .populate('courseId', 'name', Course);
    if (testPapers) {
        if (role === UserRole[0]) {
            testPapers = testPapers.filter(paper => {
                const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
                const releaseDate = new Date(paper.releaseDate);
                if (releaseDate <= today) {
                    return true;
                } else {
                    return false;
                }
            })
        }
        preCount = testPapers.length;
        testPapers = testPapers.splice(skip, take);
        return { success: true, data: testPapers, message: "Successfully fetched all test papers", hits: preCount }
    } else {
        return { success: false, data: null, message: 'Problem fetching test papers', hits: 0 }
    }

}

const getAllSpecificAnswerPapers = async (courses, type, searchTerm, skip, take, userId, role) => {

    const isGraded = type === TestPaperType.GRADED;
    let testPaper = await TestPaper.find({
        courseId: { '$in': courses },
        title: { '$regex': searchTerm, '$options': 'i' },
    });

    if (testPaper) {
        let testIds = testPaper.map(paper => paper._id);
        let submittedPapers = null;
        // 0 ==> Student 1 ==> Teacher :indexes
        if (role === UserRole[0]) {
            submittedPapers = await TestAnswer.find({
                testPaperId: { '$in': testIds },
                isGraded: isGraded,
                submittedBy: userId
            })
                .populate({
                    path: 'testPaperId',
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
            submittedPapers = await TestAnswer.find({
                testPaperId: { '$in': testIds },
                isGraded: isGraded
            })
                .populate({
                    path: 'testPaperId',
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
        if (submittedPapers) {
            let preCount = submittedPapers.length;
            submittedPapers = submittedPapers.splice(skip, take);
            return { success: true, data: submittedPapers, message: "Successfully fetched test answer papers", hits: preCount }
        } else {
            return { success: false, data: null, message: 'Problem fetching test answer papers', hits: 0 }
        }
    }

    else {
        return { success: false, data: null, message: 'Cannot find any test answer papers', hits: 0 }
    }
}

const getAllSpecificTests = async (courses, type, searchTerm, skip, take, userId, role) => {
    if (type === TestPaperType.TEST_PAPER) {
        return getAllSpecificTestPapers(courses, searchTerm, skip, take, role)
    }
    else {
        return getAllSpecificAnswerPapers(courses, type, searchTerm, skip, take, userId, role);
    }
}



module.exports = {
    verifyCreateRequest, verifyUpdateRequest, verifyGradeRequest,
    create, update, grade, getTest, checkTestAnswerExist,
    getAllSpecificTests, deleteTestAnswer
};