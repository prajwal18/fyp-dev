import { createContext, useCallback, useEffect, useState } from "react";

// Pagination type and initial values
import { PaginationStateType } from "../constants/CustomTypes";
import { IVPagination } from "../constants/InitialValuesTypes";
// Pagination type and initial values

// Api calls
import { apiCallNResp } from "../utils/apiCallNResp";
import {
    httpGetAllTeacher, httpAddTeacher,
    httpUpdateTeacher, httpChangePWTeacher,
    httpDeleteTeacher
} from "../services/teacher.service";
import { toast } from "react-toastify";
// Api calls
export const TeacherContext = createContext<any>({}) // Change the any value when the portal is completed

const TeacherContextContainer = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    const [teachers, setTeachers] = useState<Array<any>>([]); // Paginated teacher data
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationStateType>(IVPagination);

    const fetchPaginationData = useCallback(async () => {
        const query = '?skip=0&take=0';
        const response = await apiCallNResp(() => httpGetAllTeacher(query));
        if (response) {
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const fetchTeachers = useCallback(async () => {
        const query = searchTerm ?
            `?skip=${pagination.skip}&take=${pagination.take}&searchTerm=${searchTerm}`
            :
            `?skip=${pagination.skip}&take=${pagination.take}`;
        const response = await apiCallNResp(() => httpGetAllTeacher(query));
        if (response) {
            setTeachers(response.data);
        }

    }, [pagination, searchTerm]);

    const addTeacher = useCallback(async (data: any) => {
        const response = await apiCallNResp(() => httpAddTeacher(data));
        if (response) {
            toast.success(`${response.data.name} created successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const updateTeacher = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpUpdateTeacher(id, data));
        if (response) {
            toast.success(`${response.data.name} updated successfully.`);
            fetchTeachers();
        }

    }, [fetchTeachers]);

    const deleteTeacher = useCallback(async (id: string) => {
        const response = await apiCallNResp(() => httpDeleteTeacher(id));
        if (response) {
            toast.success(`${response.data.name} deleted successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const changePassword = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpChangePWTeacher(id, data));
        if (response) {
            toast.success(`${response.data.name}'s password changed successfully.`);
            fetchTeachers();
        }
    }, [fetchTeachers]);

    // Use Effect to initially set some values
    useEffect(() => {
        console.log('Teacher\'s page');
        fetchPaginationData();
    }, [fetchPaginationData]);
    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);
    // Use Effect to initially set some values
    return (
        <TeacherContext.Provider value={{
            teachers, searchTerm, pagination, // States
            setSearchTerm, setPagination,
            fetchTeachers, addTeacher, updateTeacher,
            deleteTeacher, changePassword
        }}>
            {children}
        </TeacherContext.Provider>
    );
}

export default TeacherContextContainer;