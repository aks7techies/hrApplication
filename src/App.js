import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';


// Lazy load the Login component
const Login = React.lazy(() => import('./components/login/Login'));
const Register = React.lazy(() => import('./components/registration/Registration'));
const E_Hiring = React.lazy(() => import('./components/pages/EHiring'));
const AdademicQualification = React.lazy(() => import('./components/pages/AcademicQualifications'));
const WorkExperience = React.lazy(() => import('./components/pages/WorkExperience'));
const UploadDocument = React.lazy(() => import('./components/pages/UploadDocument'));
const Declration = React.lazy(() => import('./components/pages/Declaration'));


const Loading = () => (
  <div style={{ height:'100vh', width:'100vw' , display:'flex', justifyContent:'center', alignItems:'center' }}>
    <img src='../../loading1.gif' alt="Loading..." />
  </div>
);

function App() {
  const counter = useSelector((state)=>console.log(state))

  return (
    <>
      <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
                <Login />          
            }
          />
          <Route
            path="/register"
            element={
                <Register />          
            }
          />
          <Route
            path="/form-fill"
            element={
                <E_Hiring />          
            }
          />
          <Route
            path="/academic-qualification"
            element={
                <AdademicQualification />          
            }
          />
          <Route
            path="/work-experience"
            element={
                <WorkExperience />          
            }
          />
          <Route
            path="/upload-document"
            element={
                <UploadDocument />          
            }
          />
          <Route
            path="/declaration"
            element={
                <Declration />          
            }
          />


        </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
