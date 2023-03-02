import { TableBody, TableCell, TableRow, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
// MUI Icons
import { addUserToCourseAC, fetchAllCoursesAC, removeUserFromCourseAC } from "../../../../redux/courses/actions";
import { selectSelectedCourse, selectSelectionPurpose } from "../../../../redux/courses/courses.slice";
import { CourseSelectionType, UserTypes } from "../../../../constants/Constants";
import { fetchCourseStudentPaginationAC } from "../../../../redux/students/actions";
import { fetchCourseTeacherPaginationAC } from "../../../../redux/teachers/actions";

// Styled component
const IconContainer = styled(Stack)`
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    &:hover {
        background: rgba(0,0,0,0.1);
    }
    &:active {
        background: rgba(0,0,0,0.3);
    }
`;
// Styled component

const TeacherStudentBody = ({ dataList, handleShow, role }: any) => {
    const selectedCourse = useSelector(selectSelectedCourse);
    const selectionPurpose = useSelector(selectSelectionPurpose);
    const dispatch = useDispatch();

    const handleUpdateTables = () => {
        dispatch(fetchAllCoursesAC());
        if(role === UserTypes.STUDENT){
            dispatch(fetchCourseStudentPaginationAC());
        } else if (role === UserTypes.TEACHER){
            dispatch(fetchCourseTeacherPaginationAC());
        }
    }

    const handleAdd = (id: string) => {
        dispatch(addUserToCourseAC(id, role));
        setTimeout(() => {handleUpdateTables()}, 100);
    }
    const handleRemove = (id: string) => {
        dispatch(removeUserFromCourseAC(id, role));
        setTimeout(() => {handleUpdateTables()}, 100);
    }
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                        <TableCell>
                            {row.profile}
                        </TableCell>

                        <TableCell>
                            {row.name}
                        </TableCell>

                        <TableCell>
                            <Stack direction="row" gap={1}>
                                <IconContainer
                                    onClick={() => handleShow(row)}
                                    title={`View ${row.name}`}
                                >
                                    <VisibilityIcon color="primary" />
                                </IconContainer>
                                {/* Add Button */}
                                {
                                    selectedCourse &&
                                    <>
                                        {
                                            (selectionPurpose && selectionPurpose === CourseSelectionType.ADD) &&
                                            <IconContainer sx={{ cursor: "pointer", border: "1px solid purple" }}
                                                onClick={() => handleAdd(row._id)}
                                                title={`Add ${row.name} to ${selectedCourse.name}`}
                                            >
                                                <CheckIcon color="secondary" />
                                            </IconContainer>
                                        }
                                        {/* Add Button */}
                                        {/* Remove Button */}
                                        {
                                            (selectionPurpose && selectionPurpose === CourseSelectionType.REMOVE) &&
                                            <IconContainer
                                                sx={{ cursor: "pointer", border: "1px solid red" }}
                                                onClick={() => handleRemove(row._id)}
                                                title={`Remove ${row.name} from ${selectedCourse.name}`}
                                            >
                                                <ClearIcon color="error" />
                                            </IconContainer>
                                        }
                                        {/* Remove Button */}
                                    </>
                                }
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody >
    )
}

export default TeacherStudentBody;