import React from "react";
import { Nav, Navbar, Button } from "rsuite";
import { OutlinedInput, TextField } from "@mui/material";
import FacebookLogo from "../../Images/facebook.png";
import WhatsAppLogo from "../../Images/whatsapp.png";
import { InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Logo from "../../Images/logo.png";
import "./NavigationBar.css";

const NavigationBar = (props) => {
  return (
    <Navbar appearance="subtle">
      <div
        className="d-flex flex-row justify-content-between"
        style={{ height: "100px", alignItems: "center" }}
      >
        <img className="mx-4" src={Logo} alt="logo" height={80} />
        <div href="#home">{props.title}</div>

        <Nav>
          <Nav.Item href="#home">Home</Nav.Item>
          <Nav.Item href="#about">About</Nav.Item>
          <Nav.Item href="#services">Services</Nav.Item>
          <Nav.Item href="#contact">News</Nav.Item>
          <Nav.Item href="#contact">Contact</Nav.Item>
        </Nav>

        <div
          className="d-flex flex-row justify-content-around"
          style={{
            margin: "auto 5%",
          }}
        >
          <a
            className="mx-4 my-auto"
            target="_blank"
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
          <a
            className="mx-2 me-4 my-auto"
            target="_blank"
            href="https://wa.me/60162002856"
          >
            <img
              height={25}
              src={WhatsAppLogo}
              alt="whatsapp"
              style={{
                cursor: "pointer",
              }}
            />
          </a>
          {/* <a
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
            </a> */}
          <OutlinedInput
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            endAdornment={
              <InputAdornment position="end">
                <SearchOutlinedIcon />
              </InputAdornment>
            }
            placeholder="Search keywords"
          />
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationBar;
