import React from "react";
// import { useSelector } from "react-redux";
import {
  Card,
  Typography,
  // Tooltip,
  IconButton,
  SvgIcon,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  // PencilIcon,
  // TrashIcon,
  EllipsisVerticalIcon as MoreIcon,
} from "@heroicons/react/24/solid";
import { Box } from "@mui/system";

const GroupCard = ({ group, handleClickEdit, setDeletedId, setOpenDialog }) => {
  const moreRef = React.useRef(null);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  return (
    <Card style={{ outline: "solid 1px #e2e2e2", paddinig: "16px" }}>
      <Box display={"flex"} p={2} justifyContent="space-between">
        <Typography color="inherit" variant="h4">
          {group.name}
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          color="inherit"
          edge="end"
          onClick={handleMenuOpen}
          ref={moreRef}
        >
          <SvgIcon fontSize="small">
            <MoreIcon />
          </SvgIcon>
        </IconButton>
      </Box>
      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleClickEdit(group);
            handleMenuClose();
          }}
        >
          {/* <Tooltip title="delete">
            <IconButton>
              <SvgIcon fontSize="small">
                <PencilIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip> */}
          <span>Edit</span>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            setDeletedId(group._id);
            handleMenuClose();
            setOpenDialog(true);
          }}
        >
          {/* <Tooltip title="delete">
            <IconButton>
              <SvgIcon fontSize="small">
                <TrashIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip> */}
          <span>Delete</span>
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default GroupCard;
