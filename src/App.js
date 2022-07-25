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
// import Admin from "./Components/Admin";
import OrderList from "./Components/OrderList";
import Order from "./Components/Order";
import UpdateList from "./Components/UpdateList";

import { CircularProgress } from "@mui/material";
import { AuthContext } from "./Hook/auth-context";
import { useAuth } from "./Hook/auth-hook";

import Data from "./data";
import axios from "axios";

import "rsuite/styles/index.less";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();
  const [searchOrder, setSearchOrder] = useState();
  const [searchResult, setSearchResult] = useState();

  const submitSearchOrderHandler = async () => {
    let response = await axios.post(
      `http://localhost:3000/api/track/search`,
      searchOrder
    );

    if (response?.status === 200) setSearchResult(response.data);
    else console.log("Error retrieving order");
    
  };

  let routes = (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <div>
            <Home carousel={Data.carousel} data={Data.tabs} />
            <Tracker
              data={Data.tracker}
              setSearchOrder={setSearchOrder}
              submitSearch={submitSearchOrderHandler}
              orderResult={searchResult}
            />
            <About data={Data.about} />
            <Newsfeed data={Data.updates} />
          </div>
        }
      />
      <Route path="/login" exact element={<Login />} />

      {/* <Route path="/admin" exact element={<Admin />} /> */}
      {/* {token && <Route path="/order" exact element={<OrderList />} />}
      {token && <Route path="/order/item" exact element={<Order />} />}
      {token && <Route path="/updates" exact element={<UpdateList />} />} */}

      <Route path="/admin/order" exact element={<OrderList />} />
      <Route path="/admin/order/item" exact element={<Order />} />
      <Route path="/admin/newsfeed" exact element={<UpdateList />} />
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
