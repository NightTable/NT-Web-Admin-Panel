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
        Alert("EVENT DELETED SUCCESSFULLY !");
      } else {
        Alert("ERROR IN DELETING THE EVENT ");
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
                            website,
                            eventTime,
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
                                  <Stack flexDirection={"row"}>
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
                                  </Stack>
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
                Add Event
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
                        Add Event
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
