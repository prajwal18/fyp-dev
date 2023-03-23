import { TestType } from "./Constants";
import { PaginationST } from "./CustomTypes";

// Initial Pagination value
const IVPagination = {
    skip: 0, take: 5, total: 0
}
// Initial Pagination value

// General Initial State and Initial StateType
export const GeneralIS = {
    user: {},
    courses: null
};
export type GeneralIST = {
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
    pagination: IVPagination,
    searchTerm: '',
    searchParams: {
        courses: '',
        testType: TestType.ALL.toString()
    }
}
export type TestIST = {
    selectedTest: any,
    pagination: PaginationST,
    searchTerm: string,
    searchParams: {
        courses: string,
        testType: string
    }
}
// People initial state and initial state type

