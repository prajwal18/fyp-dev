import {
    Stack, Typography
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EditGrading = ({ handleEdit, handleDelete }: { handleEdit: () => void, handleDelete: () => void }) => {
    return (
        <Stack mb={2} direction="row" justifyContent="flex-end" spacing={2}>
            <Stack sx={{
                justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'rgba(28, 175, 229, 0.3)', borderRadius: "50%",
                cursor: 'pointer', '&:hover': { background: 'rgba(28, 175, 229, 0.6)' }, '&:active': { background: 'rgba(28, 175, 229, 0.8)' }
            }}
                onClick={handleEdit}
                title="Edit Grading"
            >
                <EditIcon />
            </Stack>

            <Stack sx={{
                justifyContent: 'center', alignItems: 'center', padding: '10px', background: 'rgba(245, 60, 60, 0.3)', borderRadius: "50%",
                cursor: 'pointer', '&:hover': { background: 'rgba(245, 60, 60, 0.6)' }, '&:active': { background: 'rgba(245, 60, 60, 0.8)' }
            }}
                onClick={handleDelete}
                title="Delete record"
            >
                <DeleteIcon />
            </Stack>
        </Stack>
    )
}

export default EditGrading;