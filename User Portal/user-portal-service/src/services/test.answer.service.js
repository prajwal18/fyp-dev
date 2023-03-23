const { TestAns_AssignmentSub_Type } = require("../constants/enum");
const TestAnswer = require("../models/test.answer.model");
const TestPaper = require("../models/test.question.model");

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
const verifyCreateRequest = async ({ testPaperId, submissionDate, submittedBy, ...rest }) => {
    const test = await TestPaper.findById(testPaperId);
    if (test) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(test.dueDate + ' 00:00:00');

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
    const { isVerified, isVerifiedMessage } = verifyCreateRequest(testAnswer);
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
const verifyGradeRequest = async (id) => {
    const testAnswer = await TestAnswer.findById(id);
    if (testAnswer.remark && testAnswer.gradedBy && testAnswer.marksObtained) {
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
    const test = await TestAnswer.create(data);
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
    const updatedTest = await TestAnswer.findByIdAndUpdate(id, data);
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


const getTest = async (id) => {
    const test = await TestAnswer.findById(id);
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

const getAllTests = async (courses, type) => {
    let testPapers = await TestPaper.find({
        courseId: { '$in': courses }
    });

    if (testPapers.length) {
        testPapers = testPapers.map(testPaper => testPaper._id);
        let tests = await TestAnswer.find({
            testPaperId: { '$in': testPapers }
        });

        if (type === TestAns_AssignmentSub_Type.GRADED) {
            tests = tests.filter(test => {
                return test.isGraded;
            })
        }

        if (tests) {
            return {
                success: true, data: tests, message: "Fetched all tests successfully.", hits: tests.length
            }
        } else {
            return {
                success: false, data: null, message: "Sorry, cannot fetch tests.", hits: 0
            }
        }
    } else {
        return {
            success: false, data: null, message: "Sorry, cannot fetch tests.", hits: 0
        }
    }

}

module.exports = { verifyCreateRequest, verifyUpdateRequest, verifyGradeRequest, create, update, grade, getTest, getAllTests };