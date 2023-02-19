import { createContext, useCallback, useEffect, useState } from "react";

// Pagination type and initial values
import { PaginationStateType } from "../constants/CustomTypes";
import { IVPagination } from "../constants/InitialValuesTypes";
// Pagination type and initial values

// Api calls
import { apiCallNResp } from "../utils/apiCallNResp";
import {
    httpGetAllAdmin, httpAddAdmin,
    httpUpdateAdmin, httpChangePWAdmin,
    httpDeleteAdmin
} from "../services/admin.service";
import { toast } from "react-toastify";
// Api calls

export const AdminContext = createContext<any>({}) // Change the any value when the portal is completed

const AdminContextContainer = ({ children }: { children: JSX.Element | Array<JSX.Element> }) => {
    const [admins, setAdmins] = useState<Array<any>>([]); // Paginated Admin data
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationStateType>(IVPagination);

    const fetchPaginationData = useCallback(async () => {
        const query = '?skip=0&take=0';
        const response = await apiCallNResp(() => httpGetAllAdmin(query));
        if (response) {
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalAdmins }));
        }
    }, []);

    const fetchAdmins = useCallback(async () => {
        const query = searchTerm ?
            `?skip=${pagination.skip}&take=${pagination.take}&searchTerm=${searchTerm}`
            :
            `?skip=${pagination.skip}&take=${pagination.take}`;
        const response = await apiCallNResp(() => httpGetAllAdmin(query));
        if (response) {
            setAdmins(response.data);
        }

    }, [pagination, searchTerm]);

    const addAdmin = useCallback(async (data: any) => {
        const response = await apiCallNResp(() => httpAddAdmin(data));
        if (response) {
            toast.success(`${response.data.name} created successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalAdmins }));
        }
    }, []);

    const updateAdmin = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpUpdateAdmin(id, data));
        if (response) {
            toast.success(`${response.data.name} updated successfully.`);
            fetchAdmins();
        }

    }, [fetchAdmins]);

    const deleteAdmin = useCallback(async (id: string) => {
        const response = await apiCallNResp(() => httpDeleteAdmin(id));
        if (response) {
            toast.success(`${response.data.name} deleted successfully.`);
            setPagination((state: PaginationStateType) => ({ ...state, total: response.totalAdmins }));
        }
    }, []);

    const changePassword = useCallback(async (id: string, data: any) => {
        const response = await apiCallNResp(() => httpChangePWAdmin(id, data));
        if (response) {
            toast.success(`${response.data.name}'s password changed successfully.`);
            fetchAdmins();
        }
    }, [fetchAdmins]);

    // Use Effect to initially set some values
    useEffect(() => {
        console.log('Admin\'s page');
        fetchPaginationData();
    }, [fetchPaginationData]);
    useEffect(() => {
        fetchAdmins();
    }, [fetchAdmins]);
    // Use Effect to initially set some values


    return (
        <AdminContext.Provider value={{
            admins, searchTerm, pagination, // State values
            setSearchTerm, setPagination,
            addAdmin, updateAdmin, deleteAdmin,
            changePassword
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextContainer;