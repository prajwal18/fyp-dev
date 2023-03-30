import {
    Stack, Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const EditGrading = ({ handleEdit }: { handleEdit: () => void }) => {
    return (
        <Stack mb={2} direction="row" justifyContent="flex-end">
            <Stack sx={{
                justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'rgba(28, 175, 229, 0.3)', borderRadius: "50%",
                cursor: 'pointer', '&:hover': { background: 'rgba(28, 175, 229, 0.6)' }, '&:active': { background: 'rgba(28, 175, 229, 0.8)' }
            }}
                onClick={handleEdit}
                title="Edit Grading"
            >
                <EditIcon />
            </Stack>
        </Stack>
    )
}

export default EditGrading;