import { Container, Box } from "@mui/material";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Styled Components
const DashboardContainer = styled(Container)`
    margin: 0px; padding: 0px;
    min-height: 100vh;
    background: #DEDEDE;
    padding-left: 430px;

    @media (max-width: 1300px){
        padding-left: 370px;
    }
    @media (max-width: 1200px){
        padding-left: 320px;
    }
    @media (max-width: 1100px){
        padding: 0px;
    }
`;
// Styled Components

const DashLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <DashboardContainer maxWidth={false}>
            <Navbar/>
            <Sidebar />
            <Box>
                {children}
            </Box>
        </DashboardContainer>
    )
}

export default DashLayout;