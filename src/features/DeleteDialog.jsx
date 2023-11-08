import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@mui/material';

export const DeleteDialog = ({
  heading,
  paragraph,
  deleteBtnPressed,
  closeBtnPressed,
  deleteDialogOpen
}) => (
    <Dialog
        open={deleteDialogOpen}
        keepMounted
        onClose={() => {
          closeBtnPressed(deleteDialogOpen);
        }}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            {paragraph}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteBtnPressed('1');
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              closeBtnPressed(deleteDialogOpen);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
