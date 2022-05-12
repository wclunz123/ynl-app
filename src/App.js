import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Nav, Navbar, Dropdown } from "rsuite";
import { Container, Header, Content, Footer } from "rsuite";
import { CircularProgress } from "@mui/material";

import CustomFooter from "./Components/CustomFooter";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let routes = (
    <Routes>
      <Route path="/" exact></Route>
    </Routes>
  );

  return (
    <Router>
      <main>
        <Container>
          <Header>
            <Navbar appearance="inverse">
              <Navbar.Header>
                <a className="navbar-brand logo">BRAND</a>
              </Navbar.Header>
              <Navbar.Body>
                <Nav>
                  <Nav.Item>Home</Nav.Item>
                  <Nav.Item>News</Nav.Item>
                  <Nav.Item>Products</Nav.Item>
                  <Dropdown title="About">
                    <Dropdown.Item>Company</Dropdown.Item>
                    <Dropdown.Item>Team</Dropdown.Item>
                    <Dropdown.Item>Contact</Dropdown.Item>
                  </Dropdown>
                </Nav>
                <Nav pullRight>
                  <Nav.Item>Settings</Nav.Item>
                </Nav>
              </Navbar.Body>
            </Navbar>
          </Header>
          <Content>
            <Suspense
              fallback={
                <div className="center">
                  <CircularProgress disableShrink />
                </div>
              }
            >
              {routes}
            </Suspense>
            <div className="App">
              <h1>YNL Logistics</h1>
            </div>
          </Content>
          <Footer>
            <CustomFooter />
          </Footer>
        </Container>
      </main>
    </Router>
  );
}

export default App;
