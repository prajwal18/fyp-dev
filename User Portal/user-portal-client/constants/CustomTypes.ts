import { TableActionTypes, TypesOfQuestions } from './Constants';
// PT is short for prop type
// ST is short for state type
// T is shor for type
export type TableHeadPT = {
    name: string,
    icon?: JSX.Element
}
export type TableBodyPT = {
    skip: number,
    includeSN: boolean,
    dataList: Array<any>,
    keyValues: Array<string>,
    actionData?: Array<{ name: TableActionTypes, callback: (data: any) => void }>
}

export type PaginationST = {
    skip: number,
    take: number,
    total: number
}

// Pagination function types
export type HandleChangePageType = (pagination: PaginationST, actionCreator: (arg: any) => void, dispatch: (arg: any) => void) => (event: unknown, newPage: number) => void;
export type HandleChangeRowsPerPageType = (pagination: PaginationST, actionCreator: (arg: any) => void, dispatch: (arg: any) => void) => (event: React.ChangeEvent<HTMLInputElement>) => void;
// Pagination function types



// Drop Down option data type 
export type DDOptionT = {
    name: string, value: string
}

// Bread Crum Location type
export type LocationT = {
    name: string;
    to?: string;
};
// Bread Crum Location type


// Side bar data Type
export type SidebarDataType = {
    link: string,
    name: string,
    icon: JSX.Element
}
// Side bar data Type

// ADD question prop type for modals
export type AddQuestionPropType = {
    open: boolean,
    formik: any,
    handleClose: () => void
}
// ADD question prop type for modals





// Action type for reducer
export type ActionT = {
    type: string, payload: any
}
// Action type for reducer