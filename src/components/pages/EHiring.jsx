import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../layouts/header/Header";
import dayjs from "dayjs";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./allPages.css";
import Progress from "../../layouts/stepper/Progress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../../radux/slices/UpdateStagesStepper";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  middleName: Yup.string(),
  lastName: Yup.string(),
  dob: Yup.date()
    .max(new Date(), "Date of birth must be in the past")
    .required("Date of Birth is Required"),
  fatherName: Yup.string().required("Father's Name is Required"),
  gender: Yup.string().required("Gender is Required"),
  state: Yup.string().required("State is Required"),
  city: Yup.string().required("City is Required"),
  district: Yup.string().required("District is Required"),
  pincode: Yup.string().required("Pin Code is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email ID is Required"),
  mobileNo: Yup.string().required("Mobile no. is Required"),
  communicationAddress: Yup.string().required(
    "Communication Address is Required"
  ),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const positionRequirements = {
  CFO: 10,
  ASG: 5,
  SG: 5,
};

const EHiring = () => {
  const [open, setOpen] = useState(true);
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState({
    CFO: false,
    ASG: false,
    SG: false,
  });
  const [dob, setDob] = useState(null);
  const [appliedPositions, setAppliedPositions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (date) => {
    setDob(date);
    if (date) {
      // Calculate age
      const age = dayjs().diff(dayjs(date), "year");

      // Determine eligibility for each selected position
      const eligibility = Object.entries(selectedPositions)
        .filter(([position, isSelected]) => isSelected)
        .map(([position]) => ({
          position,
          isEligible: age >= positionRequirements[position],
        }));

      setAppliedPositions(eligibility);
    }
  };

  const handleSubmit = (values) => {
    toast.success("Data Save Successfully", {
      position: "top-right",
    });

    setTimeout(() => {
      dispatch(increment());
      navigate("/academic-qualification");
    }, 5000);
  };

  const handleModalSubmit = () => {
    if (Object.values(selectedPositions).includes(true)) {
      setModalSubmitted(true);
      handleClose();
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPositions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <>
      <ToastContainer />
      <Header />
      <Progress />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{ onClick: (e) => e.stopPropagation() }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Applying For:
          </Typography>
          <div style={{ lineHeight: "2rem" }}>
            {Object.keys(selectedPositions).map((position) => (
              <div key={position}>
                <input
                  type="checkbox"
                  name={position}
                  checked={selectedPositions[position]}
                  onChange={handleCheckboxChange}
                />
                <label>{`${position} (Min. Experience ${positionRequirements[position]} Years)`}</label>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              onClick={handleModalSubmit}
              className="mt-2"
              disabled={!Object.values(selectedPositions).includes(true)}
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      {modalSubmitted && (
        <section className="py-4" style={{ background: "#f0f2f8" }}>
          <div className="mb-3 container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" className="mb-4 mt-2">
                      Personal Details
                    </Typography>

                    <Formik
                      initialValues={{
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        dob: null,
                        fatherName: "",
                        gender: "",
                        state: "",
                        city: "",
                        district: "",
                        pincode: "",
                        email: "",
                        mobileNo: "",
                        communicationAddress: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        setFieldValue,
                        setFieldTouched,
                        touched,
                        errors,
                        isValid,
                      }) => (
                        <Form>
                          <Grid container spacing={3} className="mb-3">
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="firstName"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="middleName"
                                label="Middle Name"
                                variant="outlined"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="lastName"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Date Of Birth"
                                  maxDate={dayjs()}
                                  className="mt-2"
                                  value={dob}
                                  onChange={(date) => {
                                    setFieldValue("dob", date);
                                    setFieldTouched("dob", true);
                                    handleDateChange(date);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      name="dob"
                                      error={touched.dob && Boolean(errors.dob)}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                              <ErrorMessage
                                name="dob"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                className="mt-2"
                                as={TextField}
                                name="fatherName"
                                label="Father Name"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="fatherName"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormControl fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Field
                                  className="mt-2"
                                  as={Select}
                                  labelId="gender-label"
                                  id="gender"
                                  name="gender"
                                  label="Gender"
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value="Male">Male</MenuItem>
                                  <MenuItem value="Female">Female</MenuItem>
                                  <MenuItem value="Other">Other</MenuItem>
                                </Field>
                              </FormControl>
                              <ErrorMessage
                                name="gender"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>S no.</th>
                                    <th>Apply for</th>
                                    <th>Your Age</th>
                                    <th>Age Requirement</th>
                                    <th>Eligibility</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {appliedPositions.map((position, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{position.position}</td>
                                      <td>{dayjs().diff(dob, 'year')} years</td>
                                      <td>{positionRequirements[position.position]} years</td>
                                      <td
                                        style={{
                                          color: position.isEligible
                                            ? "green"
                                            : "red",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {position.isEligible
                                          ? "You are eligible for this post"
                                          : "Not Eligible"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h5">Mailing Address Details</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormControl fullWidth>
                                <InputLabel id="state-label">State</InputLabel>
                                <Field
                                  as={Select}
                                  labelId="state-label"
                                  id="state"
                                  name="state"
                                  label="State"
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value="State 1">State 1</MenuItem>
                                  <MenuItem value="State 2">State 2</MenuItem>
                                  <MenuItem value="State 3">State 3</MenuItem>
                                </Field>
                              </FormControl>
                              <ErrorMessage
                                name="state"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="city"
                                label="City"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="city"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <FormControl fullWidth>
                                <InputLabel id="district-label">District</InputLabel>
                                <Field
                                  as={Select}
                                  labelId="district-label"
                                  id="district"
                                  name="district"
                                  label="District"
                                >
                                  <MenuItem value="">Select</MenuItem>
                                  <MenuItem value="District 1">District 1</MenuItem>
                                  <MenuItem value="District 2">District 2</MenuItem>
                                  <MenuItem value="District 3">District 3</MenuItem>
                                </Field>
                              </FormControl>
                              <ErrorMessage
                                name="district"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="pincode"
                                label="Pin Code"
                                type="number"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="pincode"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="email"
                                label="Email ID"
                                type="email"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Field
                                as={TextField}
                                name="mobileNo"
                                label="Mobile No."
                                type="number"
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="mobileNo"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                as={TextField}
                                name="communicationAddress"
                                label="Communication Address:"
                                multiline
                                variant="outlined"
                                fullWidth
                              />
                              <ErrorMessage
                                name="communicationAddress"
                                component="div"
                                className="error text-danger"
                              />
                            </Grid>
                          </Grid>
                          <CardActions style={{ justifyContent: "flex-end" }}>
                            <Button variant="contained" type="submit" disabled={!isValid}>
                              Save & Next
                            </Button>
                          </CardActions>
                        </Form>
                      )}
                    </Formik>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EHiring;
