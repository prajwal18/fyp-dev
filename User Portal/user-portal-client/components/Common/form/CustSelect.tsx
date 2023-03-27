import {
    FormControl, Box, MenuItem,
    InputLabel, Select
} from '@mui/material';
import { ErrorMessage } from './CustTextFieldNErrorMsg';
import { DDOptionT } from '../../../constants/CustomTypes';

export function GenerateCustSelect({ formik, name, label, id, options }: { formik: any, name: string, label: string, id: string, options: Array<DDOptionT> }) {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                    <InputLabel id={`${id}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${id}-label`}
                        id={id}
                        defaultValue=''
                        value={formik?.values?.[name] || ''}
                        name={name}
                        label={label}
                        onChange={formik.handleChange}
                    >
                        {
                            options.map((option: DDOptionT, index: number) => {
                                return (
                                    <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                {formik.touched?.[name] && formik.errors?.[name] && <ErrorMessage message={formik.errors?.[name]} />}
            </Box>

        </>
    )
}