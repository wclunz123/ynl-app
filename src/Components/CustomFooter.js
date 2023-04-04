import React from "react";

import Logo from "../Images/logo.png";

import FacebookLogo from "../Images/facebook.png";
import WhatsAppLogo from "../Images/whatsapp.png";
import InstaLogo from "../Images/instagram.png";
import "./CustomFooter.css";

const CustomFooter = (props) => {
  return (
    <footer className="footer px-4 py-4 bg-light">
      <div
        className="d-flex flex-column align-items-start justify-content-between w-75 mx-auto"
        style={{ height: "50vh " }}
      >
        <div className="d-flex flex-row justify-content-between w-100">
          <div>
            <img
              className="mb-auto p-2"
              height={200}
              width={200}
              src={props.data.company}
              alt="logo"
            />
          </div>
          <div className="d-flex flex-column justify-content-around my-auto">
            {props.data.logos.map((item, idx) => {
              return (
                <div key={idx} className="mb-4">
                  <img height={30} src={item.icon} alt={item.type} />
                  <span className="mx-4">{item.name}</span>
                </div>
              );
            })}
            {/* 
            <div className="mb-4">
              <img height={30} src={InstaLogo} alt="instagram" />
              <span className="mx-4">@ynllogistics</span>
            </div>

            <div className="mb-4">
              <img height={30} src={WhatsAppLogo} alt="whatsapp" />
              <span className="mx-4">+6016 200 2859</span>
            </div> */}
          </div>
        </div>
        <h2>Thank you for supporting us!</h2>
        <div className="copyrights">
          <span>{props.data.copyright}</span>
          <div>{props.data.rights}</div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
