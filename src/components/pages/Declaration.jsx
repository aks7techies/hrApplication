import React from "react";
import Header from "../../layouts/header/Header";
import Progress from "../../layouts/stepper/Progress";
import { Button, Card, CardContent, Grid, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const Declaration = () => {
  const formik = useFormik({
    initialValues: {
      declaration: false,
    },
    validationSchema: Yup.object({
      declaration: Yup.boolean().oneOf([true], "You must accept the declaration"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    <>
      <Header />
      <Progress />
      <section className="py-4" style={{ background: "#f0f2f8" }}>
        <div className="mb-3 container">
          <div className="row justify-content-center">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  variant="h5"
                  className="mb-4 mt-2 fw-bold"
                  style={{ borderBottom: '2px solid #000', width: 'fit-content' }}
                >
                  Declaration
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                  <div >
                    <FormControlLabel
                    className="d-flex align-items-start"
                      control={
                        <Checkbox
                          name="declaration"
                          checked={formik.values.declaration}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      }
                      label={
                        <p style={{ fontWeight: 'bold', fontSize: '18px', padding: '7px 10px' }}>
                          I ________________, hereby declare that the statements made in the application are true, complete and correct to the best of my knowledge and belief, and nothing has been concealed/distorted. In the event of any of the information being found false or incorrect or any ineligibility being detected before or after the selection, my candidature/appointment shall be liable to be summarily cancelled/terminated.
                        </p>
                      }
                    />
                  </div>
                  {formik.touched.declaration && formik.errors.declaration ? (
                    <div style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.declaration}</div>
                  ) : null}
                  <div className="d-flex justify-content-end p-2">
                    <Grid item xs={12} sm={12}>
                      <Button variant="contained" color="primary" type="submit">
                        SUBMIT My Application
                      </Button>
                    </Grid>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Declaration;
