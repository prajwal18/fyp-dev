import {
    CoursesISType, FacultiesISType,
    StudentsISType, TeachersISType,
    AdminsISType
} from "./CustomTypes";
import { IVPagination } from "./InitialValuesTypes";

export const CoursesIS: CoursesISType = {
    courses: [],
    searchTerm: "",
    pagination: IVPagination
};

export const FacultiesIS: FacultiesISType = {
    faculties: [],
    searchTerm: "",
    pagination: IVPagination
}

export const StudentsIS: StudentsISType = {
    students: [],
    searchTerm: "",
    pagination: IVPagination
}
export const TeachersIS: TeachersISType = {
    teachers: [],
    searchTerm: "",
    pagination: IVPagination
}
export const AdminsIS: AdminsISType = {
    admins: [],
    searchTerm: "",
    pagination: IVPagination
}

export const GeneralIS = {}