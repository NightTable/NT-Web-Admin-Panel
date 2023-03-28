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
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Iconify from "../../component/iconify";
import palette from "../../theme/palette";
// components
import Scrollbar from "../../component/scrollbar";
import { LocalStorageKey } from "src/utils/localStorage/keys";
//services
import { getProfileData } from "src/services/representative";
import dayjs from "dayjs";

//MAIN FUNCTION

const MenuItems = [
  {
    id: "1",
    category: "Champange",
    Items: [
      {
        name: "Dom Perignon Rose",
        stock: 50,
        price: "$1000",
      },
      {
        name: "Veuve Cliquot",
        stock: 30,
        price: "$300",
      },
    ],
  },
  {
    id: "2",
    category: "Vodka",
    Items: [
      {
        name: "Lemon Vodka",
        stock: 50,
        price: "$1000",
      },
      {
        name: "Sex on Beach",
        stock: 20,
        price: "$3400",
      },
      {
        name: "Lemon Vodka",
        stock: 50,
        price: "$1000",
      },
      {
        name: "Sex on Beach",
        stock: 20,
        price: "$3400",
      },
    ],
  },
];

export default function MDashboard() {
  const theme = useTheme();
  //NAVIGATION
  const navigate = useNavigate();
  //clubs
  const [clubs_data, setclubs_data] = useState([]);

  //CLicked Button
  const [selected_club_btn, setselected_club_btn] = useState("0");

  //POP-UP 
  const [popup_open, setpopup_open] = useState(true)

  //CREATE EVENT STATES==>
  const [CategoryName, setCategoryName] = useState("");
  //SHOW CLUB

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

    setselectedClubData(tempArr[0]._id);
    let obj = {
      clubId: tempArr[0]._id,
    };
    console.log(`tempArr[0]._id`, tempArr[0]._id);
    setclubs_data(tempArr);
  };

  //API CALL : ADD CLUB
  const addEvent = async () => {
    let obj = {
      name: CategoryName,
      picture: "jdkaHSFKASFIKANVAJ",
      eventDate: "",
      eventTime: "",
      clubId: "",
    };
  };


  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);



  const MenuItemCard = ({ data }) => {
    return (
      <>
        <Box>
          <Box style={{ paddingBottom: 20, paddingTop: 20 }}>
            <Stack
              flexDirection={"row"}
              style={{
                alignItems: "center",
              }}
            >
              <Typography
                style={{
                  color: "#E4D0B5",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "inherit",
                  fontWeight: "bold",
                }}
              >
                {data?.category}
              </Typography>
              <IconButton
                size="large"
                onClick={() => {
                  // setEventClubPopUp(!true);
                }}
              >
                <Iconify
                  color={palette.primary.gold}
                  icon={"material-symbols:edit"}
                />
              </IconButton>
              <IconButton
                size="large"
                color={"success"}
                onClick={() => {
                  // setEventClubPopUp(!true);
                }}
              >
                <Iconify color={palette.primary.gold} icon={"maki:cross"} />
              </IconButton>
            </Stack>
          </Box>
          <Container
            style={{
              paddingBottom: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Scrollbar>
              <Stack flexDirection={"row"}>
                <Box
                  style={{
                    width: "30%",
                  }}
                >
                  <Typography style={{ color: "#E4D0B5" }}>Item</Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                  }}
                >
                  <Typography style={{ color: "#E4D0B5" }}>Stock</Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                  }}
                >
                  <Typography style={{ color: "#E4D0B5" }}>Price</Typography>
                </Box>
                <Box
                  style={{
                    width: "20%",
                  }}
                >
                  <Stack justifyContent={"space-between"} flexDirection={"row"}>
                    <Typography style={{ color: "#E4D0B5" }}>Edit</Typography>
                    <Typography style={{ color: "#E4D0B5" }}>Delete</Typography>
                  </Stack>
                </Box>
              </Stack>
            </Scrollbar>
          </Container>
          {data.Items.map((item, index) => {
            return (
              <>
                <Container
                  style={{
                    borderWidth: 1,
                    backgroundColor: "#E4D0B5",
                    padding: 10,
                    borderRadius: 4,
                    marginBottom: 10,
                    justifyContent: "center",
                  }}
                >
                  <Scrollbar>
                    <Box>
                      <Stack flexDirection={"row"}>
                        <Box
                          style={{
                            width: "30%",
                            flexDirection: "row",
                          }}
                        >
                          <Stack flexDirection={"row"}>
                            <Typography>
                              {index + 1}){"  "}
                            </Typography>

                            <Typography> {item?.name}</Typography>
                          </Stack>
                        </Box>
                        <Box
                          style={{
                            width: "20%",
                          }}
                        >
                          <Typography>{item?.stock}</Typography>
                        </Box>
                        <Box
                          style={{
                            width: "20%",
                          }}
                        >
                          <Typography>{item?.price}</Typography>
                        </Box>
                        <Box
                          style={{
                            width: "20%",
                          }}
                        >
                          <Stack
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={() => {
                                // setEventClubPopUp(!true);
                              }}
                            >
                              <Iconify
                                color={"black"}
                                icon={"material-symbols:edit"}
                              />
                            </IconButton>
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={() => {
                                // setEventClubPopUp(!true);
                              }}
                            >
                              <Iconify color={"black"} icon={"maki:cross"} />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Stack>
                    </Box>
                  </Scrollbar>
                </Container>
              </>
            );
          })}
        </Box>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title> Night Table : Events </title>
      </Helmet>

      <Container maxWidth="xl">
        <Container>
          <Box display="flex">
            <Box width="50%" textAlign="left">
              <Typography variant="h4" sx={{ color: "#E4D0B5" }}>
                Let's Add Something to Menu
              </Typography>
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
                Add Menu
              </Button>
            </Box>
          </Box>

          <Scrollbar>
            <Stack direction="row" mt={4} mb={2}>
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
          <Box width="50%" textAlign="left">
            <Typography variant="h4" sx={{ color: "#E4D0B5" }}>
              Menu Items
            </Typography>
          </Box>
          <Box
            style={{
              height: 4,
              backgroundColor: palette.primary.gold,
              marginTop: 10,
            }}
          ></Box>
          {MenuItems.map((item) => {
            return (
              <>
                <Scrollbar>
                  <MenuItemCard data={item} />
                </Scrollbar>
              </>
            );
          })}
        </Container>
      </Container>
      <Popover
open={popup_open}
anchorEl={open}
onClose={() => {
  setpopup_open(!true);
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
      setpopup_open(!true);
    }}
  >
    <Iconify color={palette.primary.gold} icon={"maki:cross"} />
  </IconButton>
    </Stack>
    <Typography
      sx={{
        color: palette.primary.gold,
        textAlign: "center",
        paddingTop: 2,
        paddingBottom: 4,
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      Add Menu
    </Typography>
    <Container sx={{ width: "100%" }}>
      <Stack flexDirection={"row"}>
        <Box sx={{ width: "30%" }}>
          <Typography sx={{ color: palette.primary.gold,alignItems:'center',justifyItems:'center' }}>
            Category Name
          </Typography>
        </Box>
        <Box sx={{ width: "70%", paddingBottom: 2 }}>
          <TextField
            fullWidth
            autoComplete="off"
            label="Category Name"
            variant="outlined"
            value={CategoryName}
            onChange={(text) => {
              setCategoryName(text.target.value);
            }}
            inputProps={{ style: { color: palette.primary.gold } }}
            InputLabelProps={{
              style: { color: palette.primary.gold },
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
          Add 
        </Button>
      </Box>
    </Container>
  </Box>
</Scrollbar>
</Popover>
    </>
  );
}


