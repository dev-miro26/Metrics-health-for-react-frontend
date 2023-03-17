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
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { BootstrapDialog } from "../../components/BootstrapDialog";

const fieldTypes = [
  {
    value: "number",
    label: "Number",
  },
  {
    value: "text",
    label: "Text",
  },
  {
    value: "textArea",
    label: "TextArea",
  },
  {
    value: "checkBox",
    label: "CheckBox",
  },
  {
    value: "radioButton",
    label: "RadioButton",
  },
  {
    value: "datetime",
    label: "DateTime",
  },
  {
    value: "predefinedTemplates",
    label: "Predefined Templates",
  },
];

const chartTypes = [
  {
    value: "line",
    label: "Line",
  },
  {
    value: "bar",
    label: "Bar",
  },
  {
    value: "pie",
    label: "Pie",
  },
];

const statuses = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
  {
    value: "fixed",
    label: "Fixed",
  },
];

const timings = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "eachday",
    label: "Eachday",
  },
  {
    value: "everytime",
    label: "Everytime",
  },
];

export const MetricsDialog = (props) => {
  const { onClose, open } = props;
  const initialValues = {
    name: "",
    description: "",
    fieldType: fieldTypes[0].value,
    prefix: "",
    postfix: "",
    chartType: chartTypes[0].value,
    status: statuses[0].value,
    order: "",
    timing: timings[0].value,
  };
  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      props.onAddMetrics(values);
      values = initialValues;
    },
  });

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      aria-describedby="customized-dialog-description"
    >
      <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader
            subheader="The information can be saved"
            title="Create/Edit Metrics"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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
                    SelectProps={{ native: true }}
                    onBlur={formik.handleBlur}
                    value={formik.values.fieldType}
                  >
                    {fieldTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Prefix"
                    name="prefix"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.prefix}
                  />
                </Grid>
                <Grid xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Postfix"
                    name="postfix"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
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
                    {chartTypes.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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
                    onBlur={formik.handleBlur}
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.status}
                  >
                    {statuses.map((option) => (
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    {timings.map((option) => (
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
            <Button variant="contained" type="submit" onClick={onClose}>
              Save metrics
            </Button>
          </CardActions>
        </Card>
      </form>
    </BootstrapDialog>
  );
};

MetricsDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
