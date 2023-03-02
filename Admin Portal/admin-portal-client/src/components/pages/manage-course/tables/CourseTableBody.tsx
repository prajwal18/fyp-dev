import React, { useEffect } from "react";
import {
    TableBody, TableRow, TableCell, Stack, Typography, Button
} from "@mui/material";
// MUI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// MUI Icons
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedCourseAC, updateSelectionPurposeAC } from "../../../../redux/courses/actions";
import { selectSelectedCourse, selectSelectionPurpose } from "../../../../redux/courses/courses.slice";
import { CourseSelectionType } from "../../../../constants/Constants";

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

const TableBodySection = ({ skip, dataList, handleShow, handleEdit, handleDelete }: any) => {
    const dispatch = useDispatch();
    const selectionPurpose = useSelector(selectSelectionPurpose);
    const course = useSelector(selectSelectedCourse);
    
    const handleAddUser = (id: string) => {
        dispatch(fetchSelectedCourseAC(id));
        dispatch(updateSelectionPurposeAC(CourseSelectionType.ADD));
    };
    const handleRemoveUser = (id: string) => {
        dispatch(fetchSelectedCourseAC(id));
        dispatch(updateSelectionPurposeAC(CourseSelectionType.REMOVE));
    };
    
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        background: course && (row._id === course._id)? 
                        (selectionPurpose === CourseSelectionType.ADD? 'rgba(0,255,0,0.1)': selectionPurpose === CourseSelectionType.REMOVE ? 'rgba(255,0,0,0.1)': 'rgba(0,0,0,0.1)')
                        :
                        'white'
                    }}>
                        <TableCell>
                            {((skip && skip) || 0) + indexOuter + 1}
                        </TableCell>

                        <TableCell>
                            {row.name}
                        </TableCell>

                        <TableCell>
                            Computing
                        </TableCell>

                        <TableCell>
                            <Stack spacing={1}>
                                <Typography>Total:889</Typography>
                                <Stack direction='row' spacing={2}>
                                    <Button variant="contained" color="success" onClick={() => handleAddUser(row._id)}>
                                        <AddIcon />
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleRemoveUser(row._id)}>
                                        <RemoveIcon />
                                    </Button>
                                </Stack>
                            </Stack>
                        </TableCell>

                        <TableCell>
                            <Stack direction="row" gap={1}>
                                <IconContainer
                                    onClick={() => handleShow(row)}
                                    title={`View ${row.name}`}
                                >
                                    <VisibilityIcon color="primary" />
                                </IconContainer>
                                <IconContainer sx={{ cursor: "pointer" }}
                                    onClick={() => handleEdit(row)}
                                    title={`Edit ${row.name}`}
                                >
                                    <EditIcon color="secondary" />
                                </IconContainer>
                                <IconContainer sx={{ cursor: "pointer" }}
                                    onClick={() => handleDelete(row._id)}
                                    title={`Delete ${row.name}`}
                                >
                                    <DeleteIcon color="error" />
                                </IconContainer>
                            </Stack>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody >
    )
}

export default TableBodySection;