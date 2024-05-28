import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../layouts/header/Header";
import Progress from "../../layouts/stepper/Progress";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "../pages/allPages.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../radux/slices/UpdateStagesStepper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialValues = {
  designation: "",
  employerName: "",
  addressOfTheEmployer: "",
  PayscalePayband: "",
  GrossSalary: "",
  NatureofworkRoles: "",
  WorkingFrom: null,
  WorkingTo: null,
  uploadedFileName: "",
};

// Validation schema for form validation
const validationSchema = Yup.object({
  designation: Yup.string().required("Required"),
  employerName: Yup.string().required("Required"),
  addressOfTheEmployer: Yup.string().required("Required"),
  PayscalePayband: Yup.string().required("Required"),
  GrossSalary: Yup.string().required("Required"),
  NatureofworkRoles: Yup.string().required("Required"),
});

const WorkExperience = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // State to hold the data for the table
  const [tableData, setTableData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDataSubmitted , setIsDataSubmitted] = useState(false)

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file ? file.name : "");
  };

  // Function to handle form submission
  const handleSubmit = (values, { resetForm }) => {
    setTableData((prevData) => [...prevData, values]);
    setIsDataSubmitted(true); // Data is submitted, so set the flag to true
    resetForm();
  };

  // Function to delete table data
  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
    setIsDataSubmitted(tableData.length > 1);
  };
  const handleSaveAndNext = () => {
    // Here you would save the table data, either to a global state or a database
    // Then navigate to the next screen
    toast.success("Data Save Successfully", {
      position: "top-right",
    });
    dispatch(increment());
    setTimeout(() => {
      Navigate("/upload-document");
    }, 5000); // Replace 'NextScreen' with the name of your next screen
  };

  const handleBack = () => {
    // Navigate to the previous screen
    dispatch(decrement())
    Navigate("/academic-qualification");
  };

  return (
    <>
    <ToastContainer/>
      <Header />
      <Progress />
      <section className="py-4" style={{ background: "#f0f2f8" }}>
        <div className="mb-3 container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="mb-4 mt-2">
                    Work Experience (in chronological order, starting with
                    current job)
                  </Typography>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ touched, errors }) => (
                      <Form>
                        {/* Form fields */}
                        <Grid container spacing={3} className="mb-3">
                          {/* Designation field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="designation"
                              name="designation"
                              label="Designation"
                              variant="outlined"
                              fullWidth
                              error={
                                touched.designation &&
                                Boolean(errors.designation)
                              }
                              helperText={
                                touched.designation && errors.designation
                              }
                            />
                          </Grid>
                          {/* Employer Name field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="employerName"
                              name="employerName"
                              label="Name of the Employer/ Organization"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={
                                touched.employerName &&
                                Boolean(errors.employerName)
                              }
                              helperText={
                                touched.employerName && errors.employerName
                              }
                            />
                          </Grid>
                          {/* Address of the Employer field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="addressOfTheEmployer"
                              name="addressOfTheEmployer"
                              label="Address of the Employer/ Organization"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={
                                touched.addressOfTheEmployer &&
                                Boolean(errors.addressOfTheEmployer)
                              }
                              helperText={
                                touched.addressOfTheEmployer &&
                                errors.addressOfTheEmployer
                              }
                            />
                          </Grid>
                          {/* Payscale/Payband field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="PayscalePayband"
                              name="PayscalePayband"
                              label="Pay scale/ Pay band"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={
                                touched.PayscalePayband &&
                                Boolean(errors.PayscalePayband)
                              }
                              helperText={
                                touched.PayscalePayband &&
                                errors.PayscalePayband
                              }
                            />
                          </Grid>
                          {/* Gross Salary field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="GrossSalary"
                              name="GrossSalary"
                              label="Gross Salary p.m"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={
                                touched.GrossSalary &&
                                Boolean(errors.GrossSalary)
                              }
                              helperText={
                                touched.GrossSalary && errors.GrossSalary
                              }
                            />
                          </Grid>
                          {/* Nature of Work/Roles & Responsibilities field */}
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              id="NatureofworkRoles"
                              name="NatureofworkRoles"
                              label="Nature of work/Roles & Responsibilities"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={
                                touched.NatureofworkRoles &&
                                Boolean(errors.NatureofworkRoles)
                              }
                              helperText={
                                touched.NatureofworkRoles &&
                                errors.NatureofworkRoles
                              }
                            />
                          </Grid>
                          {/* Working From date field */}
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <Field name="WorkingFrom" key="WorkingFrom">
                                  {({ field, form }) => (
                                    <DatePicker
                                      label="Working From"
                                      className="mt-2"
                                      maxDate={dayjs()}
                                      value={field.value}
                                      onChange={(date) => {
                                        form.setFieldValue("WorkingFrom", date);
                                        form.setFieldTouched(
                                          "WorkingFrom",
                                          true
                                        );
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          error={
                                            touched.WorkingFrom &&
                                            Boolean(errors.WorkingFrom)
                                          }
                                          helperText={
                                            touched.WorkingFrom &&
                                            errors.WorkingFrom
                                          }
                                          InputProps={{
                                            style: { paddingTop: 0 },
                                          }}
                                        />
                                      )}
                                    />
                                  )}
                                </Field>
                              </DemoContainer>
                            </LocalizationProvider>
                            <ErrorMessage
                              name="WorkingFrom"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>
                          {/* Working To date field */}
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <Field name="WorkingTo" key="WorkingTo">
                                  {({ field, form }) => (
                                    <DatePicker
                                      label="Working To"
                                      className="mt-2"
                                      maxDate={dayjs()}
                                      value={field.value}
                                      onChange={(date) => {
                                        form.setFieldValue("WorkingTo", date);
                                        form.setFieldTouched("WorkingTo", true);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          error={
                                            touched.WorkingTo &&
                                            Boolean(errors.WorkingTo)
                                          }
                                          helperText={
                                            touched.WorkingTo &&
                                            errors.WorkingTo
                                          }
                                          InputProps={{
                                            style: { paddingTop: 0 },
                                          }}
                                        />
                                      )}
                                    />
                                  )}
                                </Field>
                              </DemoContainer>
                            </LocalizationProvider>
                            <ErrorMessage
                              name="WorkingTo"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>
                          {/* File Upload section */}
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload Proof (jpeg,pdf,png,jpg)* Filename must not
                              contain any special character
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              component="label"
                              role="button"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <input
                                type="file"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                name="fileupload"
                              />
                              <ErrorMessage
                                name="uploadfilename"
                                component="div"
                                className="error text-danger"
                              />
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography>{uploadedFileName}</Typography>
                          </Grid>
                        </Grid>
                        {/* Submit button */}
                        <div className="d-flex justify-content-end">
                          <Grid item xs={12} sm={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Add Experience
                            </Button>
                          </Grid>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Display filled data in table */}
        <div className="mb-3 container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="mb-4 mt-2">
                    Work Experience
                  </Typography>
                </CardContent>
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Name of the Employer/ Organization</th>
                      <th scope="col">Address of the Employer/ Organization</th>
                      <th scope="col">Pay scale/ Pay band</th>
                      <th scope="col">
                        Nature of work/Roles & Responsibilities
                      </th>
                      <th scope="col">Upload – Degree/Certificate/Marksheet</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data, index) => (
                      <tr key={index}>
                        <th style={{ padding: "10px" }} scope="row">
                          {index + 1}
                        </th>
                        <td style={{ padding: "10px" }}>{data.designation}</td>
                        <td style={{ padding: "10px" }}>{data.employerName}</td>
                        <td style={{ padding: "10px" }}>
                          {data.addressOfTheEmployer}
                        </td>
                        <td style={{ padding: "10px" }}>
                          {data.PayscalePayband}
                        </td>
                        <td style={{ padding: "10px" }}>
                          {data.NatureofworkRoles}
                        </td>
                        <td style={{ padding: "10px" }}>{uploadedFileName}</td>
                        <td style={{ padding: "10px" }}>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end p-2">
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant="outlined"
                      className="mx-1"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isDataSubmitted}
                      onClick={handleSaveAndNext}
                    >
                      Save & Next
                    </Button>
                  </Grid>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkExperience;
