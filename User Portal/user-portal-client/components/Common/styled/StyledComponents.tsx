import {
    Box, Button,
    TableCell, TableRow
} from '@mui/material';
import styled from "styled-components";

// Styled components
export const BoxStyle = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: white;
    minWidth: 1200px;
`;
export const AddBtn = styled(Button)`
    display: flex !important;
    padding: 10px 20px !important;
    color: white !important;
    background: #3150A1 !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 20px !important;
    text-transform: uppercase !important;
    margin-right: 10px !important;
`;
// Styled components

// Some More styled components
export const BorderedBox = styled(Box)`
    padding: 20px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 5px;
`;
export const BoldTableCell = styled(TableCell)`
    font-weight: 700;
    min-width: 250px;
`;
export const BWTableRow = styled(TableRow)
    (({ theme }: { theme: any }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
// Some More styled components


//Dark button
export const DarkBtn = styled(Button)`
    display: flex;
    align-items:center;
    justify-content: center;
    gap: 10px;
    border-radius: 3px;
    color: white;
    background: rgb(0 0 0 / 50%);
    &:hover {
        background: rgb(0 0 0 / 70%);
    }
    &:active {
        background: rgb(0 0 0 / 100%);
    }
`;
//Dark button