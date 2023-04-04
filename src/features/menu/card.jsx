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
//THEME
import palette from "../../theme/palette";

//COMPONENTS
import Iconify from "../../component/iconify";
import Scrollbar from "../../component/scrollbar";

export const MenuItemCard = ({ data, SelectedMenuData }) => {
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
                console.log("SelectedMenuData", data);
                SelectedMenuData(data , 1);
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
                SelectedMenuData(data , 2);

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
                  width: "33%",
                }}
              >
                <Typography style={{ color: "#E4D0B5" }}>Item</Typography>
              </Box>
              <Box
                style={{
                  width: "33%",
                }}
              >
                <Typography style={{ color: "#E4D0B5" }}>Stock</Typography>
              </Box>
              <Box
                style={{
                  width: "33%",
                }}
              >
                <Typography style={{ color: "#E4D0B5" }}>Price</Typography>
              </Box>
              
            </Stack>
          </Scrollbar>
        </Container>
        {data.items.map((item, index) => {
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
                          width: "33%",
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
                          width: "33%",
                        }}
                      >
                        <Typography>{item?.stock}</Typography>
                      </Box>
                      <Box
                        style={{
                          width: "33%",
                        }}
                      >
                        <Typography>{item?.price}</Typography>
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
