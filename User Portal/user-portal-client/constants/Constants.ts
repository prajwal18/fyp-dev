export enum UserTypes {
    STUDENT = "Student",
    TEACHER = "Teacher"
}
export enum TableActionTypes {
    EDIT = 'EDIT',
    SHOW = 'SHOW',
    DELETE = 'DELETE',
    MESSAGE = 'MESSAGE'
}

export enum StackDirection {
    ROW = 'row',
    COLUMN = 'column'
}

export enum TypesOfQuestions {
    QNA = 'QNA',
    MCQ = 'MCQ',
    MCQ_CHOOSE_ALL = 'MCQ_CHOOSE_ALL'
}

export enum MCQType {
    CHOOSE_ONE = TypesOfQuestions.MCQ,
    CHOOSE_ALL = TypesOfQuestions.MCQ_CHOOSE_ALL
}

export enum TestQuestionListType {
    TAKE_TEST,
    GRADE_TEST,
    GRADED_TEST
}