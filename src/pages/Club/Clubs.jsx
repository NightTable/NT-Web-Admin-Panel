import * as React from "react";

import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { filter } from "lodash";
import { TextField, Switch } from "@material-ui/core";
import "../../css/DasboardCss.css";
// @mui
import { useTheme } from "@mui/material/styles";
// @mui
import {
  Box,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,

} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

// components
import Iconify from "../../component/iconify";
import Scrollbar from "../../component/scrollbar";
import Dropdown from "../../component/Dropdown";
import { DeleteDialog } from "../../features/DeleteDialog";
//dialog

//dropdown
import AddPosterImage from "../UploadImage/AddImage";

// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
//theme
import palette from "../../theme/palette";
// ----------------------------------------------------------------------
//servie files
import {
  getClubs,
  addClubtoServer,
  clubUpdate,
  deleteClub,
} from "../../services/club";
import { AddImage } from "../../services/upload";
import {
  getCountries,
  getStatesOfCountry,
  citiesOfStates,
} from "../../services/countries";
import { DASHBOARD_TABLE_HEAD } from "../../Table_Head/index";
import ViewClubInfo from "./ViewClubInfo";

//LOCAL STORAGE
import { LocalStorageKey } from "src/utils/localStorage/keys";

//MAIN FUNCTION
export default function ClubDashboard() {
  const theme = useTheme();

  //IMAGE POP-UP LOADER
  const [imageLoader, setimageLoader] = useState(false);
  //States

  const [clubName, setclubName] = useState("");
  const [addressLine, setaddressLine] = useState("");
  //country data
  const [country, setcountry] = useState("");
  const [countryData, setcountryData] = useState([]);
  const [countryCode, setcountryCode] = useState("");
  //cities data
  const [citiesData, setcitiesData] = useState("");
  const [citiesCodeData, setcitiesCodeData] = useState("");
  const [city, setcity] = useState("");
  //states data
  const [stateData, setstateData] = useState([]);
  const [stateCode, setstateCode] = useState("");
  const [state, setstate] = useState("");

  const resetStates = async () => {
    setcountryCode("");
    setcity("");
    setstate("");
    setcountryCode("");
    setcitiesData("");
    setstateData("");
    setinstaHandle("");
    setstripeAccountNo("");
    setphoneNumber("");
    setWebsiteUrl("");
    setKeyValuePairs({});
  };
  //instagram
  const [instaHandle, setinstaHandle] = useState("");
  const [stripeAccountNo, setstripeAccountNo] = useState("");
  const [WebsiteUrl, setWebsiteUrl] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");

  //add entities
  const [keyValuePairs, setKeyValuePairs] = useState({});
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [showLineItemError, setshowError] = useState(false);

  const handleAddKeyValue = () => {
    if (key === "" && value === "") {
      setshowError("Please enter both Line items and value");
    }
    setKeyValuePairs({ ...keyValuePairs, [key]: value });
    setKey("");
    setValue("");
  };

  const handleDeleteKeyValue = (deleteKey) => {
    const newKeyValuePairs = { ...keyValuePairs };
    delete newKeyValuePairs[deleteKey];
    setKeyValuePairs(newKeyValuePairs);
  };

  const [switchToggle, setswitchToggle] = React.useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (countryCode != "") {
        let obj = {
          countryCode: countryCode,
        };

        const statesData = await getStatesOfCountry(obj);
        let arr = [];
        statesData.forEach((element) => {
          arr.push({
            label: element.name,
            value: element.isoCode,
            phoneNumberCode: element.phoneNumberCode,
          });
        });
        setstateData(arr);
      }
    }

    fetchData();
  }, [countryCode]);

  useEffect(() => {
    async function fetchData() {
      if (stateCode != "") {
        let obj = {
          stateCode: stateCode,
          countryCode: countryCode,
        };
        console.log("obj===>", obj);

        const citiesData = await citiesOfStates(obj);
        let arr = [];
        citiesData.forEach((element) => {
          arr.push({
            label: element.name,
            value: element.isoCode,
            phoneNumberCode: element.phoneNumberCode,
          });
        });
        setcitiesData(arr);
        console.log("citiesData===>", citiesData);
      }
    }

    fetchData();
  }, [stateCode]);
  //getcountries

  // get the clubs
  const loadData = async () => {
    const representativeId = localStorage.getItem(LocalStorageKey.USER_ID);

    if (representativeId === null) {
      navigate("/");
    } else {
      getClubData(JSON.parse(representativeId));
    }
  };

  const getClubData = async (representativeId) => {
    const data = await getClubs();
    setclubs_data(data);
    const countriesData = await getCountries();
    let arr = [];
    countriesData.forEach((element) => {
      arr.push({
        label: element.name,
        value: element.isoCode,
        phoneNumberCode: element.phoneNumberCode,
      });
    });

    //   console.log("arr====>", arr);
    setcountryData(arr);
  };

  //API CALL : ADD CLUB
  const addClub = async () => {
    console.log("keyValuePairs===>", keyValuePairs);
    // let keys = Object.keys(keyValuePairs);
    // let arr = [];
    // for (let i = 0; i < keys.length; i++) {
    //   arr.push({
    //     name: keys[i],
    //     percentage: keyValuePairs[keys[i]],
    //   });
    // }
    // var obj = {
    //   name: clubName,
    //   location: [longitude, latitude],
    //   instaHandle: instaHandle,
    //   phoneNumber: phoneNumber,
    //   Address: {
    //     Address: addressLine,
    //     City: city,
    //     State: state,
    //     Country: country,
    //   },
    //   website: WebsiteUrl,
    //   photos: [],
    //   stripeAccountNumber: stripeAccountNo,
    //   ownedBy: "god",
    //   lineItems: arr,
    // };

    // const data = await addClubtoServer(obj);
    // if (data?.status === true) {
    //   alert("Club Added");

    //   //update the club array
    //   const updateClubArr = [...clubs_data, data.data];
    //   setclubs_data(updateClubArr);
    //   //resetting the states to inital
    //   resetStates();
    //   setaddClubPopUp(false);
    // } else {
    //   alert("ERROR IN ADDING CLUB ");
    // }
  };

  //dialog

  const [ImageDialogPopUp, setImageDialogPopUp] = useState(false);
  const [ViewClubInfoPopUp, setViewClubInfoPopUp] = useState(false);
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  //add club pop-over open
  const [addClubPopUp, setaddClubPopUp] = useState(false);

  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

  //close pop-up
  const handleClose = async (id) => {
    if (id == "1") {
      const a = clubs_data.filter((item) => {
        return item._id !== selectedClubData._id;
      });

      const clubtoDelete = await deleteClub(
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
              <AddPosterImage
                heading={"Add Club Image"}
                filesLimit={10}
                imageLoader={imageLoader}
                data={selectedClubData}
                onSubmit={async (Data) => {
                  if (Data) {
                    const clubImg = await AddImage(Data);
                    setimageLoader(true);
                    if (clubImg.status === true) {
                      let newArr = [];
                      //UPDATE PATCH THE IMAGES
                      newArr = [...clubImg?.data];
                      let obj = {
                        photos: newArr,
                      };
                      const updateClubtoActive = await clubUpdate(
                        obj,
                        selectedClubData._id
                      );
                      if (updateClubtoActive.data.status === true) {
                        getClubs();
                        //CLOSE THE LOADER
                        setimageLoader(false);
                        setImageDialogPopUp(!true);
                        alert("Image uploaded Successfully !");
                      }
                    }
                  }
                }}
              />
            </Box>
          </Scrollbar>
        </Popover>
      </>
    );
  };

  const DeleteClubDialog = () => {
    return (
      <>
        
        <DeleteDialog
          heading={"Delete the club?"}
          paragraph={
            " Are you sure want to delete the club, as you won't be able to recover it !"
          }
          deleteBtnPressed={(value) => {
            handleClose(`1`);
          }}
          closeBtnPressed={(value) => {
            setdeleteDialogOpen(!value);
          }}
          deleteDialogOpen={deleteDialogOpen}
        />
        
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
              <ViewClubInfo data={selectedClubData} />
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clubs_data.length) : 0;

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);

    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  const filteredData = applySortFilter(
    clubs_data,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredData.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Night Table : Admin Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ margin: 3, color: "#E4D0B5" }}>
          Hi, Welcome back {process.env.REACT_APP_BASE_URL}
        </Typography>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" sx={{ color: "#E4D0B5" }}>
              Clubs
            </Typography>
            <Button
              onClick={() => {
                setaddClubPopUp(true);
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
              Add Club
            </Button>
          </Stack>

          <Container
            style={{
              borderWidth: 1,
              backgroundColor: "#E4D0B5",
              padding: 1,
              borderRadius: 4,
            }}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    headLabel={DASHBOARD_TABLE_HEAD}
                    rowCount={clubs_data.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {filteredData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        //   console.log("item===>", item);
                        const { _id, name, website, isPublished, phoneNumber } =
                          item;
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
                              <TableCell align="left">
                                <Typography sx={{ color: "black" }}>
                                  {phoneNumber}
                                </Typography>
                              </TableCell>

                              <TableCell align="left">
                                <Typography sx={{ color: "black" }}>
                                  {website}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <IconButton
                                  size="large"
                                  color="inherit"
                                  onClick={() => {
                                    setselectedClubData(item);
                                    setImageDialogPopUp(true);
                                  }}
                                >
                                  <Iconify icon={"material-symbols:image"} />
                                </IconButton>
                              </TableCell>
                              <TableCell align="right">
                                <Stack flexDirection={"row"}>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                      setaddClubPopUp(true);
                                      let new_obj = item.lineItems.reduce(
                                        (obj, item) => {
                                          obj[item.name] = item.percentage;
                                          return obj;
                                        },
                                        {}
                                      );
                                      setKeyValuePairs(new_obj);
                                      setclubName(item.name);
                                      setphoneNumber(item.phoneNumber);
                                      setWebsiteUrl(item.website);
                                      setaddressLine(item.Address.Address);
                                      setstripeAccountNo(
                                        item.stripeAccountNumber
                                      );
                                      setinstaHandle(item.instaHandle);

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
                              <TableCell align="left">
                                <Switch
                                  style={{
                                    color: "black",
                                  }}
                                  checked={isPublished === true ? true : false}
                                  onChange={() => {
                                    if (item?.photos >= 3) {
                                      handleToggleSwitch(
                                        item,
                                        isPublished === true ? true : false
                                      );
                                    } else {
                                      alert(
                                        "Please Add at least 3 Images to make club Active!"
                                      );
                                    }
                                  }}
                                />
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
          open={addClubPopUp}
          anchorEl={open}
          onClose={() => {
            setaddClubPopUp(!true);
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
                    setaddClubPopUp(!true);
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
                Add New Club
              </Typography>
              <Container sx={{ width: "100%" }}>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      Club Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Club Name"
                      variant="outlined"
                      value={clubName}
                      onChange={(text) => {
                        setclubName(text.target.value);
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
                      Phone Number
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label={"Phone Number"}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={phoneNumber}
                        onChange={(text) => {
                          setphoneNumber(text.target.value);
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
                      Address
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        fullWidth
                        autoComplete="no-autocomplete-random-string"
                        sx={{ width: "100%", paddingBottom: 2 }}
                        label="Address Line"
                        variant="outlined"
                        value={addressLine}
                        onChange={(text) => {
                          setaddressLine(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                      />
                    </Box>

                    <Stack flexDirection={"row"}>
                      <Dropdown
                        textinputLabel={"Select Country"}
                        data={countryData}
                        value={country}
                        changedValue={(item) => {
                          // console.log("item======>", item);
                          setcountryCode(item.value);
                          setcountry(item.label);
                        }}
                      />
                    </Stack>
                    <Stack flexDirection={"row"} style={{ paddingTop: 10 }}>
                      {countryCode != "" ? (
                        <>
                          <Dropdown
                            textinputLabel={"Select State"}
                            data={stateData}
                            changedValue={(item) => {
                              setstateCode(item.value);
                              setstate(item.label);
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </Stack>
                    <Stack flexDirection={"row"} style={{ paddingTop: 10 }}>
                      {stateCode != "" ? (
                        <>
                          <Dropdown
                            textinputLabel={"Select City"}
                            data={citiesData}
                            changedValue={(item) => {
                              setcitiesCodeData(item.value);
                              setcity(item.label);
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </Stack>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      Website
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        fullWidth
                        autoComplete="off"
                        label="Website Url"
                        variant="outlined"
                        value={WebsiteUrl}
                        onChange={(text) => {
                          setWebsiteUrl(text.target.value);
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
                    <Typography sx={{ color: palette.primary.gold }}>
                      Insta Handle
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        fullWidth
                        label="Instagram"
                        variant="outlined"
                        value={instaHandle}
                        onChange={(text) => {
                          setinstaHandle(text.target.value);
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
                    <Typography sx={{ color: palette.primary.gold }}>
                      Stripe Ac Number
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%" }}>
                    <TextField
                      fullWidth
                      label="Stripe Account No."
                      variant="outlined"
                      value={stripeAccountNo}
                      onChange={(text) => {
                        setstripeAccountNo(text.target.value);
                      }}
                      inputProps={{ style: { color: palette.primary.gold } }}
                      InputLabelProps={{
                        style: { color: palette.primary.gold },
                      }}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Stack sx={{ paddingTop: 2 }} flexDirection={"row"}>
                    <Box sx={{ width: "70%" }}>
                      <Stack flexDirection={"row"}>
                        <Typography
                          sx={{
                            color: palette.primary.gold,
                            fontWeight: "bold",
                            fontSize: 14,
                            paddingRight: 2,
                          }}
                        >
                          Line Items{" "}
                        </Typography>
                        <Tooltip
                          title={
                            "Table fee, Service Charges,tips, tax etc (All Items value will be consider as a percentage)"
                          }
                        >
                          <InfoIcon sx={{ color: "red" }} />
                        </Tooltip>
                      </Stack>
                    </Box>

                    <Box sx={{ width: "30%" }}>
                      <Button
                        style={{
                          backgroundColor: "#E4D0B5",
                          color: "black",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                        variant="contained"
                        onClick={() => {
                          handleAddKeyValue();
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Stack>
                  <Typography>{showLineItemError}</Typography>
                  <Stack flexDirection={"row"} sx={{ paddingTop: 1 }}>
                    <Box sx={{ width: "50%" }}>
                      <TextField
                        variant="outlined"
                        label="Line Item "
                        value={key}
                        onChange={(event) => setKey(event.target.value)}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                      />
                    </Box>
                    <Box sx={{ width: "50%", paddingLeft: 1 }}>
                      <TextField
                        variant="outlined"
                        label="Value"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                      />
                    </Box>
                  </Stack>

                  {Object.entries(keyValuePairs).map(([key, value], index) => (
                    <>
                      <Stack flexDirection={"row"}>
                        <Box sx={{ width: "40%" }}>
                          <Typography
                            sx={{
                              color: palette.primary.gold,
                              fontSize: 14,
                              fontWeight: "600",
                              padding: 2,
                            }}
                            key={key}
                          >
                            {index + 1}) {key}:
                          </Typography>
                        </Box>
                        <Box sx={{ width: "50%" }}>
                          <Stack flexDirection={"row"}>
                            <Typography
                              sx={{
                                color: palette.primary.gold,
                                fontSize: 14,
                                fontWeight: "600",
                                padding: 2,
                              }}
                              key={key}
                            >
                              Value: {value} %
                            </Typography>
                            <Button
                              style={{
                                color: "red",
                                fontSize: 14,
                                fontWeight: "600",
                              }}
                              variant="contained"
                              onClick={() => handleDeleteKeyValue(key)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Box>
                      </Stack>
                    </>
                  ))}
                </Stack>
                <Box
                  sx={{
                    width: "100%",
                    padding: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      addClub();
                      //setaddClubPopUp(true);
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
                    Add CLub
                  </Button>
                </Box>
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        <DeleteClubDialog />

        <AddImageDialog />
        <ViewClubInforamtionDialog />
      </Container>
    </>
  );
}
