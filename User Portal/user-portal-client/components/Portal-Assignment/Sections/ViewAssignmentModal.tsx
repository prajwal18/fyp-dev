import { BoldTableCell, BWTableRow } from "@/components/Common/styled/StyledComponents";
import { Button, Dialog, DialogTitle, Table, TableBody, TableCell, TableContainer, Typography } from "@mui/material";
import Lottie from "lottie-react";
import manualLottie from '@/public/Lottie/manual-lottie.json';
import { Box, Stack } from "@mui/system";
import { toast } from "react-toastify";
import Link from "next/link";
import { baseURL } from "@/utils/endpoints";
// MUI ICONS
import DownloadIcon from '@mui/icons-material/Download';
// MUI ICONS

const AssignmentInfoTable = ({ assignmentData }: { assignmentData: any }) => {
    const handleNoManual = () => {
        toast.info("Sorry, no manual present.");
    }

    return (
        <TableContainer>
            <Table>
                <TableBody>
                    <BWTableRow>
                        <BoldTableCell>Course</BoldTableCell>
                        <TableCell>{assignmentData?.courseId?.name}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Assigned Date</BoldTableCell>
                        <TableCell>{assignmentData?.releaseDate?.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Due Date</BoldTableCell>
                        <TableCell>{assignmentData?.dueDate?.split("T")[0]}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Total Marks</BoldTableCell>
                        <TableCell>{assignmentData?.fullMark}</TableCell>
                    </BWTableRow>
                    <BWTableRow>
                        <BoldTableCell>Description</BoldTableCell>
                        <TableCell sx={{ padding: "10px" }}>
                            {assignmentData?.description}
                        </TableCell>
                    </BWTableRow>

                    <BWTableRow>
                        <BoldTableCell>Assignment Manual</BoldTableCell>
                        <TableCell sx={{ padding: "20px" }}>
                            <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
                                <Stack sx={{ padding: "10px", maxWidth: "150px" }}>
                                    <Lottie animationData={manualLottie} loop={true} />
                                </Stack>

                                {
                                    assignmentData?.manual ?
                                        <Link
                                            href={`${baseURL}${assignmentData.manual}`}
                                            target="_blank" rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "white" }}
                                        >
                                            <Button color="info" variant="contained">
                                                <DownloadIcon />
                                                &nbsp; Download File
                                            </Button>
                                        </Link>
                                        :
                                        <Button color="info" variant="contained" onClick={handleNoManual}>
                                            <DownloadIcon />
                                            <Typography>&nbsp; Download File</Typography>
                                        </Button>

                                }


                            </Stack>
                        </TableCell>
                    </BWTableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

const ViewAssignmentModal = ({ open, setOpen, assignmentData }: { open: boolean, setOpen: (value: any) => void, assignmentData: any }) => {
    const handleClose = () => { setOpen(false) }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
            aria-labelledby="view-assignment"
        >
            <DialogTitle id="view-assignment">
                {assignmentData.title}
            </DialogTitle>
            <Box sx={{ padding: "0px 20px" }}>
                <AssignmentInfoTable
                    assignmentData={assignmentData}
                />
            </Box>
            <Stack direction='row' spacing={2} justifyContent='flex-end' sx={{ padding: "0 10px 20px" }}>
                <Button color="error" variant="outlined" onClick={handleClose}>Close</Button>
            </Stack>
        </Dialog >
    )
}

export default ViewAssignmentModal;