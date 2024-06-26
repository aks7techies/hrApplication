import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../login/login.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email ID is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is Required'),
});

const handleSubmit = (values) => {
  // Handle form submission
  console.log(values);
};

const Registration = () => {
  return (
    <>
      <section>
        <div className="main-Login">
          <div className="login-card">
            <h5 className="card-title text-center">
              <img
                src="../../QCI-Logo.png"
                alt="Please wait..."
                style={{ height: "50%", width: "50%" }}
              />
            </h5>

            <div className="card-body py-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, setFieldTouched, touched, errors, isValid }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        name="email"
                        as={TextField}
                        sx={{ width: "100%", background: "#ffff" }}
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        className="mb-3 rounded"
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        onBlur={() => setFieldTouched("email")}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="password"
                        as={TextField}
                        sx={{ width: "100%", background: "#ffff" }}
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        className="mb-3 rounded"
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        onBlur={() => setFieldTouched("password")}
                        onChange={(e) => setFieldValue("password", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        name="confirmPassword"
                        as={TextField}
                        sx={{ width: "100%", background: "#ffff" }}
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        className="mb-3 rounded"
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        onBlur={() => setFieldTouched("confirmPassword")}
                        onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                      />
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <Button
                        variant="contained"
                        sx={{ width: "100%", background: "#199aca" }}
                        type="submit"
                        disabled={!isValid}
                      >
                        Register
                      </Button>
                    </div>
                    <div className="text-center mb-3">
                      <Link
                        to="/"
                        className=""
                        style={{ fontWeight: "500", fontSize: "16px" }}
                      >
                        Already Registered / Login
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
