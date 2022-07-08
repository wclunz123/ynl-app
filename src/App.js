import React, { Suspense, useEffect } from "react";
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
import Admin from "./Components/Admin";
import OrderList from "./Components/OrderList";
import Order from "./Components/Order";
import UpdateList from "./Components/UpdateList";

import { CircularProgress } from "@mui/material";
import { AuthContext } from "./Hook/auth-context";
import { useAuth } from "./Hook/auth-hook";

import Data from "./data";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

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
      />
      <Route path="/login" exact element={<Login />} />
      {/* <Route path="/admin" exact element={<Admin />} /> */}
      {token && <Route path="/order" exact element={<OrderList />} /> }
      {token && <Route path="/order/item" exact element={<Order /> } /> }
      {token && <Route path="/updates" exact element={<UpdateList />} /> }
      
      {/* {token && <Route path="/admin" exact element={<Admin />} /> }
      {token && <Route path="/order" exact element={<OrderList />} /> }  */}
      {/* {token && <Route path="/news" exact element={<NewsList />} /> }  */}
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>
          <Container>
            <Header>
              {console.log("IS LOGGED IN: " + token)}
              {!token && <NavigationBar title={Data.company} />}
              {token && <AdminNavBar title={Data.company} />}
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
    </AuthContext.Provider>
  );
}

export default App;
