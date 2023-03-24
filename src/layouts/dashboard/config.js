import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
// import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
// import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
// import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Metrics",
    path: "/metrics",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Metrics Group",
    path: "/group",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Tracked Metrcis List",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/#",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "#",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
];
