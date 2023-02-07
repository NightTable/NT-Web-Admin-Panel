import * as React from 'react';

import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import Box from "@mui/material/Box";
import { TextField } from "@material-ui/core";
import "../pages/DasboardCss.css";
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
  Alert,
  withStyles,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
import InfoIcon from "@mui/icons-material/Info";
import Scrollbar from "../components/scrollbar";
//dialog 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';

//dropdown

import Dropdown from "../components/Dropdown";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
//theme
import palette from "../theme/palette";
// ----------------------------------------------------------------------
import { ClubsData } from "src/_mock/club";
import { Palette } from "@mui/icons-material";
//jsons
import { countries } from "src/_mock/countries";

//servie files
import { getClubs, addClubtoServer } from "src/services/club";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },

  { id: "phone Number", label: "Phone Number", alignRight: false },

  { id: "Address", label: "Address", alignRight: false },
  { id: "website", label: "Website", alignRight: false },
  { id: "edit", label: "Edit", alignRight: false },
  { id: "delete", label: "Delete", alignRight: false },
];
export default function DashboardAppPage() {
  const theme = useTheme();
  //States

  const [clubName, setclubName] = useState("");
  const [addressLine, setaddressLine] = useState("");
  const [country, setcountry] = useState();
  const [instaHandle, setinstaHandle] = useState("");
  const [stripeAccountNo, setstripeAccountNo] = useState("");
  const [WebsiteUrl, setWebsiteUrl] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [longitude, setlongitude] = useState('')
  const [latitude, setlatitude] = useState('')
  
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

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  //add club pop-over open
  const [popOverOpen, setpopOverOpen] = useState(false);

  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const checkLocationPermission = async () => {
    if ("geolocation" in navigator) {
      console.log("Available");
      getGeolocation();
    } else {
      console.log("Not Available");
    }
  };

  const getGeolocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlongitude(position.coords.latitude)
      setlatitude(position.coords.longitude)
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };

  // get the clubs
  const loadData = async () => {
    checkLocationPermission();
    const data = await getClubs();
    setclubs_data(data);
  };

  //add the clubs
  const addClub = async () => {
    var obj = {
      name: clubName,
      location: [longitude,latitude],
      instaHandle: instaHandle,
      phoneNumber: phoneNumber,
      address: {
        line1: addressLine,
        City: "Moscow",
        state: "",
        country: country,
      },
      website: WebsiteUrl,
      photos: ["", "", ""],
      stripeAccountNumber: stripeAccountNo,
      ownedBy: "god",
      lineItems: keyValuePairs,
    };
console.log("keyValuePairs====>",keyValuePairs);
       //const data = await addClubtoServer(obj);
    console.log("Add Club :data", obj);
  };


  //dialog 
  const [deleteDialogOpen, setdeleteDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setdeleteDialogOpen(true);
  };

  const handleClose = (id) => {
    if(id == '1'){

    }
    else(id == '2')
    setdeleteDialogOpen(false);
  };


  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   setSelected(newSelected);
  // };

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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ClubsData.length) : 0;

  function applySortFilter(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      // const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }


  const DeleteClubDialog = () =>{
    return(
      <>
       <Dialog
        open={deleteDialogOpen}
        keepMounted
        onClose={handleClose('1')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure want to delete the club, as you won't be able to recover it !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(`1`)}>Delete</Button>
          <Button onClick={handleClose(`2`)}>Close</Button>
        </DialogActions>
      </Dialog>
      </>
    )
  }

  const filteredData = applySortFilter(ClubsData, filterName);
  const isNotFound = !!filterName;

  return (
    <>
      <Helmet>
        <title> Night Table : Admin Dashboard </title>
      </Helmet>

      <Container
        sx={{
          bgcolor: "black",
          width: "100%",
          height: "100%",
          borderTopColor: "red",
        }}
        maxWidth="xl"
      >
        <Typography variant="h4" sx={{ mb: 5, color: "#E4D0B5" }}>
          Hi, Welcome back
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
                setpopOverOpen(true);
              }}
              variant="contained"
              sx={{ backgroundColor: "#E4D0B5", color: "black" }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add CLub
            </Button>
          </Stack>

          <Card>
            {/* <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            /> */}

            <Scrollbar>
              <TableContainer
                sx={{
                  minWidth: 800,
                  backgroundColor: "black",
                  borderWidth: 1,
                  borderColor: palette.primary.gold,
                }}
              >
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                    rowCount={clubs_data.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {clubs_data?.map((item, index) => {
                      const { id, name, address, website, phoneNumber } = item;
                      return (
                        <>
                          <TableRow
                            style={{
                              margin: 20,
                            }}
                            bgcolor={"#E4D0B5"}
                            // hover
                            key={id}
                            tabIndex={-1}
                          >
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
                                {address?.line1},{address?.state},{" "}
                                {address?.city},{address?.country}
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
                                    alert("EDIT ALERT");
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
                                  handleClickOpen();
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

                  {/* {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
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
                   )} */}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={clubs_data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>

        <Popover
          open={popOverOpen}
          anchorEl={open}
          onClose={() => {
            setpopOverOpen(!true);
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
                    setpopOverOpen(!true);
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
                      id="outlined-basic"
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
                        fullWidth
                        sx={{ width: "100%", paddingBottom: 2 }}
                        id="outlined-basic"
                        label="Phone Number"
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
                        sx={{ width: "100%", paddingBottom: 2 }}
                        id="outlined-basic"
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
                        data={countries}
                        changedValue={(item) => {
                          setcountry(item.label);
                        }}
                      />
                      <Dropdown
                        textinputLabel={"Select State"}
                        data={countries}
                        changedValue={(item) => {
                          setcountry(item.label);
                        }}
                      />
                      <Dropdown
                        textinputLabel={"Select City"}
                        data={countries}
                        changedValue={(item) => {
                          setcountry(item.label);
                        }}
                      />
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
                        id="outlined-basic"
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
                        id="outlined-basic"
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
                      sx={{ width: "100%" }}
                      id="outlined-basic"
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
                        sx={{
                          backgroundColor: "#E4D0B5",
                          color: "black",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                        variant="contained"
                        onClick={handleAddKeyValue}
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
                    <Box sx={{ width: "50%" }}>
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
                        <Box sx={{ width: "50%" }}>
                          <Typography
                            sx={{
                              color: palette.primary.gold,
                              fontSize: 16,
                              fontWeight: "600",
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
                                fontSize: 16,
                                fontWeight: "600",
                                paddingRight: 2,
                              }}
                              key={key}
                            >
                              Value: {value} %
                            </Typography>
                            <Button
                              sx={{
                                color: palette.primary.gold,
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
                    paddingTop: 2,
                  }}
                >
                  <Button
                    onClick={() => {
                      addClub();
                      //setpopOverOpen(true);
                    }}
                    variant="contained"
                    sx={{
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
        <DeleteClubDialog/>
      </Container>
    </>
  );
}

{
  /* <Scrollbar>
<TableContainer sx={{ minWidth: 800, backgroundColor: 'black', borderWidth: 1, borderColor: palette.primary.gold }}>
  <Table>
    <UserListHead headLabel={TABLE_HEAD} rowCount={clubsData.length} numSelected={selected.length} />
    <TableBody>
      {ClubsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, Address, Website, Region } = row;
        // const selectedUser = selected.indexOf(name) !== -1;

        return (
          <TableRow bgcolor={'black'} hover key={id} tabIndex={-1} selected={selectedUser}>
            <TableCell bgcolor={'black'} component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography sx={{ color: palette.primary.gold }} variant="subtitle2" noWrap>
                  {name}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">
              <Typography sx={{ color: palette.primary.gold }}>{Address}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography sx={{ color: palette.primary.gold }}>{Website}</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography sx={{ color: palette.primary.gold }}>{Region}</Typography>
            </TableCell>

            <TableCell align="right">
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
              <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                <Iconify icon={'eva:more-vertical-fill'} />
              </IconButton>
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>

    {isNotFound && (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <Paper
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" paragraph>
                Not found
              </Typography>

              <Typography variant="body2">
                No results found for &nbsp;
                <strong>&quot;{filterName}&quot;</strong>.
                <br /> Try checking for typos or using complete words.
              </Typography>
            </Paper>
          </TableCell>
        </TableRow>
      </TableBody>
    )}
  </Table>
</TableContainer>
</Scrollbar> */
}
