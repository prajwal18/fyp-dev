import { createContext, useCallback, useEffect, useState } from "react";

// Pagination type and initial values
import { PaginationStateType } from "../constants/CustomTypes";
import { IVPagination } from "../constants/InitialValuesTypes";
// Pagination type and initial values

// Api calls
import { apiCallNResp } from "../utils/apiCallNResp";
import {
    httpGetAllCourse, httpAddCourse,
    httpAddUserToCourse, // This will be done at last
     httpUpdateCourse,
    httpDeleteCourse
} from "../services/course.service";
import { toast } from "react-toastify";
// Api calls

export const CourseContext = createContext<any>({}) // Change the any value when the portal is completed

const CourseContextContainer = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    const [courses, setCourses] = useState<Array<any>>([]); // Paginated course data
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationStateType>(IVPagination);

    const fetchPaginationData = useCallback(async () => {
        const query = '?skip=0&take=0';
        const response = await apiCallNResp(() => httpGetAllCourse(query));
        if (response) {
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const fetchCourses = useCallback(async () => {
        const query = searchTerm ?
            `?skip=${pagination.skip}&take=${pagination.take}&searchTerm=${searchTerm}`
            :
            `?skip=${pagination.skip}&take=${pagination.take}`;
        const response = await apiCallNResp(() => httpGetAllCourse(query));
        if (response) {
            setCourses(response.data);
        }

    }, [pagination, searchTerm]);

    const addCourse = useCallback(async (data: any) => {
        const response = await apiCallNResp(() => httpAddCourse(data));
        if (response) {
            toast.success(`${response.data.name} created successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    const updateCourse = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpUpdateCourse(id, data));
        if (response) {
            toast.success(`${response.data.name} updated successfully.`);
            fetchCourses();
        }

    }, [fetchCourses]);

    const deleteCourse = useCallback(async (id: string) => {
        const response = await apiCallNResp(() => httpDeleteCourse(id));
        if (response) {
            toast.success(`${response.data.name} deleted successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalStudents }));
        }
    }, []);

    // Use Effect to initially set some values
    useEffect(() => {
        console.log('Course\'s page');
        fetchPaginationData();
    }, [fetchPaginationData]);
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);
    // Use Effect to initially set some values
    return (
        <CourseContext.Provider value={{
            courses, searchTerm, pagination,
            setSearchTerm, setPagination,
            fetchCourses, addCourse, updateCourse,
            deleteCourse
         }}>
            {children}
        </CourseContext.Provider>
    );
}

export default CourseContextContainer;