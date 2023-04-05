import React from "react";
import {
    TableBody, TableRow, TableCell, Stack, Typography, Button
} from "@mui/material";
// MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// MUI Icons
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedFaculty, updateSelectedFaculty } from "../../../../redux/faculties/faculties.slice";

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
    const faculty = useSelector(selectSelectedFaculty);
    const handleSelect = (data:any) => {
        dispatch(updateSelectedFaculty(data));
    }
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 } ,
                        background: faculty && (faculty._id === row._id ) ? 'rgba(0,0,0,0.1)': 'white',
                    }}>
                        <TableCell>
                            {((skip && skip) || 0) + indexOuter + 1}
                        </TableCell>
                        <TableCell>
                            {row.name}
                        </TableCell>
                        <TableCell>
                            <Stack spacing={1}>
                                <Button variant='outlined'
                                onClick={() => {
                                    handleSelect(row);
                                }}
                                >View</Button>
                            </Stack>
                        </TableCell>
                        <TableCell>
                            <Stack direction="row" gap={1}>
                                <IconContainer
                                    onClick={() => {
                                        handleSelect(row);
                                        handleShow(true);
                                    }}
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