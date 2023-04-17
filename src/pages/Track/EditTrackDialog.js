import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
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
import { Rating } from "@mui/material";
// import ConfirmDialog from "../../components/ConfirmModal";
import { HeartIcon } from "@heroicons/react/24/solid";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

import { BootstrapDialog } from "../../components/BootstrapDialog";

import { apiUpdateMetricWage } from "../../actions/metrics";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#f31212",
  },
  "& .MuiRating-iconHover": {
    color: "#ff5d02",
  },
});

const EditWageDialog = (props) => {
  const dispatch = useDispatch();
  const { onClose, openEditMetricWageDialog, editedMetricWage } = props;
  const user = useSelector((state) => state.auth.user);
  const metrics = useSelector((state) => state.metrics.metrics);
  const [fieldType, setFieldType] = React.useState("");
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
      fieldType: editedMetricWage?.fieldType,
      _id: editedMetricWage._id ? editedMetricWage._id : "",
      metricValue: "",
    },
    validateOnSubmit: true,
    validationSchema:
      fieldType === "text" ? validationString : validationNumber,

    onSubmit: (values) => {
      dispatch(
        apiUpdateMetricWage({
          _id: values?._id,
          userId: user?._id,
          metricId: values._id,
          wage: values.metricValue,
        })
      );

      props.onClose();
    },
  });

  useEffect(() => {
    const fieldType = metrics.filter(
      (metric) => metric?._id === editedMetricWage.metricsId
    )[0]?.fieldType;
    setFieldType(fieldType);
    formik.setValues({
      _id: editedMetricWage._id,
      metricValue: editedMetricWage.wage,
      fieldType: fieldType,
    });
    // eslint-disable-next-line
  }, [editedMetricWage]);
  return (
    <BootstrapDialog
      open={openEditMetricWageDialog}
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
            title={editedMetricWage.name}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Box display={"flex"} justifyContent="center">
                {fieldType === "number" || fieldType === "text" ? (
                  <TextField
                    autoFocus
                    name="metricValue"
                    fullWidth
                    label="Metric Value"
                    type={fieldType === "text" ? "text" : "number"}
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
                          {editedMetricWage.prefix}
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          {editedMetricWage.postfix}
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : null}

                {fieldType === "bloodPressure" ? (
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
                {fieldType === "5rating" || fieldType === "10rating" ? (
                  <Box display={"flex"} justifyContent="center">
                    <StyledRating
                      name="metricValue"
                      defaultValue={0}
                      max={fieldType === "5rating" ? 5 : 10}
                      type="number"
                      precision={1}
                      onChange={formik.handleChange}
                      value={parseInt(formik.values.metricValue)}
                      icon={
                        <FavoriteIcon
                          sx={{ fontSize: { xs: "24px", sm: "32px" } }}
                        />
                      }
                      emptyIcon={
                        <FavoriteBorderIcon
                          sx={{ fontSize: { xs: "24px", sm: "32px" } }}
                        />
                      }
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
                metricId: editedMetricWage._id,
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
EditWageDialog.propTypes = {
  onClose: PropTypes.func,
  openEditMetricWageDialog: PropTypes.bool.isRequired,
};

export default EditWageDialog;
