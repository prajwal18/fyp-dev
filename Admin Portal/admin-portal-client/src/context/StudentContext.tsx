import { createContext, useCallback, useEffect, useState } from "react";

// Pagination type and initial values
import { PaginationStateType } from "../constants/CustomTypes";
import { IVPagination } from "../constants/InitialValuesTypes";
// Pagination type and initial values

// Api calls
import { apiCallNResp } from "../utils/apiCallNResp";
import {
    httpGetAllStudent, httpAddStudent,
    httpUpdateStudent, httpChangePWStudent,
    httpDeleteStudent
} from "../services/student.service";
import { toast } from "react-toastify";
// Api calls

export const StudentContext = createContext<any>({}) // Change the any value when the portal is completed

const StudentContextContainer = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    const [students, setStudents] = useState<Array<any>>([]); // Paginated student data
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationStateType>(IVPagination);

    const fetchPaginationData = useCallback(async () => {
        const query = '?skip=0&take=0';
        const response = await apiCallNResp(() => httpGetAllStudent(query));
        if (response) {
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const fetchStudents = useCallback(async () => {
        const query = searchTerm ?
            `?skip=${pagination.skip}&take=${pagination.take}&searchTerm=${searchTerm}`
            :
            `?skip=${pagination.skip}&take=${pagination.take}`;
        const response = await apiCallNResp(() => httpGetAllStudent(query));
        if (response) {
            setStudents(response.data);
        }

    }, [pagination, searchTerm]);

    const addStudent = useCallback(async (data: any) => {
        const response = await apiCallNResp(() => httpAddStudent(data));
        if (response) {
            toast.success(`${response.data.name} created successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const updateStudent = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpUpdateStudent(id, data));
        if (response) {
            toast.success(`${response.data.name} updated successfully.`);
            fetchStudents();
        }

    }, [fetchStudents]);

    const deleteStudent = useCallback(async (id: string) => {
        const response = await apiCallNResp(() => httpDeleteStudent(id));
        if (response) {
            toast.success(`${response.data.name} deleted successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const changePassword = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpChangePWStudent(id, data));
        if (response) {
            toast.success(`${response.data.name}'s password changed successfully.`);
            fetchStudents();
        }
    }, [fetchStudents]);

    // Use Effect to initially set some values
    useEffect(() => {
        console.log('Student\'s page');
        fetchPaginationData();
    }, [fetchPaginationData]);
    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);
    // Use Effect to initially set some values


    return (
        <StudentContext.Provider value={{
            students, searchTerm, pagination, // State values
            setSearchTerm, setPagination,
            addStudent, updateStudent, deleteStudent,
            changePassword
        }}>
            {children}
        </StudentContext.Provider>
    );
}

export default StudentContextContainer;