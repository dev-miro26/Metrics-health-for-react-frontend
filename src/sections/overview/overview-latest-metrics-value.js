import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import EllipsisVerticalIcon from "@heroicons/react/24/solid/EllipsisVerticalIcon";
import {
  Menu,
  Card,
  List,
  Avatar,
  Button,
  SvgIcon,
  Divider,
  ListItem,
  MenuItem,
  CardHeader,
  IconButton,
  CardActions,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import { apiDeleteMetricWageById } from "../../actions/metrics";
import ConfirmDialog from "../../components/ConfirmModal";
export const OverviewLatestMetricsValue = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lastestWages = [], metrics, sx } = props;
  const [deletedMetricWageId, setDeleteMetricWageId] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onOK = () => {
    dispatch(apiDeleteMetricWageById(deletedMetricWageId));
    setOpenDialog(false);
    handleClose();
  };
  return (
    <>
      <Card sx={sx}>
        <CardHeader title="Latest Metrics" />
        <List>
          {lastestWages.map((wage, index) => {
            const hasDivider = index < lastestWages.length - 1;
            const ago = formatDistanceToNow(new Date(wage.updatedAt).getTime());

            return (
              <ListItem divider={hasDivider} key={wage._id}>
                <ListItemAvatar style={{ paddingRight: "8px" }}>
                  <Avatar
                    sx={{
                      backgroundColor: "success.main",
                      height: 56,
                      width: 56,
                    }}
                  >
                    <SvgIcon>
                      <ClockIcon />
                    </SvgIcon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    metrics.filter((metric) => metric._id === wage.metricsId)[0]
                      .name
                  }
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={`Updated ${ago} ago`}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <IconButton edge="end" onClick={handleClick}>
                  <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon>
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setDeleteMetricWageId(wage._id);
                      setOpenDialog(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                </Menu>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            color="inherit"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowRightIcon />
              </SvgIcon>
            }
            size="small"
            variant="text"
            onClick={(e) => {
              navigate("/metrics/viewallvalues");
            }}
          >
            View all
          </Button>
        </CardActions>
      </Card>
      <ConfirmDialog
        title="Confirm"
        content="Are you sure want to delete this metrics value?"
        onCancel={(e) => {
          setOpenDialog(false);
        }}
        onOK={onOK}
        openDialog={openDialog}
      />
    </>
  );
};

OverviewLatestMetricsValue.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
};
