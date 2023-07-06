import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Drawer } from "@mui/material";
// mock
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../features/logo";
import Scrollbar from "../../../component/scrollbar";
import NavSection from "../../../features/nav-section";
//
import { navConfig, navAdminConfig } from "./config";
import { LocalStorageKey } from "src/utils/localStorage/keys";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const userData = localStorage.getItem(LocalStorageKey.USER_DATA);
  const userDataParsing = JSON.parse(userData);
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        backgroundColor: "black",
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "inline-flex",
          backgroundColor: "black",
        }}
      >
        <Logo />
      </Box>
      <NavSection
        data={userDataParsing.role === "godFather" ? navAdminConfig : navConfig}
      />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        backgroundColor: "black",
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "black",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH, bgcolor: "black" },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
