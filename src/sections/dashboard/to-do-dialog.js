import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import * as yup from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  InputAdornment,
  Unstable_Grid2 as Grid,
  SvgIcon,
} from "@mui/material";
import { Rating } from "@mui/material";
// import ConfirmDialog from "../../components/ConfirmModal";
import { HeartIcon } from "@heroicons/react/24/solid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

import { BootstrapDialog } from "../../components/BootstrapDialog";

import { apiAddMetricWage } from "../../actions/metrics";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f31212",
  },
  "& .MuiRating-iconHover": {
    color: "#ff5d02",
  },
});

const ToDoDialog = (props) => {
  const dispatch = useDispatch();
  const { onClose, open, selectedMetric } = props;

  // const [openDialog, setOpenDialog] = React.useState(false);
  const validationString = yup.object({
    metricValue: yup
      .string("Enter your metricValue")
      .required("metricValue is required"),
  });
  const validationNumber = yup.object({
    metricValue: yup
      .number("Metric Vaule must be number")
      .required("metricValue is required"),
  });

  const formik = useFormik({
    initialValues: {
      fieldType: selectedMetric?.fieldType,
      _id: selectedMetric._id ? selectedMetric._id : "",
      metricValue: "",
    },
    validateOnSubmit: true,
    validationSchema:
      selectedMetric.fieldType === "text" ? validationString : validationNumber,

    onSubmit: (values) => {
      dispatch(
        apiAddMetricWage({
          fieldType: values.fieldType,
          metricId: values._id,
          metricValue: values.metricValue,
        })
      );

      props.onClose();
    },
  });
  useEffect(() => {
    formik.setValues({
      _id: selectedMetric._id,
      metricValue: "",
      fieldType: selectedMetric.fieldType,
    });
    // eslint-disable-next-line
  }, [selectedMetric]);
  return (
    <BootstrapDialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      aria-describedby="customized-dialog-description"
      maxWidth={"sm"}
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            subheader="The information can be saved"
            title={selectedMetric.name}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Box display={"flex"} justifyContent="center">
                {selectedMetric.fieldType === "number" ||
                selectedMetric.fieldType === "text" ? (
                  <TextField
                    autoFocus
                    name="metricValue"
                    fullWidth
                    label="Metric Value"
                    type={
                      selectedMetric.fieldType === "text" ? "text" : "number"
                    }
                    error={
                      formik.touched.metricValue &&
                      Boolean(formik.errors.metricValue)
                    }
                    helperText={
                      formik.touched.metricValue && formik.errors.metricValue
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.metricValue}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {selectedMetric.prefix}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {selectedMetric.postfix}
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : null}

                {selectedMetric.fieldType === "bloodPressure" ? (
                  <Box
                    display={"flex"}
                    sm={{ justifyContent: "space-between" }}
                  >
                    <Box pr={2} pb={2}>
                      <TextField
                        autoFocus
                        name="BPH"
                        fullWidth
                        label="Diastolic "
                        onBlur={formik.handleBlur}
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.BPH}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                sx={{
                                  color: "success.main",
                                }}
                              >
                                <MonitorHeartIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box pr={2} pb={2}>
                      <TextField
                        name="BPL"
                        value={formik.values.BPL}
                        fullWidth
                        type="number"
                        label="Systolic"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                sx={{
                                  color: "info.main",
                                }}
                              >
                                <MonitorHeartIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box pr={2} pb={2}>
                      <TextField
                        name="HR"
                        value={formik.values.HR}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        type="number"
                        label="Heart Rate"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                sx={{
                                  color: "error.main",
                                }}
                              >
                                <HeartIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                ) : null}
                {selectedMetric.fieldType === "5rating" ||
                selectedMetric.fieldType === "10rating" ? (
                  <Box display={"flex"} justifyContent="center">
                    <StyledRating
                      name="metricValue"
                      defaultValue={0}
                      max={selectedMetric.fieldType === "5rating" ? 5 : 10}
                      type="number"
                      precision={1}
                      onChange={formik.handleChange}
                      value={parseInt(formik.values.metricValue)}
                      icon={<FavoriteIcon fontSize="large" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="large" />}
                    />
                  </Box>
                ) : null}
              </Box>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              Save
            </Button>

            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </CardActions>
        </Card>
        {/* <ConfirmDialog
          openDialog={openDialog}
          title="Confirm"
          content="Are you sure save this metric value?"
          onCancel={(e) => setOpenDialog(false)}
          onOK={(e) => {
            dispatch(
              apiAddMetricWage({
                metricId: selectedMetric._id,
                metricValue: formik.values.metricValue,
              })
            );
            setOpenDialog(false);
            props.onClose();
          }}
        /> */}
      </form>
    </BootstrapDialog>
  );
};
ToDoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default ToDoDialog;
