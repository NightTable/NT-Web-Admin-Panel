import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
// @mui
import { useTheme } from "@mui/material/styles";
// @mui
import {
  Box,
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
} from "@mui/material";

export const ButtonTabs = (props) => {
  return (
    <>
      {props.tabData.map((item, index) => {
        return (
          <>
            <Box
              onClick={() => {
                props.setselected_btn(index,item);
              }}
              border={2}
              borderRadius={2}
              marginRight={2}
              borderColor={index == props.selected_btn ? "black" : "#E4D0B5"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={
                index == props.selected_btn ? "#E4D0B5" : "black"
              }
            >
              <Typography
                variant="body1"
                style={{
                  color: index == props.selected_btn ? "black" : "#E4D0B5",
                  fontWeight: index == props.selected_btn ? "bold" : "500",

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
    </>
  );
};
