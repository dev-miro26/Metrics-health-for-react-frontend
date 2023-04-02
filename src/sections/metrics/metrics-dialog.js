import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { BootstrapDialog } from "../../components/BootstrapDialog";
import ConfirmDialog from "../../components/ConfirmModal";
import { toast } from "react-toastify";

export const MetricsDialog = (props) => {
  const { onClose, open, timings, fieldTypes, chartTypes, statuses } = props;
  const [openDialog, setOpenDialog] = React.useState(false);

  const formik = useFormik({
    initialValues: props.initialValues,

    onSubmit: (values) => {
      if (values.name === "") {
        toast.error("You must input Metric name!");
      } else {
        if (values._id) {
          setOpenDialog(true);
        } else {
          props.onAddMetric(values);
          props.onClose();
        }
      }
    },
  });

  useEffect(() => {
    props.initialValues && formik.setValues(props.initialValues);
    // eslint-disable-next-line
  }, [props.initialValues]); // eslint-disable-next-line

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      aria-describedby="customized-dialog-description"
    >
      <form noValidate onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            subheader="The information can be saved"
            title={`${props.initialValues._id ? "Edit" : "Create"} Metrics`}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Select FieldType"
                    name="fieldType"
                    onChange={formik.handleChange}
                    select
                    onBlur={formik.handleBlur}
                    SelectProps={{ native: true }}
                    value={formik.values.fieldType}
                  >
                    {fieldTypes &&
                      fieldTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label && option.label}
                        </option>
                      ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Prefix"
                    name="prefix"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.prefix}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Postfix"
                    name="postfix"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postfix}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Select ChartType"
                    name="chartType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.chartType}
                  >
                    {chartTypes &&
                      chartTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label && option.label}
                        </option>
                      ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Select Status"
                    name="status"
                    onChange={formik.handleChange}
                    select
                    onBlur={formik.handleBlur}
                    SelectProps={{ native: true }}
                    value={formik.values.status}
                  >
                    {statuses &&
                      statuses.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Order"
                    name="order"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.order}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Select Timing"
                    name="timing"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.timing}
                  >
                    {timings &&
                      timings.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit">
              {props.initialValues._id ? "Save metrics" : "Add metrics"}
            </Button>

            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </CardActions>
        </Card>
        <ConfirmDialog
          openDialog={openDialog}
          title="Confirm"
          content="Are you sure update this Metric?"
          onCancel={(e) => setOpenDialog(false)}
          onOK={(e) => {
            props.onUpdateMetric(formik.values);
            setOpenDialog(false);
            props.onClose();
          }}
        />
      </form>
    </BootstrapDialog>
  );
};

MetricsDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
