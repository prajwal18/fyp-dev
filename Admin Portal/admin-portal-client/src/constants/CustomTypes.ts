export type TableHeadPropsType = {
    name: string,
    icon?: JSX.Element
}

export type TableBodyPropsType = {
    dataList: Array<any>,
    keyValues: Array<string>,
    handleShow: (data: any) => void,
    handleEdit: (data: any) => void,
    handleDelete: (id: string | number) => void,
    skip?: number
}

export type PaginationStateType = {
    skip: number,
    take: number,
    total: number
}

// Pagination function types
export type HandleChangePageType = (pagination:PaginationStateType, actionCreator:(arg: any) => void, dispatch:(arg: any) => void) => (event: unknown, newPage: number) => void;
export type HandleChangeRowsPerPageType = (pagination:PaginationStateType, actionCreator:(arg: any) => void, dispatch:(arg: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => void;
// Pagination function types

// Types for the various slices in redux
export type CoursesISType = {
    courses: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type FacultiesISType = {
    faculties: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type StudentsISType =  {
    students: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type TeachersISType =  {
    teachers: Array<any>, searchTerm: string, pagination: PaginationStateType
}
export type AdminsISType =  {
    admins: Array<any>, searchTerm: string, pagination: PaginationStateType
}
// Types for the various slices in redux

// Action type for reducers
export type ActionType = {
    type: string, payload?: any
}
// Action type for reducers
