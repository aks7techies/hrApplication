import {Button} from "@mui/material";
import React from "react";
import "./headerCss.css";

const Header = () => {
  return (
    <>
      <section style={{background: "#f0f2f8"}}>
        <nav className="navbar-fluid bg-body-tertiary">
          <div className="row align-items-center">
            <div className="col-md-4 col-sm-12 text-center px-5">
              <a className="navbar-brand" href="#">
                <img
                  src="../../../QCI-Logo.png"
                  alt="Please wait..."
                  className=""
                  style={{ width:'70%', height:'70%', padding:'10px 0' }}
                />
              </a>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
              <div className="headerName">
                <p
                  style={{
                    fontSize: 26,
                    padding: "10px 0 0 0",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Application Form For
                  Chief Financial Officer(CFO)
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </nav>
        <nav className="navbar px-3" style={{backgroundColor: "#1a9bc9"}}>
          <div className="d-flex align-items-center justify-content-end w-100">
            <h5 className="me-1 px-1 text-white">Welcome: User</h5>
            <Button
              variant="contained"
              className="fw-bold headerBtn"
              sx={{backgroundColor: "#ffff", color: "#444"}}
            >
              LogOut
            </Button>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Header;
