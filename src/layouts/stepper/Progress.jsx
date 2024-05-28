import React from 'react'
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";
import { useSelector } from 'react-redux';


const Progress = () => {
  const count = useSelector((state) => state.counter.value)
const steps = [
    "Personal Details",
    "Academic Qualifications",
    "Work Experience",
    "Upload Documents",
    "Declaration",
  ];
  return (
    <section  style={{background: "#f0f2f8"}}>
    <div className="pt-3">
          <Box sx={{width: "100%", overflow:'auto'}}>
            <Stepper activeStep={count} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </div>
        </section>
  )
}

export default Progress