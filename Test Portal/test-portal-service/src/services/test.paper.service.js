const TestPaper = require("../models/test.question.model");

/**
 * The function checks to see if the request has all the parameters needed to 
 * create a new Test paper.
 * The function will return isVerified true if the request is valid, along with the data in the request as reqData.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param title (*)Test paper title
 * @param subTitle Test paper subtitle
 * @param courseId (*)The course under which the test is to be created.
 * @param teacherId (*)The teacher who created the course.
 * @param fullMark (*)Full marks for the test
 * @param weightage (*)Weightage of the test
 * @param instructions (*)Array of {title, subTitle, content}. Must have a length of 1 or greater
 * @param questions (*)Array of { title, questionType, marks, correctAnswer }. Must have a length of 1 or greater
 * 
 * @returns { {isVerified:boolean, reqData: object, message:string} }
 */
const verifyCreateRequest = () => {
    
}


/**
 * The function checks to see if the request is allowed to update an existing test paper.
 * The function will return isVerified true if the request is valid, along with the data in the request as reqData.
 * The funciton will return isVerified false if the request is invalid, along with a message as why the request was invalid. 
 * @param 
 * 
 * @returns { {isVerified:boolean, reqData: object, message:string} }
 */
const verifyUpdateRequest = () => {

}

module.exports = { verifyCreateRequest, create, verifyUpdateRequest, update };