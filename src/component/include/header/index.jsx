import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthTokens, deleteAuthTokens } from "../../../libraries/auth";
import { logoutFromAllService } from "../../../services/auth.service";
import { toast } from "react-toastify";

const Header = () => {
  const logoutFromAll = async () => {
    const response = await logoutFromAllService();
    if (response.status === 200) {
      deleteAuthTokens();
      window.location.href = "/";
    } else {
      toast.error(response.data.error?.message);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to={"/dashboard"}>Dashboard</NavLink> &nbsp;
              <NavLink to={"/dashboard/todos"}>Todos</NavLink> &nbsp;&nbsp;
              <Link
                to={"#"}
                onClick={() => {
                  deleteAuthTokens();
                  window.location.href = "/";
                }}
              >
                Logout
              </Link>{" "}
              &nbsp;
              <Link
                to={"#"}
                onClick={() => {
                  logoutFromAll();
                }}
              >
                Logout from all
              </Link>{" "}
              &nbsp;
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
