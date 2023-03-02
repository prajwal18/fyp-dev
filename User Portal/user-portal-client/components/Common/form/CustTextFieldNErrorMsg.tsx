import React from 'react';
import { Typography, TextField, Box } from '@mui/material'

export function ErrorMessage({ message }: { message: any }) {
    return (
        <Typography sx={{ color: "#ad2f2f", fontSize: "0.9rem", padding: "5px" }}>{message}</Typography>
    )
}
export function GenerateCustTextField({ formik, name, label, type = "text" }: { formik: any, name: string, label: string, type?: string }) {
    return (
        <Box sx={{ width: "100%" }}>
            <TextField
                name={name}
                label={label}
                value={formik.values[name]}
                onChange={formik.handleChange}
                type={type}
                fullWidth
            />
            {formik.touched?.[name] && formik.errors?.[name] && <ErrorMessage message={formik.errors?.[name]} />}
        </Box>
    )
}

export function GenerateCustTextArea({ formik, name, label, rows }: { formik: any, name: string, label: string, rows: number }) {
    return (
        <Box sx={{ width: "100%" }}>
            <TextField
                name={name}
                label={label}
                value={formik.values[name]}
                onChange={formik.handleChange}
                rows={rows}
                multiline
                fullWidth
            />
            {formik.touched?.[name] && formik.errors?.[name] && <ErrorMessage message={formik.errors?.[name]} />}
        </Box>
    )
}

