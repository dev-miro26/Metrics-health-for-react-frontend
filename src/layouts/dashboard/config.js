import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
// import CogIcon from "@heroicons/react/24/solid/CogIcon";
// import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
// import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
// import UserIcon from "@heroicons/react/24/solid/UserIcon";
// import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
// import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
// import XCircleIcon from "@heroicons/react/24/solid/XCircleIcon";
import ViewListIcon from "@mui/icons-material/ViewList";
import { SvgIcon } from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
export const items = [
  {
    title: "Dashboard",
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
        <DnsIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Metrics Group",
    path: "/group",
    icon: (
      <SvgIcon fontSize="small">
        <ViewListIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Tracked Metrcis List",
  //   path: "/track",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Settings",
  //   path: "/#",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
  // {
  //   title: "Account",
  //   path: "#",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserIcon />
  //     </SvgIcon>
  //   ),
  // },
];
