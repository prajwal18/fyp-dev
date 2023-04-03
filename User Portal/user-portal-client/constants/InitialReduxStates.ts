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
    onlineUsers: null,
    courses: null
};
export type GeneralIST = {
    includeSidebar: boolean,
    openProfile: boolean,
    user: any,
    onlineUsers: any,
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
    allAssignments: null,
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
    allAssignments: any,
    selectedSubmittedAssignment: any,
    pagination: PaginationST,
    searchTerm: string,
    searchParams: {
        courses: string,
        assignmentType: string
    }
}
// People initial state and initial state type



// Stats initial state 
export const StatIS = {
    headInfo: {},
    searchParam: {
        testCourses: '',
        assignmentCourses: ''
    },
    testProgress: {
        courses: '',
        students: '',
        take: 10
    },
    assignmentProgress: {
        courses: '',
        students: '',
        take: 10
    },
    testData: {
        datasets: null,
        labels: null
    },
    assignmentData: {
        datasets: null,
        labels: null
    },
    courseStat: {
        total: 0,
        registered: 0
    },
    assignmentStat: {
        course: '', total: 0, submitted: 0, graded: 0
    },
    testStat: {
        course: '', total: 0, submitted: 0, graded: 0
    },
    students: null
}
export type StatIST = {
    headInfo: any,
    searchParam: {
        testCourses: string,
        assignmentCourses: string
    },
    testProgress: {
        courses: string,
        students: string,
        take: number
    },
    assignmentProgress: {
        courses: string,
        students: string,
        take: number
    },
    testData: {
        datasets: any,
        labels: any
    },
    assignmentData: {
        datasets: any,
        labels: any
    },
    courseStat: {
        total: number,
        registered: number
    },
    assignmentStat: {
        course: string,
        total: number,
        submitted: number,
        graded: number
    },
    testStat: {
        course: string,
        total: number,
        submitted: number,
        graded: number
    },
    students: any
}
// Stats initial state


// People initial state and initial state type
export const MessageIS = {
    users: null,
    receiver: {},
    conversation: null // This will be an array
}
export type MessageIST = {
    users: any,
    receiver: any,
    conversation: any
}
// People initial state and initial state type