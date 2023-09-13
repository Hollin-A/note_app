import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  loginUser,
  clearError,
  userSelector,
} from "../features/user/userSlice";
import { themeSelector } from "../features/theme/themeSlice";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { blueGrey, red, grey } from "@mui/material/colors";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

const Signin = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [lightMode, setLightMode] = useState<boolean>(false);

  const selectedTheme = useAppSelector(themeSelector);

  useEffect(() => {
    setLightMode(selectedTheme.lightTheme);
  }, [selectedTheme]);

  const userDetails = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(userDetails.error);
  }, [userDetails]);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  function handleLogin(props: { email: string; password: string }) {
    const loggingUser = {
      email: props.email,
      password: props.password,
    };
    dispatch(loginUser(loggingUser));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: lightMode ? "white" : grey[900],
          paddingX: 3,
          borderRadius: "10px",
          width: "90%",
          maxWidth: "300px",
          paddingY: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            fontWeight: "600",
            textTransform: "uppercase",
            color: lightMode ? blueGrey[500] : "white",
            mb: 2,
          }}
        >
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="standard"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ mb: 4 }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Log in
          </Button>
        </form>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Typography sx={{ color: blueGrey[700] }}>
            First time here ?{" "}
          </Typography>
          <Link to="/register">
            <Typography sx={{ color: blueGrey[500], ml: 1 }}>
              Register
            </Typography>
          </Link>
        </Box>
        {error && (
          <Box
            sx={{
              padding: 1,
              border: `1px solid ${red[500]}`,
              backgroundColor: red[50],
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Typography sx={{ color: red[500], textTransform: "capitalize" }}>
              {error}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Signin;
