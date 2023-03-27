import { useRef, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';

const Jodit = ({ content, setContent }: { content: any, setContent: (value: any) => void }) => {
  const editor = useRef(null);

  const onChange = (e: any) => {
    setContent(e);
  }

  return (
    <Box>
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={onChange} // preferred to use only this option to update the content for performance reasons
      // onChange={onChange}
      />
      <Typography sx={{ display: "block", p: 1, pl:0, color: 'rgba(0 0 0 / 60%)', fontSize: '12px' }}>
        Due to performance reasons. Take the focus off the editor to see the content.
      </Typography>
    </Box>
  )
}
export default Jodit