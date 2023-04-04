import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";

import Home from "./Components/Home";
import About from "./Components/About";
import Services from "./Components/Services";
import CustomFooter from "./Components/CustomFooter";
import Login from "./Components/Login";
import Contact from "./Components/Contact";
import OrderList from "./Components/OrderList";
import Order from "./Components/Order";
import UpdateList from "./Components/UpdateList";
import Map from "./Components/Map";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { selectToken } from "./Redux/authSlice";

import Data from "./data";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const token = useSelector(selectToken);

  let routes = (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <div>
            <Home carousel={Data.carousel} data={Data.tabs} />
            <About />
            <Services data={Data.about} />
            {/* <Tracker data={Data.tracker} /> */}
            {/* <Newsfeed /> */}
            <Contact />
          </div>
        }
      />
      <Route path="/login" exact element={<Login />} />
      <Route path="/admin/order" exact element={<OrderList />} />
      <Route path="/admin/order/item" exact element={<Order />} />
      <Route path="/admin/newsfeed" exact element={<UpdateList />} />
    </Routes>
  );

  return (
    <Router>
      <main>
        <Container>
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
