import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
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
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "../pages/allPages.css";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const initialValues = {
  designation: "",
  employerName: "",
  addressOfTheEmployer: "",
  PayscalePayband: "",
  GrossSalary: "",
  NatureofworkRoles: "",
  uploadedFileName: "", // New state for uploaded file name
};

const validationSchema = Yup.object({
  designation: Yup.string().required("Required"),
  employerName: Yup.string().required("Required"),
  addressOfTheEmployer: Yup.string().required("Required"),
  PayscalePayband: Yup.string().required("Required"),
  GrossSalary: Yup.string().required("Required"),
  NatureofworkRoles: Yup.string().required("Required"),
  uploadedFileName: Yup.string().required("File upload is required"), // Added validation for uploadedFileName
});

const handleSubmit = (values) => {
  console.log(values);
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const WorkExperience = () => {
  const [uploadedFileName, setUploadedFileName] = useState(""); // State for uploaded file name

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file ? file.name : "");
  };

  return (
    <>
      <Header />
      <Progress />
      <section className="py-4" style={{background: "#f0f2f8"}}>
        <div className="mb-3 container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="mb-4 mt-2">
                  Work Experience (in chronological order, starting with current job)
                  </Typography>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({touched, errors}) => (
                      <Form>
                        <Grid container spacing={3} className="mb-3">
                          <Grid item xs={12} sm={4}>
                            <Field
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
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
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <Field name="WorkingFrom" key="WorkingFrom">
                                  {({field, form}) => (
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
                                          InputProps={{style: {paddingTop: 0}}}
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
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <Field name="WorkingTo" key="WorkingTo">
                                  {({field, form}) => (
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
                                          InputProps={{style: {paddingTop: 0}}}
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
                                style={{display: "none"}}
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

        <div className="mb-3 container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="mb-4 mt-2">
                  Work Experience
                  </Typography>
                </CardContent>
                <table class="table">
                  <thead class="table-light">
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
                    <tr>
                      <th style={{padding: "10px"}} scope="row">
                        1
                      </th>
                      <td style={{padding: "10px"}}>Mark</td>
                      <td style={{padding: "10px"}}>Otto</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                    </tr>
                    <tr>
                      <th style={{padding: "10px"}} scope="row">
                        2
                      </th>
                      <td style={{padding: "10px"}}>Mark</td>
                      <td style={{padding: "10px"}}>Otto</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                      <td style={{padding: "10px"}}>@mdo</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-end p-2">
                  <Grid item xs={12} sm={12}>
                    <Button variant="outlined" className="mx-1">
                      Back
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
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
