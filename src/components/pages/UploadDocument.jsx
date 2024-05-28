import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import Progress from "../../layouts/stepper/Progress";
import { Formik, Form, ErrorMessage } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";

const UploadDocument = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: "",
    resume: "",
    coverLetter: "",
  });

  const validationSchema = Yup.object().shape({
    photo: Yup.string().required("Photo upload is required").nullable(),
    resume: Yup.string().required("Resume upload is required").nullable(),
    coverLetter: Yup.string().required("Cover letter upload is required").nullable(),
  });

  const handleSubmit = (values) => {
    console.log(values);
    // You can submit form values to your backend or handle them as needed
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    setUploadedFiles({
      ...uploadedFiles,
      [type]: file ? file.name : "",
    });
  };

  return (
    <>
      <Header />
      <Progress />
      <section>
        <section className="py-4" style={{ background: "#f0f2f8" }}>
          <div className="mb-3 container">
            <div className="row justify-content-center">
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" className="mb-4 mt-2">
                    ID Proof Upload Details
                  </Typography>
                  <Formik
                    initialValues={uploadedFiles}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ touched, errors, setFieldValue }) => (
                      <Form>
                        <Grid container spacing={3} className="mb-3">
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload Photo{" "}
                              <span className="text-danger">(.jpg,.png,.jpeg)</span>
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
                                onChange={(event) =>
                                  handleFileChange(event, "photo")
                                }
                              />
                             
                            </Button>
                            <ErrorMessage
                                name="photo"
                                component="div"
                                className="error text-danger"
                              />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography>{uploadedFiles.photo}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} className="mb-3">
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload Resume{" "}
                              <span className="text-danger">(.pdf or .doc)</span>
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
                                onChange={(event) =>
                                  handleFileChange(event, "resume")
                                }
                              />
                            
                            </Button>
                            <ErrorMessage
                                name="resume"
                                component="div"
                                className="error text-danger"
                              />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography>{uploadedFiles.resume}</Typography>
                          </Grid>
                        </Grid>
                        <Grid container spacing={3} className="mb-3">
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Upload Cover Letter{" "}
                              <span className="text-danger">(.pdf or .doc)</span>
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
                                onChange={(event) =>
                                  handleFileChange(event, "coverLetter")
                                }
                              />
                             
                            </Button>
                            <ErrorMessage
                                name="coverLetter"
                                component="div"
                                className="error text-danger"
                              />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <Typography>{uploadedFiles.coverLetter}</Typography>
                          </Grid>
                        </Grid>
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
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default UploadDocument;
