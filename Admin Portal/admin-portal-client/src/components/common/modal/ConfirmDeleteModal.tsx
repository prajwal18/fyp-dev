import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';

const ConfirmDeleteModal = ({ open, setOpen, handleDelete }: { open: boolean, setOpen: (value: any) => void, handleDelete: () => void }) => {
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={false}
        >
            <DialogTitle
                sx={{ fontWeight: "700" }}
            >
                Delete User, Confirmation.
            </DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this user?
                </Typography>
            </DialogContent>
            <DialogActions sx={{ padding: "20px", display: "flex", gap: "20px" }}>
                <Button onClick={handleClose} color="error" variant='outlined'>Cancle</Button>
                <Button onClick={handleDelete} color="error" variant='contained'>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteModal