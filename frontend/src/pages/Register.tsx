import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  registerUser,
  clearError,
  userSelector,
} from "../features/user/userSlice";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { blueGrey, red } from "@mui/material/colors";

const validationSchema = yup.object({
  username: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup
    .string()
    .min(8, "Your password is too short.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one numeral, and one symbol."
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

const Register = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const userDetails = useAppSelector(userSelector);

  const dispatch = useAppDispatch();
  useEffect(() => {
    setError(userDetails.error);
  }, [userDetails]);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  function handleRegister(props: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    const registeringUser = {
      username: props.username,
      email: props.email,
      password: props.password,
    };
    dispatch(registerUser(registeringUser));
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleRegister(values);
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
          backgroundColor: "white",
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
            color: blueGrey[500],
            mb: 2,
          }}
        >
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="User Name"
            variant="standard"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={{ mb: 2 }}
          />
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="standard"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{ mb: 4 }}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Register
          </Button>
        </form>
        <Box sx={{ display: "flex", mt: 2 }}>
          <Typography sx={{ color: blueGrey[700] }}>
            Already have an account ?{" "}
          </Typography>
          <Link to="/sign-in">
            <Typography sx={{ color: blueGrey[500], ml: 1 }}>
              Sign in
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

export default Register;
