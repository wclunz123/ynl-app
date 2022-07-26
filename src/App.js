import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Header, Content, Footer } from "rsuite";

import Home from "./Components/Home";
import About from "./Components/About";
import Tracker from "./Components/Tracker";
import Newsfeed from "./Components/Newsfeed";
import NavigationBar from "./Components/Navigation/NavigationBar";
import AdminNavBar from "./Components/Navigation/AdminNavBar";
import CustomFooter from "./Components/CustomFooter";
import Login from "./Components/Login";
import OrderList from "./Components/OrderList";
import Order from "./Components/Order";
import UpdateList from "./Components/UpdateList";

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
            <Tracker data={Data.tracker} />
            <About data={Data.about} />
            <Newsfeed />
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
          <Header>
            {!token ? (
              <NavigationBar title={Data.company} />
            ) : (
              <AdminNavBar title={Data.company} />
            )}
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
