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

// components
import Scrollbar from "../../component/scrollbar";
import ResponsiveDateTimePickers from "src/component/ResponsiveDateTimePIcker";

//dropdown
import AddPosterImage from "../UploadImage/AddImage";

// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
//theme
import palette from "../../theme/palette";
// ----------------------------------------------------------------------
import { deleteEvent, getEventofClub } from "src/services/Event";
import { getCurrentDate, convertToTimeStamp } from "../../utils/Day";

import { EVENTS_TABLE_HEAD } from "../../Table_Head/index";
import ViewEventInfo from "./ViewEventInfo";
import { LocalStorageKey } from "src/utils/localStorage/keys";
//services
import { getProfileData } from "src/services/representative";
import dayjs from "dayjs";

//MAIN FUNCTION

export default function EventDashboard() {
  const currentDateinISO5601 = dayjs().format("YYYY-MM-DDTHH:MM");

  const [selectedDate, setSelectedDate] = useState(dayjs("2022-04-17T15:30"));
  const handleDateChange = (newDate) => {
    console.log("newDate--->", newDate);
    // setSelectedDate(newDate);
  };

  const theme = useTheme();
  //NAVIGATION
  const navigate = useNavigate();
  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  //CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState("0");
  //IMAGE POP-UP LOADER
  const [imageLoader, setimageLoader] = useState(false);
  //States

  //CREATE EVENT STATES==>
  const [EventName, setEventName] = useState("");
  const [ticketLink, setticketLink] = useState("");
  const [EventDate, setEventDate] = useState("");
  //SHOW CLUB
  const [EventData, setEventData] = useState([]);
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    loadData();
  }, []);

  // get the clubs
  const loadData = async () => {
    const representativeId = localStorage.getItem(LocalStorageKey.USER_ID);

    if (representativeId === null) {
      navigate("/");
    } else {
      getClubData(JSON.parse(representativeId));
    }
    console.log("representativeId===>", JSON.parse(representativeId));
  };

  const getClubData = async (representativeId) => {
    const data = await getProfileData(representativeId);

    let tempArr = [];
    data.clubPrivileges.map((item) => {
      tempArr.push({
        name: item.club.name,
        _id: item._id,
      });
    });

    setselectedClubData(tempArr[0]._id);
    let obj = {
      clubId: tempArr[0]._id,
    };
    console.log(`tempArr[0]._id`, tempArr[0]._id);
    setclubs_data(tempArr);
    getClubsEvent(obj);
  };

  const getClubsEvent = async (obj) => {
    const data = await getEventofClub(obj);
    console.log("data-====>", data);
    setEventData(data);
  };

  //API CALL : ADD CLUB
  const addEvent = async () => {
    let obj = {
      name: EventName,
      picture: "jdkaHSFKASFIKANVAJ",
      eventDate: "",
      eventTime: "",
      ticketLink: ticketLink,
      clubId: "",
    };
  };

  //dialog

  const [ImageDialogPopUp, setImageDialogPopUp] = useState(false);
  const [ViewClubInfoPopUp, setViewClubInfoPopUp] = useState(false);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  //add club pop-over open
  const [addEventPopUp, setEventClubPopUp] = useState(false);

  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

  //close pop-up
  const handleClose = async (id) => {
    if (id == "1") {
      const a = EventData.filter((item) => {
        return item._id !== selectedClubData._id;
      });

      const clubtoDelete = await deleteEvent(
        selectedClubData,
        selectedClubData._id
      );

      setclubs_data(a);
      // console.log("clubtoDelete", clubtoDelete);
    } else id == "2";
    setdeleteDialogOpen(false);
  };

  const AddImageDialog = () => {
    return (
      <>
        <Popover
          open={ImageDialogPopUp}
          anchorEl={open}
          onClose={() => {
            setImageDialogPopUp(!true);
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
                    setImageDialogPopUp(!true);
                  }}
                >
                  <Iconify color={palette.primary.gold} icon={"maki:cross"} />
                </IconButton>
              </Stack>
              {/* <AddPosterImage
                imageLoader={imageLoader}
                data={selectedClubData}
                onSubmit={async (Data) => {
                  if (Data) {
                    // const clubImg = await AddClubImage(Data);
                    // setimageLoader(true);
                    // if (clubImg.status === true) {
                    //   let newArr = [];
                    //   //UPDATE PATCH THE IMAGES
                    //   newArr = [...clubImg?.data];
                    //   let obj = {
                    //     photos: newArr,
                    //   };
                    //   const updateClubtoActive = await clubUpdate(
                    //     obj,
                    //     selectedClubData._id
                    //   );
                    //   if (updateClubtoActive.data.status === true) {
                    //     getClubs();
                    //     //CLOSE THE LOADER
                    //     setimageLoader(false);
                    //     setImageDialogPopUp(!true);
                    //     alert("Image uploaded Successfully !");
                    //   }
                    // }
                  }
                }}
              /> */}
            </Box>
          </Scrollbar>
        </Popover>
      </>
    );
  };

  const DeleteClubDialog = () => {
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
              Are you sure want to delete the club, as you won't be able to
              recover it !
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
              <ViewEventInfo data={selectedClubData} />
            </Box>
          </Scrollbar>
        </Popover>
      </>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleToggleSwitch = async (item, toggleBtn) => {
    // setswitchToggle(!switchToggle);
    // console.log("item===>", item);
    let obj = {
      isPublished: !toggleBtn,
    };

    const updateClubtoActive = await clubUpdate(obj, item._id);
    console.log("updateClubtoActive==>", updateClubtoActive);
    let index = clubs_data.findIndex((e) => e._id == item._id);
    clubs_data[index].isPublished = !toggleBtn;

    if (updateClubtoActive.data.status === true) {
      setswitchToggle(!switchToggle);
      getClubData();
    } else {
      alert("TECHNICAL ERROR ! CONTACT ADMIN ");
    }
    setswitchToggle(!switchToggle);
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EventData.length) : 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    // stabilizedThis.sort((a, b) => {
    //   // const order = comparator(a[0], b[0]);
    //   if (order !== 0) return order;
    //   return a[1] - b[1];
    // });
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

  const isNotFound = !filteredData.length && !!filterName;

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
                  console.log("Selected - date ====>", date);
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
                        console.log("item===club-Data---====>", item);
                        setselectedClubData(item);
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
                    {filteredData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        //   console.log("item===>", item);
                        const { _id, name, website, eventTime, ticketLink } =
                          item;
                        const timestamp = 1680265980000; // timestamp in milliseconds
                        const formattedDate =
                          dayjs(timestamp).format("YYYY-MM-DD");
                        const formattedTime =
                          dayjs(timestamp).format("HH:mm:ss");
                        console.log(`Formatted Date: ${formattedDate}`);
                        console.log(`Formatted Time: ${formattedTime}`);
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
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                      setselectedClubData(item);
                                      setViewClubInfoPopUp(true);
                                    }}
                                  >
                                    <Iconify icon={"ic:sharp-remove-red-eye"} />
                                  </IconButton>
                                </Stack>
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
                                  {index + 1}) {name}
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
                                  {dayjs(Number(eventTime)).format(
                                    "DD-MM-YYYY HH:MM"
                                  )}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography sx={{ color: "black" }}>
                                  {ticketLink}
                                </Typography>
                              </TableCell>

                              <TableCell align="right">
                                <Stack flexDirection={"row"}>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                      setEventClubPopUp(true);

                                      //LEFT WITH LINE ITEMS & ADDRESS TO UPDATE
                                      // alert("EDIT alert");
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
                                    setselectedClubData(item);
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
                      Event Date
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <ResponsiveDateTimePickers
                        value={currentDateinISO5601}
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
                    <AddPosterImage
                      heading={""}
                      filesLimit={1}
                      imageLoader={imageLoader}
                      data={selectedClubData}
                      onSubmit={async (Data) => {
                        if (Data) {
                          console.log(Data, "Data====>");
                          // const clubImg = await AddClubImage(Data);
                          // setimageLoader(true);
                          // if (clubImg.status === true) {
                          //   let newArr = [];
                          //   //UPDATE PATCH THE IMAGES
                          //   newArr = [...clubImg?.data];
                          //   let obj = {
                          //     photos: newArr,
                          //   };
                          //   const updateClubtoActive = await clubUpdate(
                          //     obj,
                          //     selectedClubData._id
                          //   );
                          //   if (updateClubtoActive.data.status === true) {
                          //     getClubs();
                          //     //CLOSE THE LOADER
                          //     setimageLoader(false);
                          //     setImageDialogPopUp(!true);
                          //     alert("Image uploaded Successfully !");
                          //   }
                          // }
                        }
                      }}
                    />{" "}
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
      </Container>
    </>
  );
}

// <Popover
//           open={addEventPopUp}
//           anchorEl={open}
//           onClose={() => {
//             setEventClubPopUp(!true);
//           }}
//           anchorOrigin={{
//             vertical: "center",
//             horizontal: "center",
//           }}
//           transformOrigin={{
//             vertical: "center",
//             horizontal: "center",
//           }}
//           PaperProps={{
//             sx: {
//               p: 1,
//               width: "90%",
//               hieght: "100%",
//               borderColor: "#E4D0B5",
//               // backgroundColor: '#E4D0B5',
//               borderWidth: 1,

//               "& .MuiMenuItem-root": {
//                 typography: "body2",
//                 // borderRadius: 1,
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "80%",
//                 borderColor: "#E4D0B5",
//                 borderWidth: 12,
//               },
//             },
//           }}
//         >
//           <Scrollbar>
//             <Box
//               component="form"
//               sx={{
//                 width: "100%",
//                 borderWidth: 2,
//                 backgroundColor: "black",
//                 borderRadius: 4,
//               }}
//               autoComplete="on"
//             >
//               <Stack alignItems={"flex-end"} justifyItems={"right"}>
//                 <IconButton
//                   size="large"
//                   color="inherit"
//                   onClick={() => {
//                     setEventClubPopUp(!true);
//                   }}
//                 >
//                   <Iconify color={palette.primary.gold} icon={"maki:cross"} />
//                 </IconButton>
//               </Stack>
//               <Typography
//                 sx={{
//                   color: palette.primary.gold,
//                   textAlign: "center",
//                   paddingTop: 4,
//                   paddingBottom: 4,
//                   fontSize: 20,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Add New Club
//               </Typography>
//               <Container sx={{ width: "100%" }}>
//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography sx={{ color: palette.primary.gold }}>
//                       Club Name
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%", paddingBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       autoComplete="off"
//                       label="Club Name"
//                       variant="outlined"
//                       value={EventName}
//                       onChange={(text) => {
//                         setEventName(text.target.value);
//                       }}
//                       inputProps={{ style: { color: palette.primary.gold } }}
//                       InputLabelProps={{
//                         style: { color: palette.primary.gold },
//                       }}
//                     />
//                   </Box>
//                 </Stack>
//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography fullWidth sx={{ color: palette.primary.gold }}>
//                       Phone Number
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%", paddingBottom: 2 }}>
//                     <Box sx={{ paddingBottom: 2 }}>
//                       <TextField
//                         label={"Phone Number"}
//                         autoComplete="no-autocomplete-random-string"
//                         fullWidth
//                         variant="outlined"
//                         value={ticketLink}
//                         onChange={(text) => {
//                           setticketLink(text.target.value);
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 </Stack>
//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography fullWidth sx={{ color: palette.primary.gold }}>
//                       Address
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%", paddingBottom: 2 }}>
//                     <Box sx={{ paddingBottom: 2 }}>
//                       <TextField
//                         fullWidth
//                         autoComplete="no-autocomplete-random-string"
//                         sx={{ width: "100%", paddingBottom: 2 }}
//                         label="Address Line"
//                         variant="outlined"
//                         value={addressLine}
//                         onChange={(text) => {
//                           setaddressLine(text.target.value);
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                       />
//                     </Box>

//                     <Stack flexDirection={"row"}>
//                       <Dropdown
//                         textinputLabel={"Select Country"}
//                         data={countryData}
//                         value={country}
//                         changedValue={(item) => {
//                           // console.log("item======>", item);
//                           setcountryCode(item.value);
//                           setcountry(item.label);
//                         }}
//                       />
//                     </Stack>
//                     <Stack flexDirection={"row"} style={{ paddingTop: 10 }}>
//                       {countryCode != "" ? (
//                         <>
//                           <Dropdown
//                             textinputLabel={"Select State"}
//                             data={stateData}
//                             changedValue={(item) => {
//                               setstateCode(item.value);
//                               setstate(item.label);
//                             }}
//                           />
//                         </>
//                       ) : (
//                         <></>
//                       )}
//                     </Stack>
//                     <Stack flexDirection={"row"} style={{ paddingTop: 10 }}>
//                       {stateCode != "" ? (
//                         <>
//                           <Dropdown
//                             textinputLabel={"Select City"}
//                             data={citiesData}
//                             changedValue={(item) => {
//                               setcitiesCodeData(item.value);
//                               setcity(item.label);
//                             }}
//                           />
//                         </>
//                       ) : (
//                         <></>
//                       )}
//                     </Stack>
//                   </Box>
//                 </Stack>
//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography sx={{ color: palette.primary.gold }}>
//                       Website
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%" }}>
//                     <Box sx={{ paddingBottom: 2 }}>
//                       <TextField
//                         fullWidth
//                         autoComplete="off"
//                         label="Website Url"
//                         variant="outlined"
//                         value={WebsiteUrl}
//                         onChange={(text) => {
//                           setWebsiteUrl(text.target.value);
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 </Stack>
//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography sx={{ color: palette.primary.gold }}>
//                       Insta Handle
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%" }}>
//                     <Box sx={{ paddingBottom: 2 }}>
//                       <TextField
//                         fullWidth
//                         label="Instagram"
//                         variant="outlined"
//                         value={instaHandle}
//                         onChange={(text) => {
//                           setinstaHandle(text.target.value);
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                       />
//                     </Box>
//                   </Box>
//                 </Stack>

//                 <Stack flexDirection={"row"}>
//                   <Box sx={{ width: "30%" }}>
//                     <Typography sx={{ color: palette.primary.gold }}>
//                       Stripe Ac Number
//                     </Typography>
//                   </Box>
//                   <Box sx={{ width: "70%" }}>
//                     <TextField
//                       fullWidth
//                       label="Stripe Account No."
//                       variant="outlined"
//                       value={stripeAccountNo}
//                       onChange={(text) => {
//                         setstripeAccountNo(text.target.value);
//                       }}
//                       inputProps={{ style: { color: palette.primary.gold } }}
//                       InputLabelProps={{
//                         style: { color: palette.primary.gold },
//                       }}
//                     />
//                   </Box>
//                 </Stack>
//                 <Stack>
//                   <Stack sx={{ paddingTop: 2 }} flexDirection={"row"}>
//                     <Box sx={{ width: "70%" }}>
//                       <Stack flexDirection={"row"}>
//                         <Typography
//                           sx={{
//                             color: palette.primary.gold,
//                             fontWeight: "bold",
//                             fontSize: 14,
//                             paddingRight: 2,
//                           }}
//                         >
//                           Line Items{" "}
//                         </Typography>
//                         <Tooltip
//                           title={
//                             "Table fee, Service Charges,tips, tax etc (All Items value will be consider as a percentage)"
//                           }
//                         >
//                           <InfoIcon sx={{ color: "red" }} />
//                         </Tooltip>
//                       </Stack>
//                     </Box>

//                     <Box sx={{ width: "30%" }}>
//                       <Button
//                         style={{
//                           backgroundColor: "#E4D0B5",
//                           color: "black",
//                           fontSize: 14,
//                           fontWeight: "600",
//                         }}
//                         variant="contained"
//                         onClick={() => {
//                           handleAddKeyValue();
//                         }}
//                       >
//                         Add
//                       </Button>
//                     </Box>
//                   </Stack>
//                   <Typography>{showLineItemError}</Typography>
//                   <Stack flexDirection={"row"} sx={{ paddingTop: 1 }}>
//                     <Box sx={{ width: "50%" }}>
//                       <TextField
//                         variant="outlined"
//                         label="Line Item "
//                         value={key}
//                         onChange={(event) => setKey(event.target.value)}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                       />
//                     </Box>
//                     <Box sx={{ width: "50%", paddingLeft: 1 }}>
//                       <TextField
//                         variant="outlined"
//                         label="Value"
//                         value={value}
//                         onChange={(event) => setValue(event.target.value)}
//                         InputLabelProps={{
//                           style: { color: palette.primary.gold },
//                         }}
//                         inputProps={{ style: { color: palette.primary.gold } }}
//                       />
//                     </Box>
//                   </Stack>

//                   {Object.entries(keyValuePairs).map(([key, value], index) => (
//                     <>
//                       <Stack flexDirection={"row"}>
//                         <Box sx={{ width: "40%" }}>
//                           <Typography
//                             sx={{
//                               color: palette.primary.gold,
//                               fontSize: 14,
//                               fontWeight: "600",
//                               padding: 2,
//                             }}
//                             key={key}
//                           >
//                             {index + 1}) {key}:
//                           </Typography>
//                         </Box>
//                         <Box sx={{ width: "50%" }}>
//                           <Stack flexDirection={"row"}>
//                             <Typography
//                               sx={{
//                                 color: palette.primary.gold,
//                                 fontSize: 14,
//                                 fontWeight: "600",
//                                 padding: 2,
//                               }}
//                               key={key}
//                             >
//                               Value: {value} %
//                             </Typography>
//                             <Button
//                               style={{
//                                 color: "red",
//                                 fontSize: 14,
//                                 fontWeight: "600",
//                               }}
//                               variant="contained"
//                               onClick={() => handleDeleteKeyValue(key)}
//                             >
//                               Delete
//                             </Button>
//                           </Stack>
//                         </Box>
//                       </Stack>
//                     </>
//                   ))}
//                 </Stack>
//                 <Box
//                   sx={{
//                     width: "100%",
//                     padding: 2,
//                   }}
//                 >
//                   <Button
//                     onClick={() => {
//                       addClub();
//                       //setEventClubPopUp(true);
//                     }}
//                     // variant="contained"
//                     style={{
//                       backgroundColor: palette.primary.gold,
//                       textAlign: "center",
//                       fontSize: 16,
//                       fontWeight: "bold",
//                       color: "black",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       width: "100%",
//                     }}
//                   >
//                     Add CLub
//                   </Button>
//                 </Box>
//               </Container>
//             </Box>
//           </Scrollbar>
//         </Popover>
//         <DeleteClubDialog />
//         <AddImageDialog />
//         <ViewClubInforamtionDialog />
