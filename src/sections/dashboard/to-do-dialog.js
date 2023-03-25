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
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { BootstrapDialog } from "../../components/BootstrapDialog";
import { Rating } from "@mui/material";
// import ConfirmDialog from "../../components/ConfirmModal";
import { apiAddMetricWage } from "../../actions/metrics";

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
      _id: selectedMetric._id ? selectedMetric._id : "",
      metricValue: "",
    },
    validateOnSubmit: true,
    validationSchema:
      selectedMetric.fieldType === "text" ? validationString : validationNumber,

    onSubmit: (values) => {
      // if (values._id) {
      //   setOpenDialog(true);
      // } else {
      //   props.onClose();
      // }
      dispatch(
        apiAddMetricWage({
          metricId: selectedMetric._id,
          metricValue: values.metricValue,
        })
      );
      props.onClose();
    },
  });

  useEffect(() => {
    formik.setValues({ _id: selectedMetric._id, metricValue: "" });
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
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <Box display={"flex"} justifyContent="center">
                    {selectedMetric.name !== "Mood" ? (
                      <TextField
                        autoFocus
                        name="metricValue"
                        fullWidth
                        label="Metric Value"
                        type={"text"}
                        error={
                          formik.touched.metricValue &&
                          Boolean(formik.errors.metricValue)
                        }
                        helperText={
                          formik.touched.metricValue &&
                          formik.errors.metricValue
                        }
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
                    ) : (
                      <Rating
                        name="metricValue"
                        defaultValue={0}
                        max={10}
                        type="number"
                        precision={1}
                        onChange={formik.handleChange}
                        value={parseInt(formik.values.metricValue)}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
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
