import styled from "styled-components";
import { Box, Stack, Typography, Button } from "@mui/material";


// Custom Typography
export const CustTypography = styled(Typography)`
    color: rgb(68, 64, 60);
`;
// label Typo
export const LabelTypo = styled(Typography)`
    font-size: 18px; font-weight: 600;
    width: 300px;
    color: black;
`;

// Container with/without background
export const CustomContainer = styled(Box)`
    padding: 10px;
    background: ${(props: any) => props.giveBackground ? 'rgba(100,100,100, 0.2)' : 'inherit'};
`;
// Custom Stack
export const CustStack = styled(Stack)`
    padding: 40px 20px;
    background: white;
    gap: 20px;
    @media (max-width: 1000px){
        flex-wrap: wrap;
    }
`;
// Custom Button Read and test/review test selectors
export const CustButton = styled(Button)`
    disaply: flex; padding: 2px 10px;
    gap: 5px; text-transform: capitalize;
    font-size: 10px;
    background: #7a7a7a;
    &:hover{
        background: #2e2e2d;
    }
`;
// Stack to hold the buttons and graded at / score
export const StackBtnScore = styled(Stack)`
    justify-content: space-between; align-items:center; padding-right: 50px;
    margin-top: 16px; gap: 16px;
    @media (max-width: 1000px){
        flex-wrap: wrap;
    }
`;