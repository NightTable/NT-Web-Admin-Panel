import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

export const DialogBox = ({
  heading,
  paragraph,
  Btn1Name,
  Btn2Name,
  Btn1Pressed,
  Btn2Pressed,
  DialogOpen,
}) => {
  return (
    <>
      <Dialog
        open={DialogOpen}
        keepMounted
        onClose={() => {
          closeBtnPressed(DialogOpen);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {paragraph}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              Btn1Pressed(`1`);
            }}
          >
            {Btn1Name}{" "}
          </Button>
          <Button
            onClick={() => {
              Btn2Pressed(DialogOpen);
            }}
          >
            {Btn2Name}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
