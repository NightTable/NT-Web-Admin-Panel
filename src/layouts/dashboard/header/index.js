import PropTypes from "prop-types";
// @mui
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
  const navigate = useNavigate();

  return (
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
            onClick={()=>{
              localStorage.clear()
              navigate('/')
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