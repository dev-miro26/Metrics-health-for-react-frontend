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
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { BootstrapDialog } from "../../components/BootstrapDialog";
import ConfirmDialog from "../../components/ConfirmModal";
const ToDoDialog = (props) => {
  const { onClose, open, selectedMetric } = props;
  const [openDialog, setOpenDialog] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      _id: selectedMetric._id ? selectedMetric._id : "",
      value: "",
    },

    onSubmit: (values) => {
      if (values._id) {
        setOpenDialog(true);
      } else {
        props.onAddMetric(values);
        props.onClose();
      }
    },
  });

  useEffect(() => {
    formik.setValues({ _id: selectedMetric._id, value: "" });
  }, [selectedMetric]);
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
            title={selectedMetric.name}
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <Box display={"flex"} justifyContent="center">
                    <TextField
                      name="value"
                      fullWidth
                      label="Value"
                      onChange={formik.handleChange}
                      value={formik.values.value}
                    />
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
ToDoDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default ToDoDialog;
