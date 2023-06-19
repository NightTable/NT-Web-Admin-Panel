import PropTypes from "prop-types";
import * as React from "react";

// @mui
import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton } from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../component/iconify";
//
import AccountPopover from "./AccountPopover";
import NotificationsPopover from "./NotificationsPopover";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "src/features/DeleteDialog";
import { DialogBox } from "src/features/DialogBox";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  //HOOKS
  const navigate = useNavigate();
  const [logoutApp, setlogoutApp] = useState(false);

  //LOGOUT POP-UP
  const LogoutPopUp = () => {
    return (
      <>
        <DialogBox
          heading={"Logout Night Table App!"}
          paragraph={" Are you sure want to logout ?"}
          Btn1Name={"Logout"}
          Btn1Pressed={(value) => {
            localStorage.clear();
            navigate("/");
          }}
          Btn2Name={"close"}
          Btn2Pressed={(value) => {
            setlogoutApp(false);
          }}
          DialogOpen={logoutApp}
        />
      </>
    );
  };

  return (
    <>
      <StyledRoot
        sx={{
          backgroundColor: "black",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={onOpenNav}
          style={{
            mr: 1,
            color: "#E4D0B5",
            display: { lg: "none" },
          }}
        >
          <Iconify width={30} icon="eva:menu-2-fill" />
        </IconButton>
        <IconButton
          onClick={() => {
            setlogoutApp(true);
          }}
          style={{
            mr: 1,
            color: "#E4D0B5",
            display: { lg: "none" },
          }}
        >
          <Iconify width={30} icon="ion:exit-outline" />
        </IconButton>
      </StyledRoot>
      <LogoutPopUp />
    </>
  );
}

//  {/* <NotificationsPopover />
//           <AccountPopover /> */}
// <Box
// sx={{
//   flexDirection: "row",
//   justifyContent: "space-between",
// }}
// >
// <IconButton
//   onClick={onOpenNav}
//   style={{
//     mr: 1,
//     color: "#E4D0B5",
//     display: { lg: "none" },
//   }}
// >
//   <Iconify width={30} icon="eva:menu-2-fill" />
// </IconButton>

// <IconButton
//   onClick={onOpenNav}
//   style={{
//     mr: 1,
//     color: "#E4D0B5",
//     display: { lg: "none" },
//   }}
// >
//   <Iconify width={30} icon="eva:menu-2-fill" />
// </IconButton>
// </Box>
