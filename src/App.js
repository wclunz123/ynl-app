import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Container, Header, Content, Footer } from "rsuite";
import { CircularProgress } from "@mui/material";

import About from "./Components/About";
import Tracker from "./Components/Tracker";
import NavigationBar from "./Components/Navigation/NavigationBar";
import CustomFooter from "./Components/CustomFooter";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./Components/Home";

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
            <NavigationBar />
          </Header>
          <Content>
            {/* <Suspense
              fallback={
                <div className="center">
                  <CircularProgress disableShrink />
                </div>
              }
            >
              {routes}
            </Suspense> */}
            <Home />
            <Tracker />
            <About />
            {/* <img
                  src={Logo}
                  alt="logo"
                  width={200}
                  style={{
                    alignSelf: "center",
                  }}
                /> */}

            <section
              id="newsfeed"
              className="newsfeed"
              style={{
                height: "100vh",
              }}
            >
              <h1>News Feed</h1>
            </section>
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
