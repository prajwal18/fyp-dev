import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
//Mui Icons
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';                  // Test
import DriveFolderUploadSharpIcon from '@mui/icons-material/DriveFolderUploadSharp';    // Assignment
import SchoolIcon from '@mui/icons-material/School';                                    // Courses
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';                    // Student / Teacher
import { useEffect, useState } from "react";
import { apiCallNResp } from "@/utils/apiCallNResp";
import { httpGetHeadInfo } from "@/service/stats.service";
import { toast } from "react-toastify";
//Mui Icons

// Head Info Initial Value 
const HeadInfoIV = {
    "courses": 0,
    "users": {
        "students": 0,
        "teachers": 0
    },
    "testsSubmitted": {
        "total": 0,
        "graded": 0
    },
    "assignmentsSubmitted": {
        "total": 0,
        "graded": 0
    }
}
// Head Info Initial Value 

const HeaderInfoBox = styled(Box)`
    display: flex;
    gap: 40px;
`;
const IconBox = styled(Box)`
    padding: 10px;
    border-radius: 5px;
    font-size: 20px;
    background: ${(props: any): any => props.color};
`;
const HeaderInfo = () => {
    const [headInfo, setHeadInfo] = useState(HeadInfoIV);
    useEffect(() => {
        apiCallNResp(() => httpGetHeadInfo())
        .then((response:any) => {
            if(response.success){
                setHeadInfo(response.data);
            } else {
                toast.error("Problem fetching user's dashboard information.");
            }
        })
        .catch((error:any) => {
            toast.error(error.message);
        })
    }, []);
    return (
        <Box sx={{ background: "white", borderRadius: "5px", padding: "30px 20px", flexGrow: "1" }}>
            <Typography component="p" mb={2}>Homework Buddy</Typography>
            <HeaderInfoBox>

                <HeaderSubInfo
                    icon={<SchoolIcon sx={{ color: "white", fontSize: "30px" }} />}
                    color="rgba(47, 128, 237, 1)"
                    title={"Courses"}
                    values={[`${headInfo.courses}`]}
                />

                <HeaderSubInfo
                    icon={<GroupsOutlinedIcon sx={{ color: "white", fontSize: "30px" }} />}
                    color="rgba(111, 207, 151, 1)"
                    values={[`Teachers: ${headInfo.users.teachers}`, `Students: ${headInfo.users.students}`]}
                />

                <HeaderSubInfo
                    icon={<AssignmentSharpIcon sx={{ color: "white", fontSize: "30px" }} />}
                    color="rgba(151, 71, 255, 1)"
                    values={[`Test Submissions: ${headInfo.testsSubmitted.total}`, `Graded Test Submissions: ${headInfo.testsSubmitted.graded}`]}
                />

                <HeaderSubInfo
                    icon={<DriveFolderUploadSharpIcon sx={{ color: "white", fontSize: "30px" }} />}
                    color="rgba(255, 166, 41, 1)"
                    values={[`Assignment Submissions: ${headInfo.assignmentsSubmitted.total}`, `Graded Assignment Submissions: ${headInfo.assignmentsSubmitted.graded}`]}
                />

            </HeaderInfoBox>
        </Box>
    );
}
type HeaderSubInfoType = { icon: any, color: string, title?: string, values: Array<string> };

const HeaderSubInfo = ({ icon, color, title, values }: HeaderSubInfoType) => {
    return (
        <Box sx={{ display: "flex", gap: "20px", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <IconBox color={color}>
                {icon}
            </IconBox>

            <Box sx={{ display: "flex", gap: "5px", flexDirection: "column" }}>
                {
                    title &&
                    <Typography sx={{ fontSize: "20px", fontWeight: "500" }} component="span">{title}</Typography>
                }
                {
                    values.map((value: any, index: number) => (
                        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Typography component="span" sx={{ fontSize: title ? "20px" : "16px" }}>{value}</Typography>
                        </Box>
                    ))
                }
            </Box>

            <Box sx={{ width: "2px", height: "100%", background: "rgba(49, 80, 161, 0.2)" }}></Box>

        </Box>
    )
}


export default HeaderInfo;