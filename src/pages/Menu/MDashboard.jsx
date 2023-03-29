import React, { useState, useEffect } from "react";
//ROUTE
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../../css/DasboardCss.css";
// @mui
import {
  Box,
  Stack,
  Button,
  Popover,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import { TextField } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

//COMPONENTS
import Iconify from "../../component/iconify";
import Scrollbar from "../../component/scrollbar";
import { MenuItemCard } from "../../features/menu/card";
//THEME
import palette from "../../theme/palette";
// LOCAL-STORAGE
import { LocalStorageKey } from "src/utils/localStorage/keys";
//services
import { getProfileData } from "src/services/representative";

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
  const [popup_open, setpopup_open] = useState(true);

  //CREATE EVENT STATES==>
  const [CategoryName, setCategoryName] = useState("");

  //selected club data
  const [selectedClubData, setselectedClubData] = useState([]);

  //add entities
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [menuItem, setMenuItem] = useState("");
  const [stock, setstock] = useState("");
  const [price, setprice] = useState("");
  const [showLineItemError, setshowError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  //LOAD DATA
  const loadData = async () => {
    const representativeId = localStorage.getItem(LocalStorageKey.USER_ID);

    if (representativeId === null) {
      navigate("/");
    } else {
      getClubData(JSON.parse(representativeId));
    }
  };

  // get the clubs
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
  };

  //ADD ITEMS INTO CATEGORY MENU
  const addMenuItems = () => {
    console.log("menuItem=====>", menuItem);
    if (menuItem.trim() != "" && stock.trim() != "" && price.trim() != "") {
      let obj = {
        name: menuItem,
        quantity: stock,
        price: price,
      };
      setKeyValuePairs([...keyValuePairs, obj]);
      setMenuItem("");
      setstock("");
      setprice("");
    } else {
      alert("Please add the items !");
    }
  };

  //DELETE ITEMS FROM CATEGORY MENU
  const handleDeleteKeyValue = (name) => {
    const newKeyValuePairs = [...keyValuePairs];
    const findIndex = newKeyValuePairs.findIndex((a) => a.name === name);
    findIndex !== -1 && newKeyValuePairs.splice(findIndex, 1);
    setKeyValuePairs(newKeyValuePairs);
  };

  //API CALL : ADD MENU
  const addMenutoServer = async () => {
    let obj = {
      clubId: selectedClubData._id,
      menu: [
        {
          category: CategoryName,
          items: keyValuePairs,
        },
      ],
    };

    console.log("obj========>", obj);
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
                  setpopup_open(true);
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
        anchorEl={null}
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
                  <Typography
                    sx={{
                      color: palette.primary.gold,
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
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

              <Stack flexDirection={"row"} sx={{ paddingTop: 1 }}>
                <Button
                  onClick={() => {
                    addMenuItems();
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
                <Box>
                  <TextField
                    variant="outlined"
                    label="Menu Item "
                    value={menuItem}
                    onChange={(event) => setMenuItem(event.target.value)}
                    InputLabelProps={{
                      style: { color: palette.primary.gold },
                    }}
                    inputProps={{ style: { color: palette.primary.gold } }}
                  />
                </Box>
                <Box sx={{ paddingLeft: 1 }}>
                  <TextField
                    variant="outlined"
                    label="Stock"
                    value={stock}
                    onChange={(event) => setstock(event.target.value)}
                    InputLabelProps={{
                      style: { color: palette.primary.gold },
                    }}
                    inputProps={{ style: { color: palette.primary.gold } }}
                  />
                </Box>
                <Box sx={{ paddingLeft: 1 }}>
                  <TextField
                    variant="outlined"
                    label="Price "
                    value={price}
                    onChange={(event) => setprice(event.target.value)}
                    InputLabelProps={{
                      style: { color: palette.primary.gold },
                    }}
                    inputProps={{ style: { color: palette.primary.gold } }}
                  />
                </Box>
              </Stack>
              {keyValuePairs.length > 0 ? (
                <>
                  <Box
                    style={{
                      height: 4,
                      backgroundColor: palette.primary.gold,
                      marginTop: 20,
                    }}
                  ></Box>
                  <Stack
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      paddingBottom: 10,
                      paddingTop: 10,
                    }}
                  >
                    <Typography style={{ color: palette.primary.gold }}>
                      Menu Item{" "}
                    </Typography>
                    <Typography style={{ color: palette.primary.gold }}>
                      Quantity
                    </Typography>
                    <Typography style={{ color: palette.primary.gold }}>
                      Price
                    </Typography>
                    <Typography style={{ color: palette.primary.gold }}>
                      Delete
                    </Typography>
                  </Stack>
                  <Box
                    style={{
                      height: 4,
                      backgroundColor: palette.primary.gold,
                      marginTop: 4,
                    }}
                  ></Box>
                </>
              ) : (
                <></>
              )}
              {keyValuePairs.map((item, index) => {
                return (
                  <>
                    <Box style={{ paddingTop: 10 }}>
                      <Box>
                        <Stack
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginTop: 20,
                          }}
                        >
                          <Typography style={{ color: palette.primary.gold }}>
                            {item.name}
                          </Typography>
                          <Typography style={{ color: palette.primary.gold }}>
                            {item.quantity}
                          </Typography>
                          <Typography style={{ color: palette.primary.gold }}>
                            {item.price}
                          </Typography>
                          <Button
                            style={{
                              color: "red",
                              fontSize: 14,
                              fontWeight: "600",
                            }}
                            variant="contained"
                            onClick={() => handleDeleteKeyValue(item.name)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
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
                  onClick={() => {
                    addMenutoServer();
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
