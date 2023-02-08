import styled from "styled-components";
import { Box, Stack, Typography, Button, Chip } from "@mui/material";
//MUI ICONS
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useRouter } from "next/router";
//MUI ICONS


// Custom Typography
export const CustTypography = styled(Typography)`
    color: rgb(68, 64, 60);
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

// Returns true if the given number's even
export const isEven = (num: number) => {
    return (num % 2 === 0);
}


export const ReadLessonBtn = () => {
    const router = useRouter();
    return (
        <CustButton variant="contained"
            onClick={() => {
                router.push("/Student/ReadLesson");
            }}
        >
            <ArticleOutlinedIcon sx={{height:"20px"}} />
            <span>Read lesson</span>
        </CustButton>
    );
}

export const TestBtn = ({ title }: { title: string }) => {
    const router = useRouter();
    return (
        <CustButton variant="contained"
            onClick={() => {
                router.push("/Student/TakeTest");
            }}
        >
            <CreateOutlinedIcon sx={{height:"20px"}}/>
            <span>{title}</span>
        </CustButton>
    );
}

export const Score = ({score}:{score: number | string}) => {
    return (
        <Chip label={`${score}%`} color="success" sx={{ width: "60px", fontSize:"0.7rem", height:"25px" }} />
    )
}