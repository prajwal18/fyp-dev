import { createContext, useCallback, useEffect, useState } from "react";

// Pagination type and initial values
import { PaginationStateType } from "../constants/CustomTypes";
import { IVPagination } from "../constants/InitialValuesTypes";
// Pagination type and initial values

// Api calls
import { apiCallNResp } from "../utils/apiCallNResp";
import {
    httpGetAllFaculty, httpAddFaculty,
    httpUpdateFaculty, httpDeleteFaculty
} from "../services/faculty.service";
import { toast } from "react-toastify";
// Api calls

export const FacultyContext = createContext<any>({}) // Change the any value when the portal is completed

const FacultyContextContainer = ({children}:{children: JSX.Element | Array<JSX.Element>}) => {
    const [faculties, setFaculties] = useState<Array<any>>([]); // Paginated faculty data
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationStateType>(IVPagination);

    const fetchPaginationData = useCallback(async () => {
        const query = '?skip=0&take=0';
        const response = await apiCallNResp(() => httpGetAllFaculty(query));
        if (response) {
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const fetchFaculties = useCallback(async () => {
        const query = searchTerm ?
            `?skip=${pagination.skip}&take=${pagination.take}&searchTerm=${searchTerm}`
            :
            `?skip=${pagination.skip}&take=${pagination.take}`;
        const response = await apiCallNResp(() => httpGetAllFaculty(query));
        if (response) {
            setFaculties(response.data);
        }

    }, [pagination, searchTerm]);

    const addFaculty= useCallback(async (data: any) => {
        const response = await apiCallNResp(() => httpAddFaculty(data));
        if (response) {
            toast.success(`${response.data.name} created successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const updateFaculty= useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpUpdateFaculty(id, data));
        if (response) {
            toast.success(`${response.data.name} updated successfully.`);
            fetchFaculties();
        }

    }, [fetchFaculties]);

    const deleteFaculty= useCallback(async (id: string) => {
        const response = await apiCallNResp(() => httpDeleteFaculty(id));
        if (response) {
            toast.success(`${response.data.name} deleted successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    // Use Effect to initially set some values
    useEffect(() => {
        console.log('Faculty\'s page');
        fetchPaginationData();
    }, [fetchPaginationData]);
    useEffect(() => {
        fetchFaculties();
    }, [fetchFaculties]);
    // Use Effect to initially set some values
    return(
        <FacultyContext.Provider value={{
            faculties, searchTerm, pagination,
            setPagination, setSearchTerm,
            fetchFaculties, addFaculty, updateFaculty,
            deleteFaculty

        }}>
            {children}
        </FacultyContext.Provider>
    );
}

export default FacultyContextContainer;