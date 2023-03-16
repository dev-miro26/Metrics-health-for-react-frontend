import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useLocation } from "react-router-dom";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = (props) => {
  const { children } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const [openNav, setOpenNav] = useState(true);

  useEffect(() => {
    if (openNav) {
      setOpenNav(true);
    }
  }, [pathname, openNav]);

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} onAction={props.onAction} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
