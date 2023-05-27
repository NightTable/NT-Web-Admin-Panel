import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { AddClubImage, getClubs } from "../../services/club";
import { CircularProgress } from "@mui/material";
import { Upload } from "@mui/icons-material";
//Main Function

const UploadSingleImage = (data) => {
  // console.log("UploadSingleImage====>");
  const [alert, setAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alert;

  //Navigation Hooks
  const navigate = useNavigate();

  const [files, setfiles] = useState([]);
  const classes = useStyles();

  const [ImageFiles, setImageFiles] = useState([]);
  const [Visible, setVisible] = useState(false);

  const [imageUploadLoader, setimageUploadLoader] = useState(data.imageLoader);

  const selectDropzoneFiles = (files) => {
    if (files == 0) {
    } else {
      console.log(files[0].name, "files[0].name");
      console.log("SELECTED A EVENT PHOTO=====>");
      data.handleSubmit(files);
    }
  };

  return (
    <div>
      <Box
        sx={{
          flexDirection: {
            md: "row",
            xs: "column",
          },
          alignItems: {
            ms: "flex-start",
            xs: "center",
          },
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "40%",
            maxWidth: "443px",
            minWidth: "315px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "flex-start",
              flexDirection: "column",
              margin: 20,
            }}
          >
            {imageUploadLoader === true ? (
              <>
                <div
                  style={{
                    width: "100%",
                    maxheight: 500,
                    justifyItems: "center",
                    padding: 100,
                  }}
                >
                  <CircularProgress
                    style={{
                      justifyItems: "center",
                      alignItems: "center",
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <DropzoneArea
                  fileObjects={files}
                  showFileNames
                  id="file-upload"
                  dropzoneText="Drag 'n' Drop File Here Or"
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  showAlerts={["error"]}
                  filesLimit={1}
                  alertSnackbarProps={{
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  }}
                  maxFileSize={9000000}
                  showPreviews={true}
                  showPreviewsInDropzone={false}
                  useChipsForPreview
                  previewGridProps={{
                    container: { spacing: 1, direction: "row" },
                  }}
                  previewChipProps={{ classes: { root: classes.previewChip } }}
                  previewText="Selected files"
                  className={classes.Dropzone}
                  onChange={selectDropzoneFiles}
                  acceptedFiles={[".png", ".jpg", ".jpeg"]}
                />
              </>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default UploadSingleImage;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "660px",
    zIndex: 101,
    // overflowY: "scroll",
    height: "500px",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },

  rootProgressBar: {
    width: "100%",
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#037ef3",
    },
  },

  colorPrimary: {
    color: "green",
  },

  Dropzone: {
    "& .MuiDropzoneArea-root": {
      background: "#FAFCFF",
    },
  },
  Browsebtn: {
    color: "#000",
    // border: "1px solid rgb(3, 126, 243)",
    padding: "0.8rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    fontSize: "16px",
    boxSizing: "border-box",
    fontStyle: "normal",
    textAlign: "center",
    fontFamily: "Inter",
    fontWeight: "bold",
    borderRadius: "5px",
    position: "relative",
    transform: "translate(0px, 165px)",
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      transform: "translate(0px, 190px)",
    },
  },
  customFileUpload: {
    cursor: "pointer",
  },

  dialog: {
    padding: theme.spacing(0),
    position: "absolute",
    marginTop: "30px",
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    color: " #ffffff",
    backgroundColor: "#ffb500",
    // backgroundColor: theme.palette.secondary.light,
    // color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
  },
  previewChip: {
    backgroundColor: "#4caf50",
  },
}));
