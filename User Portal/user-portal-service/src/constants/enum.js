const UserRole = ["Student", "Teacher"];
const QuestionTypes = ["QNA", "MCQ", "MCQ_CHOOSE_ALL"]

const TestPaperType = {
    TEST_PAPER: 'TEST_PAPER',
    SUBMITTED: 'SUBMITTED',
    GRADED: 'GRADED'
}

const AssignmentType = {
    ASSIGNMENT: 'ASSIGNMENT',
    SUBMITTED: 'SUBMITTED',
    GRADED: 'GRADED'
}

const TestAns_AssignmentSub_Type = {
    GRADED: 'GRADED',
    SUBMITTED: 'SUBMITTED'
}

module.exports = {
    UserRole, QuestionTypes, TestPaperType,
    TestAns_AssignmentSub_Type, AssignmentType
}