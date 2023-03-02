export type TableHeadPropsType = {
    name: string,
    icon?: JSX.Element
}

export type TableBodyPropsType = {
    dataList: Array<any>,
    keyValues: Array<string>,
    handleShow: (data: any) => void,
    handleEdit: (data: any) => void,
    handleDelete: (id: string) => void,
    skip?: number
}

export type PaginationStateType = {
    skip: number,
    take: number,
    total: number
}

// Pagination function types
export type HandleChangePageType = (pagination: PaginationStateType, actionCreator: (arg: any) => void, dispatch: (arg: any) => void) => (event: unknown, newPage: number) => void;
export type HandleChangeRowsPerPageType = (pagination: PaginationStateType, actionCreator: (arg: any) => void, dispatch: (arg: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => void;
// Pagination function types

// Types for the various slices in redux
export type CoursesISType = {
    selectedCourse: any, selectionPurpose: string, courses: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type FacultiesISType = {
    selectedFaculty: any, faculties: Array<any>, searchTerm: string, pagination: PaginationStateType, ddFaculties: Array<any>
}
export type StudentsISType = {
    selectedStudent: any, students: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type TeachersISType = {
    selectedTeacher: any, teachers: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type AdminsISType = {
   selectedAdmin: any, admins: Array<any>, searchTerm: string, pagination: PaginationStateType
}
// Types for the various slices in redux

// Action type for reducers
export type ActionType = {
    type: string, payload?: any
}
// Action type for reducers


// Table Types
export type TableType = {
    data: Array<any>,
    pagination: PaginationStateType,
    handleShow: (data: any) => void,
    handleEdit: (data: any) => void
}
// Table Types


// Select Option type
export type OptionType = {
    name: string, value: string
}