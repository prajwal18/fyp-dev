import { Box, Button } from '@mui/material';
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