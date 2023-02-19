import styled from 'styled-components';
import Box from '@mui/material/Box';
import Sidebar from "./Sidebar";

// Styled Component
const ContainerBox = styled(Box)`
    height: 100%;
    min-height: 100vh; margin: 0px;
    position: relative;
    background: #F4F4F5;
`;
const SideBarContainer = styled(Box)`
    position: fixed;
    top: 0px;
    left: 0px;
    background: white;
    min-width: 300px;
    width: 300px;
    max-width: 300px;
    min-height: 100vh;
    z-index: 3;
`;
// Styled Component

/**
 * Returns UI (after the user logs in)
 * @params - none
 * @returns JSX.Element the Layout structure of the App ( UI after the user Logs in )
 */
const Layout = ({ children }: { children: JSX.Element }) => {
    return (
        <ContainerBox>
            <SideBarContainer>
                <Sidebar />
            </SideBarContainer>
            <Box sx={{ marginLeft: "305px", minHeight: "100vh", overflowX: "auto", marginRight: "5px" }}>
                <Box sx={{ padding: "20px" }}>
                    {children}
                </Box>
            </Box>
        </ContainerBox>
    )
}

export default Layout;