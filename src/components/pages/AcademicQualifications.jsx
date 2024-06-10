import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../layouts/header/Header";
import Progress from "../../layouts/stepper/Progress";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "../pages/allPages.css";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../radux/slices/UpdateStagesStepper";

const initialValues = {
  degree: "",
  specialization: "",
  yop: null,
  NameofInstitute: "",
  CGPA_Rank_Divn_Equivalent: "",
  Board_or_University: "",
  uploadedFileName: "",
};

const validationSchema = Yup.object({
  degree: Yup.string().required("Required"),
  specialization: Yup.string().required("Required"),
  yop: Yup.date().nullable().required("Required"),
  NameofInstitute: Yup.string().required("Required"),
  CGPA_Rank_Divn_Equivalent: Yup.string().required("Required"),
  Board_or_University: Yup.string().required("Required"),
  uploadedFileName: Yup.string().required("File upload is required"),
});

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

const AcademicQualifications = () => {
  const [submittedData, setSubmittedData] = useState([]);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("uploadedFileName", file ? file.name : "");
  };

  const handleSubmit = (values, { resetForm }) => {
    setSubmittedData((prevData) => [...prevData, values]);
    resetForm();
    setIsDataSubmitted(true);
    toast.success("Qualification Added Successfully", {
      position: "top-right",
    });
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    setIsDataSubmitted(updatedData.length > 0);
    toast.success("Data Deleted Successfully", {
      position: "top-right",
    });
  };

  const handleSaveAndNext = () => {
    dispatch(increment());
    navigate("/work-Experience");
  };

  const handleBackClick = () => {
    dispatch(decrement());
    navigate("/form-fill");
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
                    Academic Qualifications (mention Graduation & above –
                    highest to lowest)
                  </Typography>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ touched, errors, setFieldValue, setFieldTouched, values }) => (
                      <Form>
                        <Grid container spacing={3} className="mb-3">
                          <Grid item xs={12} sm={4}>
                            <Field
                              className="pt-2"
                              as={TextField}
                              id="degree"
                              name="degree"
                              label="Degree"
                              variant="outlined"
                              fullWidth
                              error={touched.degree && Boolean(errors.degree)}
                              helperText={touched.degree && errors.degree}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
                              id="specialization"
                              name="specialization"
                              label="Specialization"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={touched.specialization && Boolean(errors.specialization)}
                              helperText={touched.specialization && errors.specialization}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Field name="yop">
                                {({ field, form }) => (
                                  <DatePicker
                                    label="Year Of Passing"
                                    className="mt-2"
                                    maxDate={dayjs()}
                                    value={field.value}
                                    onChange={(date) => {
                                      setFieldValue("yop", date);
                                      setFieldTouched("yop", true);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        error={touched.yop && Boolean(errors.yop)}
                                        helperText={touched.yop && errors.yop}
                                        InputProps={{
                                          style: { paddingTop: 0 },
                                        }}
                                      />
                                    )}
                                  />
                                )}
                              </Field>
                            </LocalizationProvider>
                            <ErrorMessage
                              name="yop"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
                              id="NameofInstitute"
                              name="NameofInstitute"
                              label="Name of Institute"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={touched.NameofInstitute && Boolean(errors.NameofInstitute)}
                              helperText={touched.NameofInstitute && errors.NameofInstitute}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
                              id="CGPA_Rank_Divn_Equivalent"
                              name="CGPA_Rank_Divn_Equivalent"
                              label="CGPA/ Rank/ Divn/ Equivalent:*"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={touched.CGPA_Rank_Divn_Equivalent && Boolean(errors.CGPA_Rank_Divn_Equivalent)}
                              helperText={touched.CGPA_Rank_Divn_Equivalent && errors.CGPA_Rank_Divn_Equivalent}
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Field
                              as={TextField}
                              className="pt-2"
                              id="Board_or_University"
                              name="Board_or_University"
                              label="Board or University"
                              variant="outlined"
                              fullWidth
                              multiline
                              error={touched.Board_or_University && Boolean(errors.Board_or_University)}
                              helperText={touched.Board_or_University && errors.Board_or_University}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload - Degree/Certificate/Marksheet (pdf, jpg, jpeg, png)
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              component="label"
                              variant="contained"
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload file
                              <VisuallyHiddenInput
                                type="file"
                                onChange={(event) =>
                                  handleFileChange(event, setFieldValue)
                                }
                                name="uploadedFile"
                              />
                            </Button>
                            <ErrorMessage
                              name="uploadedFileName"
                              component="div"
                              className="error text-danger"
                            />
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Typography>{values.uploadedFileName}</Typography>
                          </Grid>
                        </Grid>
                        <div className="d-flex justify-content-end">
                          <Grid item xs={12} sm={12}>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                            >
                              Add Qualification
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
                    Academic Qualifications
                  </Typography>
                </CardContent>
                {submittedData.length > 0 && (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead style={{background:'#eee'}}>
                        <TableRow>
                          <TableCell style={{fontWeight:'600'}}>#</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Degree</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Specialization</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Year of Passing</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Name Of Institute</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>CGPA/ Rank/ Divn/ Equivalent</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Uploaded File</TableCell>
                          <TableCell align="center" style={{fontWeight:'600'}}>Delete</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {submittedData.map((data, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell align="center">{data.degree}</TableCell>
                            <TableCell align="center">{data.specialization}</TableCell>
                            <TableCell align="center">{dayjs(data.yop).format('YYYY')}</TableCell>
                            <TableCell align="center">{data.NameofInstitute}</TableCell>
                            <TableCell align="center">{data.CGPA_Rank_Divn_Equivalent}</TableCell>
                            <TableCell align="center">{data.uploadedFileName}</TableCell>
                            <TableCell align="center">
                              <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(index)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                <div className="d-flex justify-content-end p-2">
                  <Grid item xs={12} sm={12}>
                    <Button onClick={handleBackClick} variant="outlined" className="mx-1">
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
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

export default AcademicQualifications;
