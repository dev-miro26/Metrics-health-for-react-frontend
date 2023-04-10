import React, { useEffect } from "react";

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
  SvgIcon,
} from "@mui/material";

// import ConfirmDialog from "../../components/ConfirmModal";
import { HeartIcon } from "@heroicons/react/24/solid";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

import { BootstrapDialog } from "../../components/BootstrapDialog";

import { apiAddMetricWage } from "../../actions/metrics";

const ToDoForBloodPressure = (props) => {
  const dispatch = useDispatch();
  const { onClose, open, selectedMetric } = props;

  // const [openDialog, setOpenDialog] = React.useState(false);

  const validationNumber = yup.object({
    BPH: yup
      .number("Metric Vaule must be number")
      .required("metricValue is required"),
    BPL: yup
      .number("Metric Vaule must be number")
      .required("metricValue is required"),
    HR: yup
      .number("Metric Vaule must be number")
      .required("metricValue is required"),
  });

  const formik = useFormik({
    initialValues: {
      fieldType: selectedMetric?.fieldType,
      _id: selectedMetric._id ? selectedMetric._id : "",
      BPH: "",
      BPL: "",
      HR: "",
    },
    validateOnSubmit: true,
    validationSchema: validationNumber,

    onSubmit: (values) => {
      dispatch(
        apiAddMetricWage({
          fieldType: values.fieldType,
          metricId: values._id,
          metricValue: values.BPH + "," + values.BPL + "," + values.HR,
        })
      );

      props.onClose();
    },
  });
  useEffect(() => {
    formik.setValues({
      _id: selectedMetric._id,
      BPH: "",
      BPL: "",
      HR: "",
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
                <Box
                  display={"flex"}
                  md={{ justifyContent: "space-between" }}
                  // sx={{ flexDirection: "column" }}
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
      </form>
    </BootstrapDialog>
  );
};
ToDoForBloodPressure.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default ToDoForBloodPressure;
