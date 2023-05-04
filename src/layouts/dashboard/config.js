import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";

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

];
