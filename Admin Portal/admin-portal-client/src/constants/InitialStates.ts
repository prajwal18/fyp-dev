import {
    CoursesISType, FacultiesISType,
    StudentsISType, TeachersISType,
    AdminsISType
} from "./CustomTypes";
import { IVPagination } from "./InitialValuesTypes";

export const CoursesIS: CoursesISType = {
    selectedCourse: {},
    selectionPurpose: '',
    courses: [],
    searchTerm: "",
    pagination: IVPagination
};

export const FacultiesIS: FacultiesISType = {
    selectedFaculty: {},
    faculties: [],
    ddFaculties: [],
    searchTerm: "",
    pagination: IVPagination
}

export const StudentsIS: StudentsISType = {
    selectedStudent: {},
    students: [],
    searchTerm: "",
    pagination: IVPagination
}
export const TeachersIS: TeachersISType = {
    selectedTeacher: {},
    teachers: [],
    searchTerm: "",
    pagination: IVPagination
}
export const AdminsIS: AdminsISType = {
    selectedAdmin: {},
    admins: [],
    searchTerm: "",
    pagination: IVPagination
}

export const GeneralIS = {}