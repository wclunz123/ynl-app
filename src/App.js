import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";

import Home from "./Components/Home";
import About from "./Components/About";
import Tracker from "./Components/Tracker";
import Newsfeed from "./Components/Newsfeed";
import NavigationBar from "./Components/Navigation/NavigationBar";
import CustomFooter from "./Components/CustomFooter";
import Login from "./Components/Login";

import { CircularProgress } from "@mui/material";

import Data from "./data";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  let routes = (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <div>
            <Home carousel={Data.carousel} data={Data.tabs} />
            <Tracker data={Data.tracker} />
            <About data={Data.about} />
            <Newsfeed data={Data.updates} />
          </div>
        }
      ></Route>
      <Route path="/login" exact element={<Login />}></Route>
    </Routes>
  );

  return (
    <Router>
      <main>
        <Container>
          <Header>
            <NavigationBar title={Data.company} />
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
          </Content>
          <Footer>
            <CustomFooter data={Data.footer} />
          </Footer>
        </Container>
      </main>
    </Router>
  );
}

export default App;