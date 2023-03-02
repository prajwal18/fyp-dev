import React from 'react';
import {
    Stack, TableCell
} from "@mui/material";
import styled from "styled-components";

// MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
// MUI Icons

import { StackDirection, TableActionTypes } from '../../../constants/Constants';

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

export const TCRowStack = ({ children, direction, gap }: { children: JSX.Element | Array<JSX.Element>, direction: StackDirection, gap: string | number }) => {
    return (
        <TableCell>
            <Stack direction={direction} gap={gap}>
                {children}
            </Stack>
        </TableCell>
    );
}


export const ShowAction = ({ handleShow }: { handleShow: (value: any) => void }) => {
    return (
        <IconContainer
            onClick={handleShow}
        ><VisibilityIcon color="primary" />
        </IconContainer>
    );
}

export const EditAction = ({ handleEdit }: { handleEdit: (value: any) => void }) => {
    return (
        <IconContainer
            onClick={handleEdit}
        ><EditIcon color="secondary" />
        </IconContainer>
    );
}


export const DeleteAction = ({ handleDelete }: { handleDelete: (value: any) => void }) => {
    return (
        <IconContainer
            onClick={handleDelete}
        ><DeleteIcon color="error" />
        </IconContainer>
    );
}


export const MessageAction = ({ handleMessage }: { handleMessage: (value: any) => void }) => {
    return (
        <IconContainer
            onClick={handleMessage}
        ><SendIcon color="info" />
        </IconContainer>
    );
}

export const renderActionBtn = (type: TableActionTypes, callback: (data: any) => void) => {
    switch (type) {
        case TableActionTypes.EDIT:
            return (<EditAction handleEdit={callback} />);
        case TableActionTypes.SHOW:
            return (<ShowAction handleShow={callback} />);
        case TableActionTypes.DELETE:
            return (<DeleteAction handleDelete={callback} />);
        case TableActionTypes.MESSAGE:
            return (<MessageAction handleMessage={callback} />);
        default:
            return <></>
    }
}