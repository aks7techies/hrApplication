import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./login.css";
import axios from 'axios';
import { TextField, Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
 const redirect = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email ID is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });
  
  const handleSubmit = async(values) => {
    // Handle form submission
   await axios.post('http://127.0.0.1:8000/api/login', {
      email: values.email,
      password: values.password,
    })
    .then(function (response) {
      if(response.status===200){
        sessionStorage.setItem('accessToken',response.data.access_token);
        sessionStorage.setItem('username',response.data.data.email);
        sessionStorage.setItem('userId',response.data.data.id);
        toast.success('Login Successfully.',{
          position:"top-right"
        });
       
        setTimeout(()=>{
         redirect('./form-fill');
       },1000)
        
  
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  
  };


  return (
    <>
     <ToastContainer />
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
                    <div className="text-end mb-3">
                      <Link
                        to=""
                        className=""
                        style={{ color: "#444", fontWeight: "500", fontSize: "16px" }}
                      >
                        Forget Your Password?
                      </Link>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <Button
                        variant="contained"
                        sx={{ width: "100%", background: "#199aca" }}
                        type="submit"
                        disabled={!isValid}
                      >
                        Login
                      </Button>
                    </div>
                    <div className="text-center mb-3">
                      <Link
                        to="/register"
                        className=""
                        style={{ fontWeight: "500", fontSize: "16px" }}
                      >
                        Don't have an Account / Create New Account
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

export default Login;
