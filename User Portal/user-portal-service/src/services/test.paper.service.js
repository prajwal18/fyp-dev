const TestPaper = require("../models/test.question.model");

/**
 * The function checks to see if the request has all the parameters needed to 
 * create a new Test paper.
 * The function will return isVerified true if the request is valid, along with the data in the request as reqData.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param title (*)Test paper title.
 * @param subTitle Test paper subtitle.
 * @param courseId (*)The course under which the test is to be created.
 * @param createdBy (*)The teacher who created the course.
 * @param fullMark (*)Full marks for the test.
 * @param releaseDate (*)The date the test is expected to be released.
 * @param dueDate (*)The date till which the test is expected to be completed.
 * 
 * @returns { {isVerified:boolean, reqData: object, isVerifiedMessage:string} }
 */
const verifyCreateRequest = ({ title, subtitle, courseId, createdBy, fullMark, releaseDate, dueDate }) => {
    if (title && courseId && createdBy && fullMark && releaseDate && dueDate) {
        if (subtitle) {
            return {
                isVerified: true,
                reqData: { title, subtitle, courseId, createdBy, fullMark, releaseDate, dueDate },
                isVerifiedMessage: null
            }
        } else {
            return {
                isVerified: true,
                reqData: { title, courseId, createdBy, fullMark, releaseDate, dueDate },
                isVerifiedMessage: null
            }
        }
    } else {
        return { isVerified: false, reqData: null, isVerifiedMessage: 'Provide all the required fields.' }
    }
}


/**
 * The function checks to see if the request is allowed to update an existing test paper.
 * The function will return isVerified true if the request is valid, along with the data in the request as reqData.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param data an object with many attributes
 * @param id To identify the test that is to be updated.
 * 
 * @returns { {isVerified:boolean, reqData: object, isVerifiedMessage:string} }
 */
const verifyUpdateRequest = async (data, id) => {
    const test = await TestPaper.findById(id);
    if (test) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const dueDate = new Date(test.dueDate + ' 00:00: 00');
        if (today.getTime() <= dueDate.getTime()) {
            return {
                isVerified: true,
                reqData: data,
                isVerifiedMessage: null
            }
        } else {
            return {
                isVerified: false,
                reqData: null,
                isVerifiedMessage: 'You cannot update a test past it\'s due date'
            }
        }
    } else {
        return {
            isVerified: false,
            reqData: null,
            isVerifiedMessage: 'Cannot find the Test paper.'
        }
    }
}

const create = async (data) => {
    const test = await TestPaper.create(data);
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
    const updatedTest = await TestPaper.findByIdAndUpdate(id, data);
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

const getTest = async (id) => {
    const test = await TestPaper.findById(id);
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

const getAllTests = async (courses) => {
    const tests = await TestPaper.find({
        courseId: { '$in': courses }
    });

    if (tests) {
        return {
            success: true, data: tests, message: "Fetched all tests successfully.", hits: tests.length
        }
    } else {
        return {
            success: false, data: null, message: "Sorry, cannot fetch tests.", hits: 0
        }
    }
}

const getAllReleasedTests = async (courses) => {
    const tests = await TestPaper.find({
        courseId: { '$in': courses }
    });

    if (tests) {
        const today = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()); // Getting the date without time component
        const releasedTests = tests.filter(test => {
            const releaseDate = new Date(test.releaseDate + ' 00:00:00');
            return today >= releaseDate;
        });
        return {
            success: true, data: releasedTests, message: "Fetched all tests successfully.", hits: releasedTests.length
        }
    } else {
        return {
            success: false, data: null, message: "Sorry, cannot fetch tests.", hits: 0
        }
    }
}

module.exports = { verifyCreateRequest, create, verifyUpdateRequest, update, getTest, getAllTests, getAllReleasedTests };