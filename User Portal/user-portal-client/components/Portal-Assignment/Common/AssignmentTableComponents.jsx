import Image from 'next/image';
import {
    TableContainer, Table, TableBody, TableCell,
    Typography, Stack, Button, Box
} from '@mui/material';
// MUI ICONS
import DownloadIcon from '@mui/icons-material/Download';
// MUI ICONS
// Styled component
import { BoldTableCell, BWTableRow } from '@/components/Common/styled/StyledComponents';
import fillerImg from '@/public/Images/filler.png';


export const AssignmentTitle = () => {
    return (
        <Box sx={{ padding: "10px", borderBottom: "2px solid #1976D2", mb: 3 }}>
            <Typography variant="h5" component="h3" sx={{ fontSize: "24px", fontWeight: "700", color: "#1976D2" }}>Assignment 2: Psychology</Typography>
            <Typography sx={{ fontSize: "0.9rem", my: 1 }}>Mero Raja Pradhan &middot; 8<sup>th</sup> January</Typography>
        </Box>
    );
}

export const AssignmentInfoTable = () => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>Computer Science</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Assigned Date</BoldTableCell>
                        <TableCell>21<sup>st</sup> October 2022</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Due Date</BoldTableCell>
                        <TableCell>30<sup>th</sup> November 2022</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Total Marks</BoldTableCell>
                        <TableCell>100</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Description</BoldTableCell>
                        <TableCell sx={{ padding: "10px" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat odio deleniti blanditiis enim adipisci iste
                            impedit fugit maiores veritatis animi, a mollitia laudantium ea consequatur quisquam placeat. Provident,
                            cumque beatae.
                        </TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>Assignment Manual</BoldTableCell>
                        <TableCell sx={{ padding: "20px" }}>
                            <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                <Stack sx={{ padding: "10px", border: "2px dashed rgba(0,0,0,0.2)" }}>
                                    <Image
                                        src={fillerImg}
                                        alt="Assignment Manual"
                                        style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Stack>

                                <Button color="info" variant="contained">
                                    <DownloadIcon />
                                    <Typography>&nbsp; Download File</Typography>
                                </Button>

                            </Stack>
                        </TableCell>
                    </BWTableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export const AssignmentToBeGraded = () => {
    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>Computer Science</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Status</BoldTableCell>
                        <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submission Date</BoldTableCell>
                        <TableCell>11<sup>th</sup> November 2022</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Submitted By</BoldTableCell>
                        <TableCell>Prajwal Gautam</TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>{"Student\'s Comment"}</BoldTableCell>
                        <TableCell>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quos cupiditate magni doloremque
                            distinctio dignissimos corporis saepe cumque, aperiam accusamus enim velit. Aspernatur reiciendis
                            recusandae quo animi doloribus. Recusandae, unde.
                        </TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>Submission File</BoldTableCell>
                        <TableCell sx={{ padding: "20px" }}>
                            <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                <Stack sx={{ padding: "10px", border: "2px dashed rgba(0,0,0,0.2)" }}>
                                    <Image
                                        src={fillerImg}
                                        alt="Assignment Manual"
                                        style={{
                                            maxWidth: "50px",
                                            maxHeight: "50px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Stack>

                                <Button color="secondary" variant="contained">
                                    <DownloadIcon />
                                    <Typography>&nbsp; Download File</Typography>
                                </Button>

                            </Stack>
                        </TableCell>
                    </BWTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export const AssignmentSubmissionTable = () => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableBody>
                        <BWTableRow>
                            <BoldTableCell>Course</BoldTableCell>
                            <TableCell>Computer Science</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Status</BoldTableCell>
                            <TableCell sx={{ color: "#2e7d32", fontWeight: "700" }}>Graded</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Marks Obtained</BoldTableCell>
                            <TableCell>87</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Submission Date</BoldTableCell>
                            <TableCell>11<sup>th</sup> November 2022</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>Submitted By</BoldTableCell>
                            <TableCell>Prajwal Gautam</TableCell>
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>{"Student\'s Comment"}</BoldTableCell>
                            <TableCell>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quos cupiditate magni doloremque
                                distinctio dignissimos corporis saepe cumque, aperiam accusamus enim velit. Aspernatur reiciendis
                                recusandae quo animi doloribus. Recusandae, unde.
                            </TableCell>
                        </BWTableRow>

                        <BWTableRow>
                            <BoldTableCell>Submission File</BoldTableCell>
                            <TableCell sx={{ padding: "20px" }}>
                                <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                    <Stack sx={{ padding: "10px", border: "2px dashed rgba(0,0,0,0.2)" }}>
                                        <Image
                                            src={fillerImg}
                                            alt="Assignment Manual"
                                            style={{
                                                maxWidth: "50px",
                                                maxHeight: "50px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </Stack>

                                    <Button color="secondary" variant="contained">
                                        <DownloadIcon />
                                        <Typography>&nbsp; Download File</Typography>
                                    </Button>

                                </Stack>
                            </TableCell>
                        </BWTableRow>


                        <BWTableRow>
                            <BoldTableCell>Graded By</BoldTableCell>
                            <TableCell>Mero Raja Pradhan</TableCell>
                        </BWTableRow>
                        <BWTableRow>
                            <BoldTableCell>{"Teacher\'s Remark"}</BoldTableCell>
                            <TableCell>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, quos cupiditate magni doloremque
                                distinctio dignissimos corporis saepe cumque, aperiam accusamus enim velit. Aspernatur reiciendis
                                recusandae quo animi doloribus. Recusandae, unde.
                            </TableCell>
                        </BWTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

