import React from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button

} from "@mui/material";

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// MUI Icon

const PeopleFilter = () => {
  return (
    <Box mt={2} mb={3} p={2} sx={{ background: "rgba(0,0,0,0.05)" }}>
      <Stack direction='row' gap={2} sx={{ maxWidth: "500px" }}>
        {/* Filter by Role */}
        <FormControl fullWidth>
          <InputLabel id="select-role-label">Role</InputLabel>
          <Select
            labelId="select-role-label"
            id="select-role"
            label="Role"
          >
            <MenuItem value={10}>Student</MenuItem>
            <MenuItem value={20}>Teacher</MenuItem>
          </Select>
        </FormControl>
        {/* Filter by Role */}

        {/* Filter by Role */}
        <FormControl fullWidth>
          <InputLabel id="select-course-label">Course</InputLabel>
          <Select
            labelId="select-course-label"
            id="select-course"
            label="Course"
          >
            <MenuItem value={10}>Science</MenuItem>
            <MenuItem value={20}>Math</MenuItem>
            <MenuItem value={30}>Physics</MenuItem>
            <MenuItem value={30}>Chemistry</MenuItem>
          </Select>
        </FormControl>
        {/* Filter by Role */}

        {/*Remove Filters*/}
        <Button variant='outlined' color='secondary'>
          <RestartAltIcon />
        </Button>
        {/*Remove Filters*/}
      </Stack>
    </Box>
  )
}

export default PeopleFilter;