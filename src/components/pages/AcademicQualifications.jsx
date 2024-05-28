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
  degree: "",
  specialization: "",
  yop: null,
  NameofInstitute: "",
  CGPA_Rank_Divn_Equivalent: "",
  Board_or_University: "",
  uploadedFileName: "", // New state for uploaded file name
};

const validationSchema = Yup.object({
  degree: Yup.string().required("Required"),
  specialization: Yup.string().required("Required"),
  yop: Yup.date().nullable().required("Required"),
  NameofInstitute: Yup.string().required("Required"),
  CGPA_Rank_Divn_Equivalent: Yup.string().required("Required"),
  Board_or_University: Yup.string().required("Required"),
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

const AcademicQualifications = () => {
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
                    Academic Qualifications (mention Graduation & above –
                    highest to lowest)
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
                              error={
                                touched.specialization &&
                                Boolean(errors.specialization)
                              }
                              helperText={
                                touched.specialization && errors.specialization
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <Field name="yop" key="yop">
                                  {({field, form}) => (
                                    <DatePicker
                                      label="Year Of Passing"
                                      className="mt-2"
                                      maxDate={dayjs()}
                                      value={field.value}
                                      onChange={(date) => {
                                        form.setFieldValue("yop", date);
                                        form.setFieldTouched("yop", true);
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          error={
                                            touched.yop && Boolean(errors.yop)
                                          }
                                          helperText={touched.yop && errors.yop}
                                          InputProps={{style: {paddingTop: 0}}}
                                        />
                                      )}
                                    />
                                  )}
                                </Field>
                              </DemoContainer>
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
                              error={
                                touched.NameofInstitute &&
                                Boolean(errors.NameofInstitute)
                              }
                              helperText={
                                touched.NameofInstitute &&
                                errors.NameofInstitute
                              }
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
                              error={
                                touched.CGPA_Rank_Divn_Equivalent &&
                                Boolean(errors.CGPA_Rank_Divn_Equivalent)
                              }
                              helperText={
                                touched.CGPA_Rank_Divn_Equivalent &&
                                errors.CGPA_Rank_Divn_Equivalent
                              }
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
                              error={
                                touched.Board_or_University &&
                                Boolean(errors.Board_or_University)
                              }
                              helperText={
                                touched.Board_or_University &&
                                errors.Board_or_University
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload – Degree/Certificate/Marksheet (pdf, jpg,
                              jpeg, png)
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
                    Academic Qualificcation
                  </Typography>
                </CardContent>
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Degree</th>
                      <th scope="col">Specialization</th>
                      <th scope="col">year of Passing</th>
                      <th scope="col">Name Of Institute</th>
                      <th scope="col">CGPA/ Rank/ Divn/ Equivalent</th>
                      <th scope="col">Upload – Degree/Certificate/Marksheet</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th  style={{ padding:'10px' }} scope="row">1</th>
                      <td style={{ padding:'10px' }}>Mark</td>
                      <td style={{ padding:'10px' }}>Otto</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                    </tr>
                    <tr>
                    <th  style={{ padding:'10px' }} scope="row">2</th>
                      <td style={{ padding:'10px' }}>Mark</td>
                      <td style={{ padding:'10px' }}>Otto</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
                      <td style={{ padding:'10px' }}>@mdo</td>
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

export default AcademicQualifications;
