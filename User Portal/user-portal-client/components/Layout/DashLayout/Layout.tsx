import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
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
const ContentBox = styled(Box)`
    margin-left: ${(props: any) => props.minimize ? "105px" : "305px"};
    min-height: 100vh;
    overflow-z: auto;
    padding: 20px;
    transition: all 200ms;

`;
/**
 * Returns UI (after the user logs in)
 * @params - none
 * @returns JSX.Element the Layout structure of the App ( UI after the user Logs in )
 */
const Layout = ({ children }: { children: JSX.Element }) => {
    const [minimize, setMinimize] = useState(false);
    return (
        <ContainerBox>
            <Sidebar minimize={minimize} setMinimize={setMinimize} />
            <ContentBox minimize={minimize}>
                {children}
            </ContentBox>
        </ContainerBox>
    )
}

export default Layout;