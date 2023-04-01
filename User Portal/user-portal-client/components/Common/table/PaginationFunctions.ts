import { HandleChangePageType, HandleChangeRowsPerPageType } from "../../../constants/CustomTypes";

export const handleChangePage: HandleChangePageType = (pagination, actionCreator, dispatch) => (event, newPage) => {
    dispatch(actionCreator({...pagination, skip: pagination.take*newPage}));
}

export const handleChangeRowsPerPage: HandleChangeRowsPerPageType = (pagination, actionCreator, dispatch) => (event) =>{
    dispatch(actionCreator({...pagination, take: event.target.value, skip: 0}));
}