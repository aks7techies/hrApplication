import React, { useState } from "react";
import Header from "../../layouts/header/Header";
import Progress from "../../layouts/stepper/Progress";
import { Formik, Form, ErrorMessage } from "formik";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as Yup from "yup";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { decrement, increment } from "../../radux/slices/UpdateStagesStepper";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
const UploadDocument = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    photo: "",
    resume: "",
    coverLetter: "",
  });
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    photo: Yup.string().required("Photo upload is required").nullable(),
    resume: Yup.string().required("Resume upload is required").nullable(),
    coverLetter: Yup.string()
      .required("Cover letter upload is required")
      .nullable(),
  });

  const handleSubmit = (values) => {
    toast.success("Data Save Successfully", {
      position: "top-right",
    });
    console.log(values);
    // You can submit form values to your backend or handle them as needed
    // For demonstration, let's just log the values
    console.log("Form submitted:", values);

    dispatch(increment());
    setTimeout(() => {
      Navigate("/declaration");
    }, 5000);
  };
const handleBackClick = () =>{
  dispatch(decrement());
  Navigate("/work-experience");
}
  const handleFileChange = (event, type, setFieldValue) => {
    const file = event.target.files[0];
    setUploadedFiles({
      ...uploadedFiles,
      [type]: file ? file.name : "",
    });
    setFieldValue(type, file); // Set form field value
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Progress />
      <section className="py-4" style={{ background: "#f0f2f8" }}>
        <div className="container">
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
                      {/* Photo Upload */}
                      <Grid container spacing={3} className="mb-3">
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body1">
                            Upload Photo{" "}
                            <span className="text-danger">
                              (.jpg,.png,.jpeg)
                            </span>
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
                                handleFileChange(event, "photo", setFieldValue)
                              }
                            />
                          </Button>
                          <ErrorMessage
                            name="photo"
                            component="div"
                            className="error text-danger"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2">
                            {uploadedFiles.photo}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* Resume Upload */}
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
                                handleFileChange(event, "resume", setFieldValue)
                              }
                            />
                          </Button>
                          <ErrorMessage
                            name="resume"
                            component="div"
                            className="error text-danger"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2">
                            {uploadedFiles.resume}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* Cover Letter Upload */}
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
                                handleFileChange(
                                  event,
                                  "coverLetter",
                                  setFieldValue
                                )
                              }
                            />
                          </Button>
                          <ErrorMessage
                            name="coverLetter"
                            component="div"
                            className="error text-danger"
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="body2">
                            {uploadedFiles.coverLetter}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* Save & Next Button */}
                      <Grid container spacing={3} className="mb-3">
                        <Grid item xs={12} sm={12}>
                          <div className="d-flex justify-content-end p-2">
                            <Button
                              variant="outlined"
                              className="mx-1"
                              onClick={handleBackClick}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit" // This triggers form submission
                            >
                              Save & Next
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadDocument;
