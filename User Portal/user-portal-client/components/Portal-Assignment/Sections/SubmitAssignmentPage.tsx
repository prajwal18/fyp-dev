import React from 'react';
import Image from 'next/image';
import {
    Box, Typography, Stack,
    Button, TextField
} from '@mui/material';

import { AssignmentInfoTable, AssignmentTitle } from '../Common/AssignmentTableComponents';
import landscapeImg from '@/public/Images/login-background.jpg';

// Styled component
import { BorderedBox } from '@/components/Common/styled/StyledComponents';



const TopContainer = () => {
    return (
        <Stack direction='row' spacing={2} mt={5}>

            <BorderedBox sx={{ width: "60%" }}>
                <Stack spacing={2}>
                    <Stack direction="row" sx={{ gap: "20px", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                        <Typography sx={{ fontSize: "24px" }}>Submit Your Work</Typography>
                        <Typography sx={{ fontSize: "0.8rem", fontWeight: "700" }}>Assign</Typography>
                    </Stack>
                    <TextField label='Upload your document' type='file' focused />
                    <TextField label='Add a Description' multiline rows={4} />
                    <Button variant="contained" sx={{ width: "100%", padding: "10px" }}>
                        <Typography>Mark As Done</Typography>
                    </Button>
                </Stack>
            </BorderedBox>

            <BorderedBox sx={{ width: "40%" }}>
                <Stack sx={{ padding: "10px" }}>
                    <Image
                        src={landscapeImg}
                        alt="Assignment Manual"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            objectFit: "cover"
                        }}
                    />
                </Stack>
            </BorderedBox>
        </Stack>
    );
}
const SubmitAssignmentContainer = () => {
    return (
        <Stack
            sx={{ padding: "20px 30px", minHeight: "95vh" }}
            direction='row'
            alignItems='center'
            justifyContent='center'
        >

            <Box sx={{ padding: "20px" }}>
                <AssignmentTitle />
                <TopContainer />
                <BorderedBox mt={5}>
                    <Typography mb={3} sx={{ fontSize: "24px" }}>Assignment Information</Typography>
                    <AssignmentInfoTable />
                </BorderedBox>
            </Box>
        </Stack>
    );
}


export default SubmitAssignmentContainer;