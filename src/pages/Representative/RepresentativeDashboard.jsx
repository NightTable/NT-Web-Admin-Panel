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
import InfoIcon from "@mui/icons-material/Info";

// components
import Iconify from "../../component/iconify";
import Scrollbar from "../../component/scrollbar";
import Dropdown from "../../component/Dropdown";
import { DeleteDialog } from "../../features/DeleteDialog";
//dialog

//dropdown

// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user";
// mock
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
//theme
import palette from "../../theme/palette";
// ----------------------------------------------------------------------

import { getCountries } from "../../services/countries";
import { getProfileData } from "../../services/representative";
import { REPRESENTATIVE_CONFIG_TABLE_HEAD } from "../../Table_Head/index";

//LOCAL STORAGE
import { LocalStorageKey } from "src/utils/localStorage/keys";

//MAIN FUNCTION
export default function RepresentativeDashboard() {
  const theme = useTheme();
  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  //CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState("0");


  // ADD REPRESENTATIVE 
  const [fullName, setfullName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [email, setemail] = useState('');
  const [representativeRole, setrepresentativeRole] = useState('');

  //add Representative pop-over open
  const [addRepresentativePopUp, setaddRepresentativePopUp] = useState(false);


  //country data
  const [country, setcountry] = useState("");
  const [countryData, setcountryData] = useState([]);
  const [countryCode, setcountryCode] = useState("");

  
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

    setselectedClubData(tempArr[0]);
    let obj = {
      clubId: tempArr[0]._id,
    };
    setclubs_data(tempArr);

    const countriesData = await getCountries();
    let arr = [];
    countriesData.forEach((element) => {
      arr.push({
        label: element.name,
        value: element.isoCode,
        phoneNumberCode: element.phoneNumberCode,
      });
    });
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
    // } else {
    //   alert("ERROR IN ADDING CLUB ");
    // }
  };

  //dialog

  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);
  
  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
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
        <title> Night Table : Representatives </title>
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
              Representatives
            </Typography>
            <Button
              onClick={() => {
                setaddRepresentativePopUp(true);
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
              Add
            </Button>
          </Stack>

          <Scrollbar>
            <Stack direction="row" mt={4} mb={2}>
              {clubs_data.map((item, index) => {
                return (
                  <>
                    <Box
                      onClick={() => {
                        setselected_club_btn(index);

                        setselectedClubData(item);
                        getMenuDataClub(item._id);
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
                    headLabel={REPRESENTATIVE_CONFIG_TABLE_HEAD}
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

                              <TableCell align="right">
                                <Stack flexDirection={"row"}>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                     

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
          open={addRepresentativePopUp}
          anchorEl={null}
          onClose={() => {
            setaddRepresentativePopUp(!true);
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
                    setaddRepresentativePopUp(!true);
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
                Add New Representative
              </Typography>
              <Container sx={{ width: "100%" }}>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      Full Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Club Name"
                      variant="outlined"
                      value={fullName}
                      onChange={(text) => {
                        setfullName(text.target.value);
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
                      Email 
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
               
             
                <Box
                  sx={{
                    width: "100%",
                    padding: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                  //    addClub();
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
                    Add Representative
                  </Button>
                </Box>
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        <DeleteClubDialog />
      </Container>
    </>
  );
}
