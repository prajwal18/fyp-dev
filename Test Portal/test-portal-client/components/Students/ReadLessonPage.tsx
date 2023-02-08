import DashLayout from "../Layout/DashLayout/DashLayout";                                           // Dashboard layout component
import { Box, Stack } from "@mui/material";
import parse from 'html-react-parser';
import { CustTypography } from "../Common/ContainersNButtons";
import { ReadLessonData, ReadLessonDataType } from "./MockData/ReadLessonMock";
import styled from "styled-components";

//Styled components
const ColumnContainer = styled(Box)`
    marginTop: 2rem;
    column-count: ${(props: any) => props.columnCount};

    @media (max-width: 1000px){
        column-count: 1;
    }
`;
//Styled components

type ReadLessonPropType = {
    instructionData: Array<ReadLessonDataType>,
    columnCount: number
}
export const ReadLessonSection = ({ instructionData, columnCount }: ReadLessonPropType) => {
    return (
        <Box sx={{ width: "100%" }}>
            <CustTypography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700" }}>Upcomming Tests</CustTypography>
            <ColumnContainer columnCount={columnCount}>
                {
                    instructionData.map((item: any) => (
                        <Stack key={item.id} sx={{ margin: "20px 0px" }} spacing={2}>
                            <CustTypography sx={{ fontWeight: "700" }}>{item.title}</CustTypography>
                            {
                                item.subTitle &&
                                <CustTypography>{item.subTitle}</CustTypography>
                            }

                            <Box className="read-lesson-content">
                                {
                                    parse(item.content || "")
                                }
                            </Box>

                        </Stack>
                    ))
                }
            </ColumnContainer>
        </Box>
    )
}

const ReadLessonContainer = ({ columnCount }: { columnCount: number }) => {
    return (
        <Box sx={{ width: "100%", background: "white", padding: "20px" }}>
            <ReadLessonSection columnCount={columnCount} instructionData={ReadLessonData} />
        </Box>
    );
}

const ReadLessonPage = ({ columnCount }: { columnCount: number }) => {
    return (
        <DashLayout>
            <Box sx={{ padding: "20px" }}>
                <ReadLessonContainer columnCount={columnCount} />
            </Box>
        </DashLayout>
    );
}

export default ReadLessonPage;