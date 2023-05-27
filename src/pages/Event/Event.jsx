import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { filter } from "lodash";
import Box from "@mui/material/Box";
import { TextField } from "@material-ui/core";
import "../../css/DasboardCss.css";
// @mui
import { useTheme } from "@mui/material/styles";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Switch from "@material-ui/core/Switch";
import Iconify from "../../component/iconify";
import CircularProgress from "@mui/material/CircularProgress";

// components
import Scrollbar from "../../component/scrollbar";
import ResponsiveDateTimePickers from "src/component/ResponsiveDateTimePIcker";

// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
//theme
import palette from "../../theme/palette";
// ----------------------------------------------------------------------
import { addEventtoDb, deleteEvent, getEventofClub } from "src/services/Event";
import { getCurrentDate, convertToTimeStamp } from "../../utils/Day";

import { EVENTS_TABLE_HEAD } from "../../Table_Head/index";
import ViewEventInfo from "./ViewEventInfo";
import { LocalStorageKey } from "src/utils/localStorage/keys";
//services
import { getProfileData } from "src/services/representative";
import dayjs from "dayjs";
import UploadSingleImage from "../UploadImage/UploadSingleImage";
import { AddImage } from "src/services/upload";

//MAIN FUNCTION

export default function EventDashboard() {
  //get the current date
  const currentDateinISO5601 = dayjs().format("YYYY-MM-DDTHH:MM");
  const currentDateinTimeStamp = dayjs().valueOf();

  const theme = useTheme();
  //NAVIGATION
  const navigate = useNavigate();
  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  //CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState("0");
  //IMAGE POP-UP LOADER
  const [eventImageLoader, seteventImageLoader] = useState(false);
  const [eventImage, seteventImage] = useState();
  //States

  //CREATE EVENT STATES==>
  const [EventName, setEventName] = useState("");
  const [ticketLink, setticketLink] = useState("");
  const [EventDate, setEventDate] = useState(currentDateinISO5601);
  const [eventLoader, seteventLoader] = useState(false);
  const [editEvent, seteditEvent] = useState(false);
  const [editEventImage, seteditEventImage] = useState(true)
  //SHOW CLUB
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //EVENT
  const [EventData, setEventData] = useState([]);
  const [selectedEventData, setselectedEventData] = useState([]);

  //TABLE CONFIGURATION
  const [addTableConfigPopup, setaddTableConfigPopup] = useState(false);
  //minimun price
  const [minPriceTC, setminPriceTC] = useState("");
  //type
  const [typeTC, settypeTC] = useState("");
  //recommendedCapacity
  const [recomCapacityTC, setrecomCapacityTC] = useState("");
  //table mapId
  const [tmapleIDTC, settmapleIDTC] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  // get the clubs
  //IF
  const loadData = async () => {
    const representativeId = localStorage.getItem(LocalStorageKey.USER_ID);
    if (representativeId === null) {
      navigate("/");
    } else {
      getClubData(JSON.parse(representativeId));
    }
  };

  //GET CLUB DATA ====>
  const getClubData = async (representativeId) => {
    const data = await getProfileData(representativeId);
    let tempArr = [];
    data.clubPrivileges.map((item) => {
      tempArr.push({
        name: item.club.name,
        _id: item._id,
      });
    });

    setselectedClubData(tempArr[0]);
    let obj = {
      date: currentDateinTimeStamp,
    };
    setclubs_data(tempArr);
    getClubsEvent(tempArr[0]._id, obj);
  };

  //GET CLUBS OF EVENT
  const getClubsEvent = async (club_id, obj) => {
    const data = await getEventofClub(club_id, obj);
    if (data.status === true) {
      setEventData(data.data);
    } else if (data.status === false) {
      if (data?.message === "No events found for the club") {
        setEventData([]);
      } else {
        // NO EVENTS FOUND
        setEventData([]);
      }
    }
  };

  var Data = new FormData();

  //API CALL : ADD EVENT CLUB
  const addEvent = async () => {
    if (eventImage.length != undefined) {
      seteventLoader(true);
      //ADD EVENT IMAGE DATA APPEND
      Data.append("_id", selectedClubData._id);
      Data.append("files", eventImage[0]);
      //ADD EVENT IMAGE API CALL
      const ImgUpload = await AddImage(Data);
      // console.log("clubImg====>", ImgUpload);
      if (ImgUpload.message == "files uploaded") {
        let obj = {
          name: EventName,
          picture: ImgUpload.data[0],
          eventDate: EventDate,
          eventTime: EventDate,
          ticketLink: ticketLink,
          clubId: selectedClubData?._id,
        };

        const storeEvent = await addEventtoDb(obj, selectedClubData?._id);
        console.log("storeEvent====>", storeEvent);
        if (storeEvent.status === true) {
          //UPDATE THE MAIN ARRAY
          setEventData(storeEvent?.data?.data);
          //CLEAR THE STATES
          clearAddPopUpStates();
          //CLOSE ADD EVENT POP-UP
          setEventClubPopUp(false);
          seteventLoader(false);
        } else {
          //WHEN EVENT ADD API NOT WORKING
          alert("ERROR while creating Events!");
        }
      } else {
        //WHEN IMAGE DOES N'T GET UPLOADED
        alert("ERROR while creating Events!");
      }
      alert("ERROR while creating Events!");
    } else {
      alert("Please select a Event Image!");
    }
  };

  // CLEAR ADD POP-UP STATES
  const clearAddPopUpStates = () => {
    setEventDate("");
    setEventName("");
    setticketLink("");
  };

  //dialog

  const [ImageDialogPopUp, setImageDialogPopUp] = useState(false);
  const [ViewClubInfoPopUp, setViewClubInfoPopUp] = useState(false);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  //add club pop-over open
  const [addEventPopUp, setEventClubPopUp] = useState(false);

  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

  // DELETE EVENT UI
  const DeleteEventDialog = () => {
    return (
      <>
        <Dialog
          open={deleteDialogOpen}
          keepMounted
          onClose={() => {
            setdeleteDialogOpen(!deleteDialogOpen);
          }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete the club?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure want to delete the Event, as you won't be able to
              recover it ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClose(`1`);
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleClose(`2`);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  //delete event pop-up
  const handleClose = async (id) => {
    if (id == "1") {
      //API CALL
      const eventtoDelete = await deleteEvent(
        selectedClubData._id,
        selectedEventData._id
      );

      if (eventtoDelete.status === true) {
        const a = EventData.filter((item) => {
          return item._id !== selectedEventData._id;
        });
        // UPDATE THE DATA
        setEventData(a);
        setdeleteDialogOpen(false);
        alert("EVENT DELETED SUCCESSFULLY !");
      } else {
        alert("ERROR IN DELETING THE EVENT ");
      }
    } else id == "2";
    setdeleteDialogOpen(false);
  };

  const ViewClubInforamtionDialog = () => {
    return (
      <>
        <Popover
          open={ViewClubInfoPopUp}
          anchorEl={open}
          onClose={() => {
            setViewClubInfoPopUp(!true);
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: "80%",
              hieght: "100%",
              borderColor: "#E4D0B5",
              // backgroundColor: '#E4D0B5',
              borderWidth: 1,

              "& .MuiMenuItem-root": {
                typography: "body2",
                // borderRadius: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                borderColor: "#E4D0B5",
                borderWidth: 12,
              },
            },
          }}
        >
          <Scrollbar>
            <Box
              component="form"
              sx={{
                width: "100%",
                borderWidth: 4,
                backgroundColor: "black",
                borderRadius: 4,
              }}
              autoComplete="on"
            >
              <Stack alignItems={"flex-end"} justifyItems={"right"}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    setViewClubInfoPopUp(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon={"maki:cross"} />
                </IconButton>
              </Stack>
            </Box>
          </Scrollbar>
        </Popover>
      </>
    );
  };

  //TABLE CONFIGURATION
  const addTableConfiguration = () => {
    console.log("selectedClubData===>", selectedClubData._id);
    console.log("selectedEventData====>", selectedEventData._id);
    let obj = {
      type: typeTC,
      minPrice: minPriceTC,
      recommendedCapacity: recomCapacityTC,
      clubId: selectedClubData._id,
      eventId: selectedEventData._id,
      tableMapId: tmapleIDTC,
    };

    // ADD TABLE CONFIGURATION
    // PATCH EVENT ADD
    // GET EVENT NEW DETAILS

    console.log("obj===>", obj);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EventData.length) : 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const filteredData = applySortFilter(
    EventData,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredData?.length && !!filterName;
  //  console.log("isNotFound===>", isNotFound, !filteredData?.length);
  return (
    <>
      <Helmet>
        <title> Night Table : Events </title>
      </Helmet>

      <Container maxWidth="xl">
        <Container>
          <Stack direction="row" justifyContent="space-between" mb={5}>
            <Typography variant="h4" sx={{ color: "#E4D0B5" }}>
              Events
            </Typography>
          </Stack>
          <Box display="flex">
            <Box width="50%" textAlign="left">
              {/* <Box width='50%'> */}
              <ResponsiveDateTimePickers
                value={currentDateinISO5601}
                onChange={(date) => {
                  //    console.log("Selected - date ====>", date);
                  setEventDate(date);
                }}
              />
              {/* </Box> */}
            </Box>
            <Box width="50%" textAlign="right">
              <Button
                onClick={() => {
                  setEventClubPopUp(true);
                }}
                style={{
                  backgroundColor: "#E4D0B5",
                  color: "black",
                  padding: 8,
                  borderRadius: 10,
                }}
                variant="Outlined"
                // sx={{ backgroundColor: "#E4D0B5", color: "black" }}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Add Event
              </Button>
            </Box>
          </Box>

          <Scrollbar>
            <Stack direction="row" mt={2} mb={2}>
              {clubs_data.map((item, index) => {
                return (
                  <>
                    <Box
                      onClick={() => {
                        setselected_club_btn(index);
                        setselectedClubData(item);
                        let obj = {
                          date: currentDateinTimeStamp,
                        };
                        getClubsEvent(item._id, obj);
                      }}
                      border={2}
                      borderRadius={2}
                      marginRight={2}
                      borderColor={
                        index == selected_club_btn ? "black" : "#E4D0B5"
                      }
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      backgroundColor={
                        index == selected_club_btn ? "#E4D0B5" : "black"
                      }
                    >
                      <Typography
                        variant="body1"
                        style={{
                          color:
                            index == selected_club_btn ? "black" : "#E4D0B5",
                          fontWeight:
                            index == selected_club_btn ? "bold" : "500",

                          padding: 10,
                          textAlign: "center",
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </>
                );
              })}
            </Stack>
          </Scrollbar>

          <Container
            style={{
              borderWidth: 1,
              backgroundColor: "#E4D0B5",
              padding: 1,
              borderRadius: 4,
            }}
            alignItems
          >
            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    headLabel={EVENTS_TABLE_HEAD}
                    rowCount={EventData.length}
                    numSelected={selected.length}
                  />
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableBody>
                    {filteredData &&
                      filteredData
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        ?.map((item, index) => {
                          const {
                            _id,
                            name,
                            isTableConfigAdded,
                            picture,
                            ticketLink,
                            eventDate,
                          } = item;

                          return (
                            <>
                              <TableRow
                                style={{
                                  margin: 20,
                                }}
                                bgcolor={"#E4D0B5"}
                                // hover
                                key={_id}
                                tabIndex={-1}
                              >
                                <TableCell align="right">
                                  {/* <Stack flexDirection={"row"}>
                                    <IconButton
                                      style={{
                                        background: "black",
                                      }}
                                      size="large"
                                      onClick={() => {
                                        setselectedClubData(item);
                                        setViewClubInfoPopUp(true);
                                      }}
                                    >
                                      <Iconify
                                        color={"#E4D0B5"}
                                        icon={"ic:sharp-remove-red-eye"}
                                      />
                                    </IconButton>
                                  </Stack> */}
                                </TableCell>
                                <TableCell align="left">
                                  <Typography sx={{ color: "black" }}>
                                    {isTableConfigAdded === false ? (
                                      <>
                                        <IconButton
                                          style={{
                                            background: "black",
                                          }}
                                          size="large"
                                          color="inherit"
                                          onClick={() => {
                                            console.log("icons pressed ===?>");
                                            setselectedEventData(item);
                                            setaddTableConfigPopup(true);
                                          }}
                                        >
                                          <Iconify
                                            color={"#E4D0B5"}
                                            icon="eva:plus-fill"
                                          />
                                        </IconButton>
                                      </>
                                    ) : (
                                      "true"
                                    )}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  bgcolor={"#E4D0B5"}
                                  component="th"
                                  scope="row"
                                  padding="none"
                                >
                                  <Typography
                                    sx={{ color: "black", px: 2 }}
                                    variant="subtitle2"
                                    noWrap
                                  >
                                    {index + 1}
                                    {" )"} {name}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  bgcolor={"#E4D0B5"}
                                  component="th"
                                  scope="row"
                                  padding="none"
                                >
                                  <Typography
                                    sx={{ color: "black", px: 2 }}
                                    variant="subtitle2"
                                    noWrap
                                  >
                                    {dayjs(eventDate).format(
                                      "DD-MM-YYYY HH:MM"
                                    )}
                                  </Typography>
                                </TableCell>

                                <TableCell align="right">
                                  <Stack flexDirection={"row"}>
                                    <IconButton
                                      size="large"
                                      color="inherit"
                                      onClick={() => {
                                        seteditEvent(true);
                                        seteditEventImage(false);

                                        seteventImage(picture);
                                        setEventName(name);
                                        setEventDate(eventDate);
                                        setticketLink(ticketLink);
                                        setEventClubPopUp(true);
                                      }}
                                    >
                                      <Iconify icon={"material-symbols:edit"} />
                                    </IconButton>
                                  </Stack>
                                </TableCell>
                                <TableCell align="left">
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                      setselectedEventData(item);
                                      setdeleteDialogOpen(true);
                                    }}
                                  >
                                    <Iconify icon={"ic:baseline-delete"} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isNotFound && (
                    <TableBody
                      style={{
                        backgroundColor: "#E4D0B5",
                      }}
                    >
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                            style={{
                              backgroundColor: "#E4D0B5",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              style={{
                backgroundColor: "black",
                color: "white",
              }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={clubs_data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Container>
        </Container>

        <Popover
          open={addEventPopUp}
          anchorEl={open}
          onClose={() => {
            setEventClubPopUp(!true);
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: "90%",
              hieght: "100%",
              borderColor: "#E4D0B5",
              // backgroundColor: '#E4D0B5',
              borderWidth: 1,

              "& .MuiMenuItem-root": {
                typography: "body2",
                // borderRadius: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                borderColor: "#E4D0B5",
                borderWidth: 12,
              },
            },
          }}
        >
          <Scrollbar>
            <Box
              component="form"
              sx={{
                width: "100%",
                borderWidth: 2,
                backgroundColor: "black",
                borderRadius: 4,
              }}
              autoComplete="on"
            >
              <Stack alignItems={"flex-end"} justifyItems={"right"}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    seteventLoader(false);
                    setEventClubPopUp(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon={"maki:cross"} />
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  color: palette.primary.gold,
                  textAlign: "center",
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {editEvent != false ? "Update" : "Add"} Event
              </Typography>
              <Container sx={{ width: "100%" }}>
                {eventLoader != true ? (
                  <>
                    <Stack flexDirection={"row"}>
                      <Box sx={{ width: "30%" }}>
                        <Typography sx={{ color: palette.primary.gold }}>
                          Name
                        </Typography>
                      </Box>
                      <Box sx={{ width: "70%", paddingBottom: 2 }}>
                        <TextField
                          fullWidth
                          autoComplete="off"
                          label="Event Name"
                          variant="outlined"
                          value={EventName}
                          onChange={(text) => {
                            setEventName(text.target.value);
                          }}
                          inputProps={{
                            style: { color: palette.primary.gold },
                          }}
                          InputLabelProps={{
                            style: { color: palette.primary.gold },
                          }}
                        />
                      </Box>
                    </Stack>
                    <Stack flexDirection={"row"}>
                      <Box sx={{ width: "30%" }}>
                        <Typography
                          fullWidth
                          sx={{ color: palette.primary.gold }}
                        >
                          Ticket Url
                        </Typography>
                      </Box>
                      <Box sx={{ width: "70%", paddingBottom: 2 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                          <TextField
                            label={"Ticket Link "}
                            autoComplete="no-autocomplete-random-string"
                            fullWidth
                            variant="outlined"
                            value={ticketLink}
                            onChange={(text) => {
                              setticketLink(text.target.value);
                            }}
                            inputProps={{
                              style: { color: palette.primary.gold },
                            }}
                            InputLabelProps={{
                              style: { color: palette.primary.gold },
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                    <Stack flexDirection={"row"}>
                      <Box sx={{ width: "30%" }}>
                        <Typography
                          fullWidth
                          sx={{ color: palette.primary.gold }}
                        >
                          Event Date
                        </Typography>
                      </Box>
                      <Box sx={{ width: "70%", paddingBottom: 2 }}>
                        <Box sx={{ paddingBottom: 2 }}>
                          <ResponsiveDateTimePickers
                            value={EventDate}
                            onChange={(date) => {
                              console.log("Selected - date ====>", date);
                              setEventDate(date);
                            }}
                          />
                        </Box>
                      </Box>
                    </Stack>
                    <Stack justifyItem={"center"}>
                      <Box sx={{ paddingBottom: 2 }}>
                        {editEventImage != true ? (
                          <>
                            <Box
                              style={{
                                width: "100%",
                              }}
                            >
                              <Stack
                                alignItems={"flex-end"}
                                justifyItems={"right"}
                              >
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => {
                                    seteditEventImage(true);
                                  }}
                                >
                                  <Iconify
                                    color={palette.primary.gold}
                                    icon={"maki:cross"}
                                  />
                                </IconButton>
                              </Stack>
                              <Box>
                                <img
                                  src={
                                    "data:image/png;base64,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"
                                  }
                                  alt="Image"
                                  style={{ width: "300px", height: "200px" }} // Set the desired width and height
                                />
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            <UploadSingleImage
                              heading={""}
                              filesLimit={1}
                              eventImageLoader={eventImageLoader}
                              btnDisabled={true}
                              handleSubmit={async (Data) => {
                                if (Data) {
                                  seteventImage(Data);
                                }
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </Stack>
                    <Box
                      sx={{
                        width: "100%",
                        padding: 2,
                      }}
                    >
                      <Button
                        onClick={() => {
                          addEvent();
                          //setEventClubPopUp(true);
                        }}
                        style={{
                          backgroundColor: palette.primary.gold,
                          textAlign: "center",
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "black",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {editEvent != false ? "Update" : "Add"} Event
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      style={{
                        height: 500,
                        width: "100%",
                      }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CircularProgress
                        style={{
                          justifyItems: "center",
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "center",
                        }}
                        color="success"
                      />
                      <Typography
                        sx={{
                          color: palette.primary.gold,
                          textAlign: "center",
                          paddingTop: 4,
                          paddingBottom: 4,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        Please wait we adding your event !
                      </Typography>
                    </Box>
                  </>
                )}
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        <Popover
          open={addTableConfigPopup}
          anchorEl={open}
          onClose={() => {
            setaddTableConfigPopup(!true);
          }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              p: 1,
              width: "90%",
              hieght: "100%",
              borderColor: "#E4D0B5",
              // backgroundColor: '#E4D0B5',
              borderWidth: 1,

              "& .MuiMenuItem-root": {
                typography: "body2",
                // borderRadius: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                borderColor: "#E4D0B5",
                borderWidth: 12,
              },
            },
          }}
        >
          <Scrollbar>
            <Box
              component="form"
              sx={{
                width: "100%",
                borderWidth: 2,
                backgroundColor: "black",
                borderRadius: 4,
              }}
              autoComplete="on"
            >
              <Stack alignItems={"flex-end"} justifyItems={"right"}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    setaddTableConfigPopup(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon={"maki:cross"} />
                </IconButton>
              </Stack>
              <Typography
                sx={{
                  color: palette.primary.gold,
                  textAlign: "center",
                  paddingTop: 4,
                  paddingBottom: 4,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Add Table Configuration
              </Typography>
              <Container sx={{ width: "100%" }}>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      Table Type
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="configuration"
                      variant="outlined"
                      value={typeTC}
                      onChange={(text) => {
                        settypeTC(text.target.value);
                      }}
                      inputProps={{ style: { color: palette.primary.gold } }}
                      InputLabelProps={{
                        style: { color: palette.primary.gold },
                      }}
                    />
                  </Box>
                </Stack>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Minimum Price
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label={"price "}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={minPriceTC}
                        onChange={(text) => {
                          setminPriceTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Seating Capacity
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label={"capacity"}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={recomCapacityTC}
                        onChange={(text) => {
                          setrecomCapacityTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography fullWidth sx={{ color: palette.primary.gold }}>
                      Table Map ID
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label={"Map id "}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={tmapleIDTC}
                        onChange={(text) => {
                          settmapleIDTC(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    width: "100%",
                    padding: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      addTableConfiguration();
                      //setEventClubPopUp(true);
                    }}
                    // variant="contained"
                    style={{
                      backgroundColor: palette.primary.gold,
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "black",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    Add Event
                  </Button>
                </Box>
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        <DeleteEventDialog />
      </Container>
    </>
  );
}
