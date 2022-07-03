import React, { useContext } from "react";
import { AuthContext } from "../../Hook/auth-context";
import { Nav, Navbar, Dropdown, ButtonToolbar, Button } from "rsuite";

import FacebookLogo from "../../Images/facebook.png";
import WhatsAppLogo from "../../Images/whatsapp.png";
import InstaLogo from "../../Images/instagram.png";
import Logo from "../../Images/logo.png";
import "./NavigationBar.css";

const NavigationBar = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        width: "100%",
        height: "60px",
        zIndex: "1000",
        backgroundColor: "#fff",
      }}
    >
      <Navbar appearance="subtle">
        <div className="d-flex flex-row justify-content-between">
          <Navbar.Brand>
            <div className="d-flex flex-row">
              <img className="mx-4" src={Logo} alt="logo" height={30} />
              <div href="#home">{props.title}</div>
            </div>
          </Navbar.Brand>
          <Nav>
            <Nav.Item href="#home">Home</Nav.Item>
            <Nav.Item href="#track">Track</Nav.Item>
            <Nav.Item href="#about">About Us</Nav.Item>
            <Nav.Item href="#newsfeed">Updates</Nav.Item>
          </Nav>

          <div
            className="d-flex flex-row justify-content-around"
            style={{
              margin: "auto 3%",
            }}
          >
            <a
              className="mx-2 my-auto"
              href="https://www.facebook.com/YNL-Logistics-%E4%B8%AD%E5%9B%BD%E4%BB%A3%E8%BF%90-104060805564363"
            >
              <img
                height={25}
                src={FacebookLogo}
                alt="facebook"
                style={{
                  cursor: "pointer",
                }}
              />
            </a>
            <a className="mx-2 my-auto" href="https://wa.me/60162002856">
              <img
                height={25}
                src={WhatsAppLogo}
                alt="whatsapp"
                style={{
                  cursor: "pointer",
                }}
              />
            </a>
            <a
              className="mx-2 me-4 my-auto"
              href="https://www.facebook.com/YNL-Logistics-%E4%B8%AD%E5%9B%BD%E4%BB%A3%E8%BF%90-104060805564363"
            >
              <img
                height={25}
                src={InstaLogo}
                alt="insta"
                style={{
                  cursor: "pointer",
                }}
              />
            </a>
            <Button color="green" appearance="primary">
              <span>+6016 200 2856</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
