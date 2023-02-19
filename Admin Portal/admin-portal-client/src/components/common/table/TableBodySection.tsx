import React from "react";
import {
    TableBody, TableRow, TableCell, Stack
} from "@mui/material";
// MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// MUI Icons
import styled from 'styled-components';

import { TableBodyPropsType } from "../../../constants/CustomTypes";

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

const TableBodySection = ({ skip, dataList, keyValues, handleShow, handleEdit, handleDelete }: TableBodyPropsType) => {
    return (
        <TableBody>
            {
                dataList && dataList.map((row: any, indexOuter: number) => (
                    <TableRow key={indexOuter} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>
                            {((skip && skip) || 0) + indexOuter + 1}
                        </TableCell>
                        {
                            keyValues.map((item: string, indexInner: number) => (
                                <TableCell key={`${item}${indexOuter}${indexInner}`}>
                                    {row[item]}
                                </TableCell>
                            ))
                        }
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