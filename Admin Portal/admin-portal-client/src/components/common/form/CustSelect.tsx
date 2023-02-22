import {
    FormControl, Box, MenuItem,
    InputLabel, Select
} from '@mui/material';
import { ErrorMessage } from './CustTextFieldNErrorMsg';
import { OptionType } from '../../../constants/CustomTypes';

export function GenerateCustSelect({ formik, name, label, id, options }: { formik: any, name: string, label: string, id: string, options: Array<OptionType> }) {
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <FormControl fullWidth>
                    <InputLabel id={`${id}-label`}>{label}</InputLabel>
                    <Select
                        labelId={`${id}-label`}
                        id={id}
                        value={formik.values[name]}
                        name={name}
                        label={label}
                        onChange={formik.handleChange}
                    >
                        {
                            options.map((option: OptionType, index: number) => {
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