import React from 'react';
import {
  Box, FormControl, InputLabel,
  MenuItem, Select, Stack, Button

} from "@mui/material";

// MUI Icon
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// MUI Icon

const TestFilter = () => {
  return (
    <Box mt={2} mb={3} p={2} sx={{ background: "rgba(0,0,0,0.05)" }}>
      <Stack direction='row' gap={2} sx={{ maxWidth: "500px" }}>
        {/* Filter by Role */}
        <FormControl fullWidth>
          <InputLabel id="select-Test-Type-label">Test Type</InputLabel>
          <Select
            labelId="select-Test-Type-label"
            id="select-Test-Type"
            label="Test Type"
          >
            <MenuItem value={10}>Upcomming</MenuItem>
            <MenuItem value={20}>Submited</MenuItem>
            <MenuItem value={20}>Todo</MenuItem>
            <MenuItem value={20}>Graded</MenuItem>
          </Select>
        </FormControl>
        {/* Filter by Role */}

        {/* Filter by Course */}
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
        {/* Filter by Course */}

        {/*Remove Filters*/}
        <Button variant='outlined' color='secondary'>
          <RestartAltIcon />
        </Button>
        {/*Remove Filters*/}
      </Stack>
    </Box>
  )
}

export default TestFilter