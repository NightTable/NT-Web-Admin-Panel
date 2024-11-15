import * as React from "react";

import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { filter } from "lodash";
import { TextField } from "@material-ui/core";
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
import ViewRepresentativeInfo from "./ViewRepresentativeInfo";
// components
import Iconify from "../../component/iconify";
import Scrollbar from "../../component/scrollbar";
import Dropdown from "../../component/Dropdown";
import { DeleteDialog } from "../../features/DeleteDialog";
//dialog
import Switch from "react-switch";

//dropdown

// sections
import { UserListHead, UserListToolbar } from "../../sections/@dashboard/user"; //theme
import palette from "../../theme/palette";
// ----------------------------------------------------------------------
import { getClubs } from "../../services/club";
import {
  addRepresentativetoClub,
  getProfileData,
  getRepresentativebyClub,
  editRepresentativetoClub,
  deleteRepresentativebyClub,
} from "../../services/representative";
import { REPRESENTATIVE_CONFIG_TABLE_HEAD } from "../../Table_Head/index";

//LOCAL STORAGE
import { LocalStorageKey } from "src/utils/localStorage/keys";

//RESET PRIVILEGE DATA FIELDS

const resetPrivilege = [
  {
    id: 0,
    text: "Add, edit or delete table configurations?",
    privilege: false,
    name: "tableConfigPrivilege",
  },
  {
    id: 1,
    text: "Add, edit or delete events ?",
    privilege: false,
    name: "eventPrivileges",
  },
  {
    id: 2,
    text: "Delete reservations, place orders during reservation ?",
    privilege: false,
    name: "reservationManagementPrivileges",
  },
  {
    id: 3,
    text: "Confirm arrival of table groups ?",
    privilege: false,
    name: "arrivalConfirmationPrivileges",
  },
  {
    id: 4,
    text: "Set custom table minimums on NightTable App ?",
    privilege: false,
    name: "mobileAppTableMinimumPrivileges",
  },
  {
    id: 5,
    text: "Add, edit or delete menu items ?",
    privilege: false,
    name: "menuItemPrivileges",
  },
  {
    id: 6,
    text: "Add, edit or delete clubs ?",
    privilege: false,
    name: "clubPrivileges",
  },
  {
    id: 7,
    text: "Add, edit or delete representatives ?",
    privilege: false,
    name: "representativePrivileges",
  },
];
const Privilegesarr = [
  {
    id: 0,
    text: "Add, edit or delete table configurations?",
    privilege: false,
    name: "tableConfigPrivilege",
  },
  {
    id: 1,
    text: "Add, edit or delete events ?",
    privilege: false,
    name: "eventPrivileges",
  },
  {
    id: 2,
    text: "Delete reservations, place orders during reservation ?",
    privilege: false,
    name: "reservationManagementPrivileges",
  },
  {
    id: 3,
    text: "Confirm arrival of table groups ?",
    privilege: false,
    name: "arrivalConfirmationPrivileges",
  },
  {
    id: 4,
    text: "Set custom table minimums on NightTable App ?",
    privilege: false,
    name: "mobileAppTableMinimumPrivileges",
  },
  {
    id: 5,
    text: "Add, edit or delete menu items ?",
    privilege: false,
    name: "menuItemPrivileges",
  },
  {
    id: 6,
    text: "Add, edit or delete clubs ?",
    privilege: false,
    name: "clubPrivileges",
  },
  {
    id: 7,
    text: "Add, edit or delete representatives ?",
    privilege: false,
    name: "representativePrivileges",
  },
];
//MAIN FUNCTION
export default function RepresentativeDashboard() {
  const theme = useTheme();

  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  //CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState("0");
  //SHOW REPRESENTATIVE DATA
  const [representativeData, setrepresentativeData] = useState([]);
  //SELECTED REPRESENTATIVE DATA
  const [selectedrepresentativeData, setselectedrepresentativeData] =
    useState();
  //VIew pop-up enabled
  const [viewPopupEnabled, setviewPopupEnabled] = useState(false);
  // ADD REPRESENTATIVE
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [representativeRole, setrepresentativeRole] = useState("");
  const [switchToggle, setswitchToggle] = useState(false);

  const [editRepresentativeBoolean, seteditRepresentativeBoolean] =
    useState(false);
  //add Representative pop-over open
  const [addRepresentativePopUp, setaddRepresentativePopUp] = useState(false);
  //PRIVILIGES ARRAY
  const [PrivilegesData, setPrivilegesData] = useState(Privilegesarr);
  //dialog

  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);

  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

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
    const data = await getClubs();
    //GET FIRST CLUB REPRESENTATIVE
    getClubRepData(data.data[0]._id);
    //SELECTED CLUB DATA
    setselectedClubData(data.data[0]);
    setclubs_data(data.data);
  };

  const DeleteClubDialog = () => {
    return (
      <>
        <DeleteDialog
          heading={"Delete the Representative?"}
          paragraph={
            " Are you sure want to delete the representative, as you won't be able to recover it !"
          }
          deleteBtnPressed={(value) => {
            deleteRepresentative();
          }}
          closeBtnPressed={(value) => {
            setdeleteDialogOpen(!value);
          }}
          deleteDialogOpen={deleteDialogOpen}
        />
      </>
    );
  };

  //CLUB REPRESENTATIVE DATA
  const getClubRepData = async (club_id) => {
    const data = await getRepresentativebyClub(club_id);
    setrepresentativeData(data);
  };

  //ADD REPRESENTATIVE DATA TO DB
  const addRepresentativetoDB = async () => {
    let tempObj = {};
    PrivilegesData.forEach((item) => {
      tempObj[item.name] = item.privilege;
    });

    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      username: userName,
      role: representativeRole,
      associatedClubs: [selectedClubData._id],

      clubPrivileges: [
        {
          club: selectedClubData._id,
          privileges: tempObj,
        },
      ],
    };
    const addRepresentative = await addRepresentativetoClub(obj);
    if (addRepresentative.status === true) {
      alert("Club Representative Added !");
      resetRepresentataiveData();
      setaddRepresentativePopUp(false);
      setrepresentativeData([...representativeData, obj]);
      getClubRepData(selectedClubData._id);
    } else {
      alert("Something Went Wrong!");
      resetRepresentataiveData();
      setaddRepresentativePopUp(false);
    }
  };

  //EDIT REPRESENTATIVE
  const editRepresentativetoDB = async () => {
    let tempObj = {};
    PrivilegesData.forEach((item) => {
      tempObj[item.name] = item.privilege;
    });

    let obj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      username: userName,
      role: representativeRole,
      associatedClubs: [selectedClubData._id],
      clubPrivileges: [
        {
          club: selectedClubData._id,
          privileges: tempObj,
        },
      ],
    };
    const addRepresentative = await editRepresentativetoClub(obj);
    if (addRepresentative.status === true) {
      alert("Club Representative Updated Successfully !");
      resetRepresentataiveData();
      setaddRepresentativePopUp(false);
      setrepresentativeData([...representativeData, obj]);
      getClubRepData(selectedClubData._id);
    } else {
      alert("Something Went Wrong!");
      resetRepresentataiveData();
      setaddRepresentativePopUp(false);
    }
  };

  //DELETE REPRESENTATIVE DATA
  const deleteRepresentative = async () => {
    const item = selectedrepresentativeData;
    const filteredData = representativeData.filter((data) => {
      return data._id != item._id;
    });
    //API NEED TO BE CALLED HERE

    console.log(item._id, "JSON.parse(item._id)");
    const data = await deleteRepresentativebyClub(item._id);
    alert("Representative Deleted Successfully!");
    setdeleteDialogOpen(false);
    setrepresentativeData(filteredData);
  };

  //HANDLE SWITCH PRIVILEGE DATA
  const handleSwitchChange = (id) => {
    const updatedPrivileges = PrivilegesData.map((privilege) => {
      if (privilege.id === id) {
        return { ...privilege, privilege: !privilege.privilege };
      }
      return privilege;
    });
    setPrivilegesData(updatedPrivileges);
  };

  //RESET ADD CLUB REPRESENTATIVE DATA
  const resetRepresentataiveData = () => {
    setPrivilegesData(resetPrivilege);
    setfirstName("");
    setlastName("");
    setuserName("");
    setphoneNumber("");
    setemail("");
    setrepresentativeRole("");
  };

  const ViewRepresentativePopup = () => {
    return (
      <>
        <Popover
          open={viewPopupEnabled}
          anchorEl={null}
          onClose={() => {
            setviewPopupEnabled(false);
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
              borderColor: palette.primary.gold,
              backgroundColor: palette.primary.gold,
              borderWidth: 1,

              "& .MuiMenuItem-root": {
                typography: "body2",
                // borderRadius: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                borderColor: palette.primary.gold,
                borderWidth: 12,
              },
            },
          }}
        >
          <Box>
            <Stack
              style={{ marginBottom: 10 }}
              alignItems={"flex-end"}
              justifyItems={"right"}
            >
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  setviewPopupEnabled(false);
                }}
              >
                <Iconify color={"black"} icon={"maki:cross"} />
              </IconButton>
            </Stack>
          </Box>
          <Box>
            <ViewRepresentativeInfo data={selectedrepresentativeData} />
          </Box>
        </Popover>
      </>
    );
  };

  function updatePrivilegeValues(privileges, Privilegesarr) {
    // Loop through the Privilegesarr array
    for (let i = 0; i < Privilegesarr.length; i++) {
      const privilegeName = Privilegesarr[i].name;
      // Find the corresponding privilege value in the privileges object
      const privilegeValue = privileges[0][privilegeName];
      // Update the privilege value in the Privilegesarr array
      Privilegesarr[i].privilege = privilegeValue;
    }

    return Privilegesarr;
  }

  // TABLE PAGINATION
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - representativeData.length)
      : 0;

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
    representativeData,
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
        <Typography variant="h4" sx={{ margin: 3, color: palette.primary.gold }}>
          Hi, Welcome back {process.env.REACT_APP_BASE_URL}
        </Typography>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={1}
          >
            <Typography variant="h4" sx={{ color: palette.primary.gold }}>
              Representatives
            </Typography>
            <Button
              onClick={() => {
                resetRepresentataiveData();
                setaddRepresentativePopUp(true);
              }}
              style={{
                backgroundColor: palette.primary.gold,
                color: "black",
                padding: 8,
                borderRadius: 10,
              }}
              variant="Outlined"
              // sx={{ backgroundColor: palette.primary.gold, color: "black" }}
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
                        getClubRepData(item._id);
                      }}
                      border={2}
                      borderRadius={2}
                      marginRight={2}
                      borderColor={
                        index == selected_club_btn ? "black" : palette.primary.gold
                      }
                      flexDirection={"row"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      backgroundColor={
                        index == selected_club_btn ? palette.primary.gold : "black"
                      }
                    >
                      <Typography
                        variant="body1"
                        style={{
                          color:
                            index == selected_club_btn ? "black" : palette.primary.gold,
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
              backgroundColor: palette.primary.gold,
              padding: 1,
              borderRadius: 4,
            }}
          >
            {/* <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            /> */}

            <Scrollbar>
              <TableContainer>
                <Table>
                  <UserListHead
                    headLabel={REPRESENTATIVE_CONFIG_TABLE_HEAD}
                    rowCount={representativeData.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {filteredData
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        const {
                          _id,
                          firstName,
                          lastName,
                          email,
                          username,
                          role,
                          phoneNumber,
                        } = item;
                        return (
                          <>
                            <TableRow
                              style={{
                                margin: 20,
                              }}
                              bgcolor={palette.primary.gold}
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
                                      setselectedrepresentativeData(item);
                                      setviewPopupEnabled(true);
                                    }}
                                  >
                                    <Iconify icon={"ic:sharp-remove-red-eye"} />
                                  </IconButton>
                                </Stack>
                              </TableCell>

                              <TableCell
                                bgcolor={palette.primary.gold}
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
                                  {")"} {firstName}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography sx={{ color: "black" }}>
                                  {phoneNumber}{" "}
                                </Typography>
                              </TableCell>
                              <TableCell align="left">
                                <Typography sx={{ color: "black" }}>
                                  {role}{" "}
                                </Typography>
                              </TableCell>

                              <TableCell align="right">
                                <Stack flexDirection={"row"}>
                                  <IconButton
                                    size="large"
                                    color="inherit"
                                    onClick={() => {
                                      seteditRepresentativeBoolean(true);
                                      setselectedrepresentativeData(item);

                                      const privileges = [
                                        item.clubPrivileges[0].privileges,
                                      ];

                                      const duplicatePrivilegeData =
                                        PrivilegesData;
                                      const updatedPrivilegeArr =
                                        updatePrivilegeValues(
                                          privileges,
                                          duplicatePrivilegeData
                                        );
                                      setPrivilegesData(updatedPrivilegeArr);
                                      setfirstName(firstName);
                                      setlastName(lastName);
                                      setuserName(username);
                                      setphoneNumber(phoneNumber);
                                      setemail(email);
                                      setrepresentativeRole(role);
                                      setaddRepresentativePopUp(true);

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
                                    setselectedrepresentativeData(item);
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
                  {filteredData?.length <= 0 ? (
                    <>
                      <TableBody
                        style={{
                          backgroundColor: palette.primary.gold,
                        }}
                      >
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: "center",
                              }}
                              style={{
                                backgroundColor: palette.primary.gold,
                                paddingTop: 20,
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                No Representative found
                              </Typography>

                              <Typography variant="body2">
                                <br />
                                Please add representative to see here
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  ) : (
                    <></>
                  )}
                  {isNotFound && (
                    <TableBody
                      style={{
                        backgroundColor: palette.primary.gold,
                      }}
                    >
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                            style={{
                              backgroundColor: palette.primary.gold,
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
            resetRepresentataiveData();
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
              borderColor: palette.primary.gold,
              // backgroundColor: '#E4D0B5',
              borderWidth: 1,

              "& .MuiMenuItem-root": {
                typography: "body2",
                // borderRadius: 1,
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                borderColor: palette.primary.gold,
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
                    resetRepresentataiveData();
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
                {editRepresentativeBoolean === true ? "Edit" : "Add"} New
                Representative
              </Typography>
              <Container sx={{ width: "100%" }}>
                <Stack flexDirection={"row"}>
                  <Box sx={{ width: "30%" }}>
                    <Typography sx={{ color: palette.primary.gold }}>
                      First Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="name"
                      variant="outlined"
                      value={firstName}
                      onChange={(text) => {
                        setfirstName(text.target.value);
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
                    <Typography sx={{ color: palette.primary.gold }}>
                      Last Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="name"
                      variant="outlined"
                      value={lastName}
                      onChange={(text) => {
                        setlastName(text.target.value);
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
                    <Typography sx={{ color: palette.primary.gold }}>
                      User Name
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="user name"
                      variant="outlined"
                      value={userName}
                      onChange={(text) => {
                        setuserName(text.target.value);
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
                        label={"+XXXXXXXXX"}
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
                        label={"email"}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(text) => {
                          setemail(text.target.value);
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
                      Role
                    </Typography>
                  </Box>
                  <Box sx={{ width: "70%", paddingBottom: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                      <TextField
                        label={"role"}
                        autoComplete="no-autocomplete-random-string"
                        fullWidth
                        variant="outlined"
                        value={representativeRole}
                        onChange={(text) => {
                          setrepresentativeRole(text.target.value);
                        }}
                        inputProps={{ style: { color: palette.primary.gold } }}
                        InputLabelProps={{
                          style: { color: palette.primary.gold },
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Typography
                  fullWidth
                  sx={{ color: palette.primary.gold, paddingBottom: 4 }}
                >
                  Privileges
                </Typography>
                {PrivilegesData.map((item, index) => {
                  return (
                    <>
                      <Stack flexDirection={"row"}>
                        <Box sx={{ width: "70%" }}>
                          <Typography
                            fullWidth
                            sx={{ color: palette.primary.gold }}
                          >
                            {item.text}{" "}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "30%", paddingBottom: 2 }}>
                          <Box sx={{ paddingBottom: 2 }}>
                            {/* <Switch
                              style={{
                                color: "yellow",
                                thumb:'red',track:'green',
                                backgroundClip:'red'
                              }}

                                   classes={{

                                   }}             // style={switchStyle}

                              inputProps={{ "aria-label": "controlled" }}
                              checked={item.privilege}
                              onChange={() => handleSwitchChange(item.id)}
                            />
                          */}
                            <Switch
                              checked={item.privilege}
                              onChange={() => handleSwitchChange(item.id)}
                              onColor={"#AA6C39"}
                              onHandleColor={palette.primary.gold}
                              handleDiameter={30}
                              uncheckedIcon={false}
                              checkedIcon={false}
                              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                              height={20}
                              width={48}
                              className="react-switch"
                              id="material-switch"
                            />
                          </Box>
                        </Box>
                      </Stack>
                    </>
                  );
                })}

                <Box
                  sx={{
                    width: "100%",
                    padding: 2,
                  }}
                >
                  <Button
                    onClick={async () => {
                      editRepresentativeBoolean === true
                        ? editRepresentativetoDB()
                        : addRepresentativetoDB();
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
                    {editRepresentativeBoolean === true ? "Edit" : "Add"}
                  </Button>
                </Box>
              </Container>
            </Box>
          </Scrollbar>
        </Popover>
        <ViewRepresentativePopup />
        <DeleteClubDialog />
      </Container>
    </>
  );
}
