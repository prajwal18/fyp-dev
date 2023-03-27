import { AssignmentType, TestType } from "./Constants";
import { PaginationST } from "./CustomTypes";

// Initial Pagination value
const IVPagination = {
    skip: 0, take: 5, total: 0
}
// Initial Pagination value

// General Initial State and Initial StateType
export const GeneralIS = {
    includeSidebar: false,
    openProfile: false,
    user: {},
    courses: null
};
export type GeneralIST = {
    includeSidebar: boolean,
    openProfile: boolean,
    user: any,
    courses: any
};
// General Initial State and Initial StateType

// People initial state and initial state type
export const PeopleIS = {
    members: null,
    pagination: IVPagination,
    searchTerm: '',
    searchParams: {
        courses: '',
        role: ''
    },
    selectedMember: {}
}
export type PeopleIST = {
    members: any,
    pagination: PaginationST,
    searchTerm: string,
    searchParams: {
        courses: string,
        role: string
    }
    selectedMember: any
}
// People initial state and initial state type


// People initial state and initial state type
export const TestIS = {
    selectedTest: {},
    allTests: null,
    selectedAnswerPaper: {},
    pagination: IVPagination,
    searchTerm: '',
    searchParams: {
        courses: '',
        testType: TestType.TEST_PAPER.toString()
    }
}
export type TestIST = {
    selectedTest: any,
    allTests: any,
    selectedAnswerPaper: any,
    pagination: PaginationST,
    searchTerm: string,
    searchParams: {
        courses: string,
        testType: string
    }
}
// People initial state and initial state type

// People initial state and initial state type
export const AssignmentIS = {
    selectedAssignment: {},
    selectedSubmittedAssignment: {},
    pagination: IVPagination,
    searchTerm: '',
    searchParams: {
        courses: '',
        assignmentType: AssignmentType.ASSIGNMENT.toString()
    }
}
export type AssignmentIST = {
    selectedAssignment: any,
    selectedSubmittedAssignment: any,
    pagination: PaginationST,
    searchTerm: string,
    searchParams: {
        courses: string,
        assignmentType: string
    }
}
// People initial state and initial state type

