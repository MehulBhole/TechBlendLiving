import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../Css/Navbar.css";
import img from "../media/logo.jpg";
import { useNavigate } from "react-router-dom";

export function NavigationBar() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false); // Initialize status to false

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(`/`);
  };

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    const ownerId = sessionStorage.getItem("owner-id");
    const serviceId = sessionStorage.getItem("service-id");
    const hostId = sessionStorage.getItem("host-id");
    if (id !== null || ownerId !== null || serviceId !== null || hostId !== null) {
      setStatus(true); // Set status to true if both id and owner-id are present
    } else {
      setStatus(false); // Set status to false if either id or owner-id is missing
    }
  }, []); 

  return (
    <>
      <Navbar style={{ backgroundColor: "#D8232A", position: "fixed", top: 0, width: "100%", zIndex: 1000 }} variant="dark">
        <Container>
          <LinkContainer to="/">
            <img
              className="hover-effect"
              src={img}
              alt="lol"
              height={"70px"}
            />
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className="home">
                <LinkContainer class="" to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              </div>
              {!status && (
                <>
                  <div class="dropdown nav-pad">
                    <button class="dropbtn sub-nav">Login</button>

                    <div class="dropdown-content">
                      <LinkContainer to="/login-user">
                        <Nav.Link>Login User</Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/login-owner">
                        <Nav.Link>Login Owner</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/login-service">
                        <Nav.Link>Login Service</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/login-host">
                        <Nav.Link>Login host</Nav.Link>
                      </LinkContainer>
                    </div>
                  </div>
                  <div class="nav-pad dropdown">
                    <button class="dropbtn ">Register</button>

                    <div class="dropdown-content">
                      <LinkContainer to="/registrationuser">
                        <Nav.Link>User Registration</Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/registrationowner">
                        <Nav.Link>Owner Registration</Nav.Link>
                      </LinkContainer>

                      <LinkContainer to="/registrationserviceprovider">
                        <Nav.Link>ServiceProvider Registration</Nav.Link>
                      </LinkContainer>
                    </div>
                  </div>
                </>
              )}

              <div className="nav-pad">
                <LinkContainer to="/contactus">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
              </div>

              <div className="nav-pad">
                <LinkContainer to="/aboutus">
                  <Nav.Link>About Us</Nav.Link>
                </LinkContainer>
              </div>
             
              <Nav>
                <div className="logout-btn-div">
              {status && (
                <button className="logout-btn"  onClick={handleLogout}>
                  Logout
                </button>
                  )}
              </div>
              </Nav>
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ height: "110px" }} /> {/* Add a placeholder to prevent content from being overlapped by the fixed navbar */}
    </>
  );
}
