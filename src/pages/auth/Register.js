import React from "react";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  // InputAdornment,
  // SvgIcon,
} from "@mui/material";
import PropTypes from "prop-types";
import { Layout as AuthLayout } from "../../layouts/auth/layout";

// import PropTypes from "prop-types";

import { apiRegister } from "../../actions/auth";
// import AtSymbolIcon from "@heroicons/react/24/solid/AtSymbolIcon";
// import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
// import UserIcon from "@heroicons/react/24/solid/UserIcon";

const Register = ({ apiRegister, isAuthenticated }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      name: Yup.string().max(255).required("Name is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      apiRegister({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Register</Typography>
              <Typography color="text.secondary" variant="body2">
                Already have an account? &nbsp;
                <Link
                  component={RouterLink}
                  to="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SvgIcon>
                  //         <UserIcon />
                  //       </SvgIcon>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SvgIcon>
                  //         <AtSymbolIcon />
                  //       </SvgIcon>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SvgIcon>
                  //         <LockClosedIcon />
                  //       </SvgIcon>
                  //     </InputAdornment>
                  //   ),
                  // }}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

Register.propTypes = {
  // register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { apiRegister })(Register);
