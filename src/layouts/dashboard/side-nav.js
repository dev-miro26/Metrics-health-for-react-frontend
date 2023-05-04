import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery, IconButton
} from "@mui/material";
import { Scrollbar } from "../../components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import CloseIcon from '@mui/icons-material/Close';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
          {!lgUp &&
            <Box display="flex" justifyContent="flex-end" sx={{ position: "absolute", top: "20px", right: "15px" }}>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          }

          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            {/* <LogoIcon /> */}
            <img alt="Go to pro" src="/assets/logoIcon.svg" />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              mt: 1,
              p: "12px",
            }}
          >
            <Typography color="inherit" variant="subtitle1">
              Smart Metrics Logbook
            </Typography>

          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >

          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "240px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/assets/logo.svg" />
          </Box>

        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
