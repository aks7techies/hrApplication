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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../radux/slices/UpdateStagesStepper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const validationSchema = Yup.object({
  designation: Yup.string().required("Required"),
  employerName: Yup.string().required("Required"),
  addressOfTheEmployer: Yup.string().required("Required"),
  PayscalePayband: Yup.string().required("Required"),
  GrossSalary: Yup.string().required("Required"),
  NatureofworkRoles: Yup.string().required("Required"),
});

const WorkExperience = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFileName(file ? file.name : "");
  };

  const handleSubmit = (values, { resetForm }) => {
    setTableData((prevData) => [...prevData, { ...values, uploadedFileName }]);
    setIsDataSubmitted(true);
    resetForm();
    setUploadedFileName("");
  };

  const handleDelete = (index) => {
    setTableData((prevData) => prevData.filter((_, i) => i !== index));
    setIsDataSubmitted(tableData.length > 1);
  };

  const handleSaveAndNext = () => {
    toast.success("Data Save Successfully", {
      position: "top-right",
    });
    dispatch(increment());
    setTimeout(() => {
      navigate("/upload-document");
    }, 5000);
  };

  const handleBack = () => {
    dispatch(decrement());
    navigate("/academic-qualification");
  };

  return (
    <>
      <ToastContainer />
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
                        <Grid container spacing={3} className="mb-3">
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
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload Proof (jpeg, pdf, png, jpg)*
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
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={3}>
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead style={{background:'#eee'}}>
                      <TableRow>
                        <TableCell style={{fontWeight:'600'}}>#</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Designation</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Name of the Employer/Organization</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Address of the Employer/Organization</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Pay scale/Pay band</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Nature of work/Roles & Responsibilities</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Upload – Degree/Certificate/Marksheet</TableCell>
                        <TableCell style={{fontWeight:'600'}}>Delete</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>{data.designation}</TableCell>
                          <TableCell>{data.employerName}</TableCell>
                          <TableCell>{data.addressOfTheEmployer}</TableCell>
                          <TableCell>{data.PayscalePayband}</TableCell>
                          <TableCell>{data.NatureofworkRoles}</TableCell>
                          <TableCell>{data.uploadedFileName}</TableCell>
                          <TableCell>
                            <DeleteIcon
                              style={{ color: "red", cursor: "pointer" }}
                              onClick={() => handleDelete(index)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
