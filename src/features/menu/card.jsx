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


export const  MenuItemCard = ({ data }) => {
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