import React, { useEffect } from "react";

import * as yup from "yup";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
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

import { apiUpdateMetricWage } from "../../actions/metrics";

const EditTrackDialogForBlood = (props) => {
  const dispatch = useDispatch();
  const { onClose, openEditMetricWageDialogForBlood, editedMetricWage } = props;
  const user = useSelector((state) => state.auth.user);

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
      fieldType: editedMetricWage?.fieldType,
      _id: editedMetricWage._id ? editedMetricWage._id : "",
      BPH: "",
      BPL: "",
      HR: "",
    },
    validateOnSubmit: true,
    validationSchema: validationNumber,

    onSubmit: (values) => {
      dispatch(
        apiUpdateMetricWage({
          _id: values._id,
          userId: user?._id,
          metricId: values._id,
          wage: values.BPH + "," + values.BPL + "," + values.HR,
        })
      );

      props.onClose();
    },
  });

  useEffect(() => {
    const kk = editedMetricWage?.wage?.split(",");
    formik.setValues({
      _id: editedMetricWage?._id,
      BPH: kk && kk[0],
      BPL: kk && kk[1],
      HR: kk && kk[2],
      fieldType: editedMetricWage?.fieldType,
    });
    // eslint-disable-next-line
  }, [editedMetricWage]);

  return (
    <BootstrapDialog
      open={openEditMetricWageDialogForBlood}
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      aria-describedby="customized-dialog-description"
      maxWidth={"sm"}
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <Card
          sx={{ pr: { sm: "16px", xs: "0px" }, pl: { sm: "16px", xs: "0px" } }}
        >
          <CardHeader
            subheader="The information can be saved"
            title={editedMetricWage.name}
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
                  <Box>
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
EditTrackDialogForBlood.propTypes = {
  onClose: PropTypes.func,
};

export default EditTrackDialogForBlood;
