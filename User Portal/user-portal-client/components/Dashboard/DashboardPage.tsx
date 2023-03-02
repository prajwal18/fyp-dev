import React, { useState } from "react";
//MUI Components
import { Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
//MUI Components
//MUI Icon
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
//MUI Icon
import styled from "styled-components";

//Image upload components
import InputFileField from "../Common/form/InputFileField";              // Circular Image
import CoverImgUpload from "./CoverImgUpload";                      // Long rectangular image
//Image upload components
import MockData from "./MockData";                                  // Mock Data


//Styled Components
const BaseText = styled(Typography)`
    color: #4F4F4F;
    font-size: 18px;
`;
const MainInfoText = styled(BaseText)`
    font-size: 21px;
`;
const BodyLabelText = styled(BaseText)`
    font-weight: 600;
`;
const ImageSectionContainer = styled(Box)`
    position: relative;
    width: 100%;
    dispaly: flex; align-items: center;
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid red;
`;
//Styled Components


// Image Section
const ImageSection = () => {
    const [profile, setProfile] = useState("");
    const [cover, setCover] = useState("");
    return (
        <ImageSectionContainer>
            <Box>
                <CoverImgUpload image={cover} setImage={setCover} id="cover-image" />
            </Box>
            <Box sx={{ height: "150px", width: "150px", position: "absolute", top: "45px", left: "45px" }}>
                <InputFileField image={profile} setImage={setProfile} dimension={{ height: 150, width: 150 }} id="profile-image" />
            </Box>
        </ImageSectionContainer>
    );
}
// Image Section

// Text Section
const InfoSection = () => {
    return (
        <Stack spacing={2}>
            <Box>
                <Stack direction="row" justifyContent={"flex-end"}>
                    <Button variant="outlined" sx={{ borderRadius: "50%", height: "50px", width: "50px" }}><CreateSharpIcon fontSize="small" /></Button>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
                    <MainInfoText>{MockData.mainInfo.name}</MainInfoText>
                    <MainInfoText>{MockData.mainInfo.college}</MainInfoText>
                </Stack>
                <Box sx={{ padding: "5px" }}></Box> {/* To add spacing */}
                <MainInfoText>{MockData.mainInfo.course}</MainInfoText>
                <MainInfoText>{MockData.mainInfo.address}</MainInfoText>
            </Box>

            <Box>
                <Typography variant="h5" component="div">Personal Information</Typography>
                <Box sx={{ padding: "10px 20px" }}>
                    {
                        Object.entries(MockData.personalInfo).map(([key, value]: [string, string], index: number) => {
                            return (
                                <Stack direction="row" spacing={1} key={index}>
                                    <BodyLabelText>{key}:</BodyLabelText>
                                    <BaseText>{value}</BaseText>
                                </Stack>
                            )
                        })
                    }
                </Box>
            </Box>

            <Box>
                <Typography variant="h5" component="div">About Myself</Typography>
                <Box sx={{ padding: "10px 20px" }}>
                    <Stack direction="row" spacing={1}>
                        <BaseText>{MockData.aboutMe}</BaseText>
                    </Stack>
                </Box>
            </Box>

        </Stack>
    )
}
// Text Section

const DashboardPage = () => {
    return (
        <Box sx={{ padding: "20px 30px", backgroundColor: "white" }}>
            <ImageSection />
            <InfoSection />
        </Box>
    )
}

export default DashboardPage;