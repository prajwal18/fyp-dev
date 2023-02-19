import React, { useState } from "react";
import { Box, TextField, Stack } from "@mui/material";
// MUI Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// MUI Icon
import { ErrorMessage } from "./CustTextFieldNErrorMsg";

const PasswordTextField = ({ formik, name, label }: { formik: any, name: string, label: string }) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    return (
        <Box sx={{width:"100%"}}>
                <TextField
                    name={name}
                    label={label}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    type={show? "text": "password"}
                    fullWidth
                    sx={{ width:"100%" }}
                    InputProps={{
                        endAdornment: (
                            <Stack
                                sx={{
                                    '&:hover': { cursor: "pointer" },
                                    height: "100%", minWidth: "30px",
                                    padding:"0 10px" 
                                }}
                                onClick={handleShow}
                            >
                                {
                                    show ?
                                        <VisibilityOffIcon />
                                        :
                                        <VisibilityIcon />
                                }
                            </Stack>
                        )
                    }}
                />

            {formik.touched?.[name] && formik.errors?.[name] && <ErrorMessage message={formik.errors?.[name]} />}
        </Box>
    )
}

export default PasswordTextField;