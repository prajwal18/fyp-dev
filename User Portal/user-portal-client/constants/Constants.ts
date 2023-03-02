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

export enum QuestionTypes {
    QNA = 'QNA',
    MCQ = 'MCQ',
    MCQ_CHOSSE_ALL = 'MCQ_CHOOSE_ALL'
}

export enum MCQType {
    SINGLE_CHOICE = QuestionTypes.MCQ,
    MULTIPLE_CHOICE = QuestionTypes.MCQ_CHOSSE_ALL
}