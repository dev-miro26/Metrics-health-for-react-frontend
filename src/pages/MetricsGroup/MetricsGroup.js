import React from "react";

import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Tooltip,
  Container,
  Divider,
  Typography,
  Card,
  Box,
  Avatar,
  SvgIcon,
} from "@mui/material";
import { SeverityPill } from "../../components/severity-pill";
import { ClockIcon } from "@heroicons/react/24/solid";
import GroupCard from "../../sections/group/groupCard";
import { Layout as DashboardLayout } from "../../layouts/dashboard/layout";
import { apiLogout } from "../../actions/auth";
import {
  apiAddGroup,
  apiDeleteGroupById,
  apiGetGroupsByUserId,
  apiUpdateGroup,
} from "../../actions/group";
import { apiGetMetricsByUserId } from "../../actions/metrics";
import ConfirmDialog from "../../components/ConfirmModal";
import { toast } from "react-toastify";

const MetricsGroup = ({ apiLogout }) => {
  React.useEffect(() => {
    dispatch(apiGetGroupsByUserId());
    dispatch(apiGetMetricsByUserId());
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups);
  const metrics = useSelector((state) => state.metrics.metrics);
  const initialValues = { _id: "", userId: "", name: "" };
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editGroup, setEditGroup] = React.useState({ ...initialValues });
  const [deletedId, setDeletedId] = React.useState("");
  const [groupName, setGroupName] = React.useState("");

  const statusMap = {
    active: "success",
    inactive: "warning",
    fixed: "error",
  };
  const [list1, setList1] = React.useState([]);
  const [list2, setList2] = React.useState([...metrics]);
  const handleClickEdit = (group) => {
    const savedGroups = group.contents.map((content) => {
      return metrics?.filter((metric) => metric._id === content)[0];
    });
    const remainGroup = metrics?.filter(
      (metric) => !group.contents.includes(metric._id)
    );

    setList1(savedGroups);
    setList2(remainGroup);
    setEditGroup({ _id: group._id, name: group.name, userId: group.userId });
    setGroupName(group.name);
    console.log(
      { _id: group._id, name: group.name, userId: group.userId },
      editGroup
    );
  };

  const onSubmit = () => {
    if (groupName === "") toast.error("You must input Group name.");
    else {
      if (editGroup._id) {
        setOpenDialog(true);
      } else {
        dispatch(
          apiAddGroup({
            _id: "",
            name: groupName,
            contents: list1 && list1.map((list) => list?._id),
          })
        );
        setEditGroup(initialValues);
        setList1([]);
        setList2(metrics ? [...metrics] : []);

        setGroupName("");
      }
    }
  };
  const onDelete = () => {
    dispatch(apiDeleteGroupById(deletedId));
    setDeletedId("");
    setOpenDialog(false);
  };
  const onUpdate = () => {
    dispatch(
      apiUpdateGroup({
        _id: editGroup._id,
        name: groupName,
        contents: list1 && list1.map((list) => list._id),
      })
    );
    setEditGroup(initialValues);
    setGroupName("");
    setList1([]);
    setList2(metrics ? [...metrics] : []);

    setOpenDialog(false);
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceList = result.source.droppableId;
    const destinationList = result.destination.droppableId;

    if (sourceList === destinationList) {
      // const newItems = [...list1];
      // const [removed] = newItems.splice(result.source.index, 1);
      // newItems.splice(result.destination.index, 0, removed);
      // if (sourceList === "list1") {
      //   setList1(newItems);
      // } else {
      //   setList2(newItems);
      // }
    } else {
      const sourceListItems = sourceList === "list1" ? [...list1] : [...list2];
      const destinationListItems =
        destinationList === "list1"
          ? [...list1, sourceListItems[result.source.index]]
          : [...list2, sourceListItems[result.source.index]];

      if (sourceList === "list1") {
        setList1(
          sourceListItems &&
            sourceListItems?.filter((_, index) => index !== result.source.index)
        );
        setList2(destinationListItems);
      } else {
        setList2(
          sourceListItems &&
            sourceListItems?.filter((_, index) => index !== result.source.index)
        );
        setList1(destinationListItems);
      }
    }
  };

  return (
    <DashboardLayout onAction={apiLogout}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
              <Paper
                sx={{
                  padding: "8px",

                  outline: "solid 1px #e2e2e2",
                  minHeight: { sm: "620px" },
                  overflowY: "auto",
                  border: "solid 1px #e2e2e2",
                }}
              >
                <Grid container spacing={2}>
                  {groups &&
                    groups.map((group, index) => (
                      <Grid item md={12} sm={12} xs={12} key={index}>
                        <Box key={index} mb={1}>
                          <GroupCard
                            group={group}
                            handleClickEdit={(e) => handleClickEdit(group)}
                            setDeletedId={setDeletedId}
                            setOpenDialog={setOpenDialog}
                          ></GroupCard>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
              <Paper style={{ padding: "16px" }}>
                <Box display="flex" mb={2}>
                  <Box style={{ width: "55%" }}>
                    <TextField
                      fullWidth
                      label="New Group Name"
                      name="name"
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      value={groupName}
                    />
                  </Box>
                  <Box style={{ width: "45%" }} display="flex" pl={1}>
                    <Tooltip title="add group">
                      <Button variant="outlined" onClick={onSubmit}>
                        {editGroup._id ? "Save" : "Add"}
                      </Button>
                    </Tooltip>
                    {editGroup._id ? (
                      <Tooltip title="cancel edit">
                        <Button
                          variant="outlined"
                          onClick={(e) => {
                            setList1([]);
                            setList2(metrics ? [...metrics] : []);
                            setEditGroup(initialValues);
                            setGroupName("");
                          }}
                          style={{ marginLeft: "8px" }}
                        >
                          Cancel
                        </Button>
                      </Tooltip>
                    ) : null}
                  </Box>
                </Box>
                <Divider variant="middle" />
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Box display={"flex"} mt={2}>
                    <Grid container spacing={2}>
                      <Grid item md={7} sm={6} xs={6}>
                        <Box
                          style={{
                            border: "solid 1px #e2e2e2",
                            borderRadius: "4px",
                            minHeight: "500px",
                            overflowY: "auto",
                          }}
                        >
                          <Droppable droppableId="list1">
                            {(provided) => (
                              <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{ marginBottom: 2 }}
                              >
                                <Box mb={2} mt={2}>
                                  <Typography variant="h4" textAlign={"center"}>
                                    Group
                                  </Typography>
                                </Box>
                                <Divider style={{ marginBottom: "16px" }} />
                                <Box
                                  style={{
                                    maxHeight: "420px",
                                    minHeight: "400px",
                                    overflowY: "auto",
                                    paddingTop: "16px",
                                  }}
                                >
                                  {list1 &&
                                    list1.map((item, index) => (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <Tooltip
                                            title={
                                              item?.description
                                                ? item?.description
                                                : "There is no any description"
                                            }
                                          >
                                            <Box pr={2} pl={2} pb={1}>
                                              <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                  userSelect: "none",

                                                  minHeight: "50px",
                                                  backgroundColor: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                                style={{
                                                  outline: "solid 1px #e2e2e2",
                                                  padding: "16px",
                                                }}
                                              >
                                                <Box
                                                  display={"flex"}
                                                  alignItems={"center"}
                                                >
                                                  <Avatar
                                                    sx={{
                                                      backgroundColor:
                                                        "error.main",
                                                      height: {
                                                        sm: 36,
                                                        xs: 24,
                                                      },
                                                      width: { sm: 36, xs: 24 },
                                                      display: {
                                                        xs: "none",
                                                        sm: "flex",
                                                      },
                                                    }}
                                                  >
                                                    <SvgIcon>
                                                      <ClockIcon />
                                                    </SvgIcon>
                                                  </Avatar>
                                                  <Typography
                                                    variant="h5"
                                                    sx={{ pl: 1 }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Box>
                                                <Box
                                                  display={"flex"}
                                                  justifyContent="space-between"
                                                  mt={1}
                                                >
                                                  <Typography
                                                    sx={{
                                                      overflowX: {
                                                        xs: "hidden",
                                                      },
                                                    }}
                                                  >
                                                    {item.description}
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      display: {
                                                        xs: "none",
                                                        sm: "block",
                                                      },
                                                    }}
                                                  >
                                                    <SeverityPill
                                                      color={
                                                        statusMap[item.status]
                                                      }
                                                    >
                                                      {item.status}
                                                    </SeverityPill>
                                                  </Typography>
                                                </Box>
                                              </Card>
                                            </Box>
                                          </Tooltip>
                                        )}
                                      </Draggable>
                                    ))}
                                </Box>
                                {provided.placeholder}
                              </Box>
                            )}
                          </Droppable>
                        </Box>
                      </Grid>
                      <Grid item md={5} sm={6} xs={6}>
                        <Box
                          style={{
                            border: "solid 1px #e2e2e2",
                            borderRadius: "4px",
                            minHeight: "500px",
                          }}
                        >
                          <Droppable droppableId="list2">
                            {(provided) => (
                              <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                sx={{ marginBottom: 2 }}
                              >
                                <Box mb={2} mt={2}>
                                  <Typography variant="h4" textAlign={"center"}>
                                    Metrics Lists
                                  </Typography>
                                </Box>
                                <Divider />
                                <Box
                                  style={{
                                    maxHeight: "420px",
                                    minHeight: "400px",
                                    overflowY: "auto",
                                    paddingTop: "16px",
                                  }}
                                >
                                  {list2 &&
                                    list2.map((item, index) => (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <Tooltip
                                            title={
                                              item?.description
                                                ? item?.description
                                                : "There is no any description"
                                            }
                                          >
                                            <Box pr={2} pl={2} pb={1}>
                                              <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                  userSelect: "none",

                                                  minHeight: "50px",
                                                  backgroundColor: "white",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                                style={{
                                                  outline: "solid 1px #e2e2e2",
                                                  padding: "16px",
                                                }}
                                              >
                                                <Box
                                                  display={"flex"}
                                                  alignItems={"center"}
                                                >
                                                  <Avatar
                                                    sx={{
                                                      backgroundColor:
                                                        "success.main",
                                                      height: {
                                                        sm: 36,
                                                        xs: 24,
                                                      },
                                                      width: { sm: 36, xs: 24 },
                                                      display: {
                                                        xs: "none",
                                                        sm: "flex",
                                                      },
                                                    }}
                                                  >
                                                    <SvgIcon>
                                                      <ClockIcon />
                                                    </SvgIcon>
                                                  </Avatar>
                                                  <Typography
                                                    variant="h5"
                                                    sx={{ pl: 1 }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                </Box>
                                                <Box
                                                  display={"flex"}
                                                  justifyContent="space-between"
                                                  mt={1}
                                                >
                                                  <Typography>
                                                    {item.description}
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      display: {
                                                        xs: "none",
                                                        sm: "block",
                                                      },
                                                    }}
                                                  >
                                                    <SeverityPill
                                                      color={
                                                        statusMap[item.status]
                                                      }
                                                    >
                                                      {item.status}
                                                    </SeverityPill>
                                                  </Typography>
                                                </Box>
                                              </Card>
                                            </Box>
                                          </Tooltip>
                                        )}
                                      </Draggable>
                                    ))}
                                  {provided.placeholder}
                                </Box>
                              </Box>
                            )}
                          </Droppable>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </DragDropContext>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <ConfirmDialog
        title="Confirm"
        content={
          editGroup._id
            ? "Are you sure want to update this Metrics Group?"
            : "Are you sure want to delete this Metrics Group?"
        }
        onOK={editGroup._id ? onUpdate : onDelete}
        onCancel={(e) => setOpenDialog(false)}
        openDialog={openDialog}
      />
    </DashboardLayout>
  );
};
MetricsGroup.propTypes = {
  apiLogout: PropTypes.func.isRequired,
  metrics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metrics: state.metrics,
});

export default connect(mapStateToProps, { apiLogout })(MetricsGroup);
