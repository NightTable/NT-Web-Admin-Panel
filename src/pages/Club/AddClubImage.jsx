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
  
  //Main Function
  
  const AddHouseImage = () => {
    const [alert, setAlert] = useState({
      open: false,
      vertical: "top",
      horizontal: "center",
    });
    const { vertical, horizontal, open } = alert;
  
    //local storage
    const UserID = localStorage.getItem("userID");
    const location = useLocation();

    //Navigation Hooks
    const navigate = useNavigate();
  
    const [message, setMessage] = useState("");
    const [files, setfiles] = useState([]);
    const classes = useStyles();
  
    const [ImageFiles, setImageFiles] = useState([]);
    const [Visible, setVisible] = useState(false);
  
    const selectDropzoneFiles = (files) => {
      // setDisable(false);
      if (files == 0) {
        console.log("files[0].type");
      } else {
        console.log(files[0].name, "files[0].name");
        let imageFiles = [];
        let count = 0;
        //   setFiles(files);
  
        if (files.length === 1) {
          const FileType = files[0].type;
          //   setPdfTypeCheck(FileType);
        }
  
        for (let i = 0; i < files.length; i++) {
          let tempFile = files[i];
          if (tempFile.type.includes("image")) {
            imageFiles.push(tempFile);
          }
        }
  
        console.log("imageFiles===>", imageFiles);
        setImageFiles(imageFiles);
        // setImageFileLength(count);
        // setImageFiles(imageFiles);
      }
    };
  
    const handleSubmit = () => {
      console.log("ImageFiles====>", ImageFiles.length);
      if (ImageFiles.length === 0) {
        setMessage("Please select at least one image for the house!");
        setVisible(true);
      } else if (ImageFiles.length > 10) {
        setMessage("You can upload upto 10 Images maximum !");
        setVisible(true);
      } else {
        //  SaveImagetoDb();
        console.log("=======>");
  
        const Response = ImageFiles.forEach((file, index) => {
          // console.log("element====>", file, index);
          SaveImagetoDb(file, index);
        });
        // console.log("=======>", Response);
      }
  
      //   navigate("/");
    };
  
    //Save Images in Database
    const SaveImagetoDb = async (file, index) => {
      var data = new FormData();
      data.append("user_id", UserID);
      data.append("house_id", AddFormHouse_id);
      data.append("file", file);
  
    //   addHouseImages(data)
    //     .then(function (response) {
    //       console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
  
      // console.log("SaveImagetoDb==>", index, UserID, AddFormHouse_id ,`File:`,file);
  
      // // console.log(index === 9 ? "NextScreen" : "") ;
    //   console.log("index === ImageFiles.length", index, ImageFiles.length);
    //   if (index + 1 === ImageFiles.length) {
    //     navigate("/dashboard");
    //   }
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
            <Typography
              variant="h5"
              style={{
                fontWeight: "600",
                margin: 40,
              }}
            >
              Add House Image
            </Typography>
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
                <DropzoneArea
                  //     Icon={CloudUploadIcon}
                  fileObjects={files}
                  showFileNames
                  id="file-upload"
                  dropzoneText="Drag 'n' Drop File Here Or"
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  showAlerts={["error"]}
                  filesLimit={10}
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
              </div>
            </div>
  
            <Button
              disabled={false}
              variant="contained"
              style={{
                backgroundColor: "orange",
                //float: "right",
                margin: 20,
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </div>
     
    );
  };
  
  export default AddHouseImage;
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
  