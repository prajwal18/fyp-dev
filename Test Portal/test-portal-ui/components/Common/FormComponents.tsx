import * as React from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";

export const SelectSubject = () => {
    return (
        <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="select-subject">
                Select subject
            </InputLabel>
            <Select
                id="select-subject" labelId="select-subject" label="Select Subject"
                defaultValue={"All"}
                sx={{height:"35px", fontSize:"16px"}}
            >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Science"}>Science</MenuItem>
                <MenuItem value={"Psychology"}>Psychology</MenuItem>
            </Select>
        </FormControl>
    )
}

export default function Hello() {
    return(
        <div>Hello</div>
    )
}