import React from "react";
import { Header, Carousel, Divider } from "rsuite";
import { useSelector } from "react-redux";
import { selectToken } from "../Redux/authSlice";
import Logo from "../Images/logo.jpg";
import NavigationBar from "./Navigation/NavigationBar";
import AdminNavBar from "./Navigation/AdminNavBar";

import CallIcon from "@mui/icons-material/Call";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ApartmentIcon from "@mui/icons-material/Apartment";

import "./Home.css";

const Home = (props) => {
  const token = useSelector(selectToken);

  const [placement, setPlacement] = React.useState("bottom");
  const [shape, setShape] = React.useState("dot");

  return (
    <section id="home" className="home d-flex flex-column">
      <div
        style={{
          position: "fixed",
          top: "0",
          width: "100%",
          zIndex: "1000",
          backgroundColor: "#fff",
        }}
      >
        {!token ? (
          <NavigationBar title={props.company} />
        ) : (
          <AdminNavBar title={props.company} />
        )}
      </div>
      <div className="carousel-container">
        <Carousel
          key={`${placement}.${shape}`}
          placement={placement}
          shape={shape}
          className="custom-slider"
          autoplay
          autoplayInterval={4000}
          style={{ height: "600px" }}
        >
          {props.carousel.map((item, idx) => {
            return <img key={idx} src={item.image} />;
          })}
        </Carousel>
      </div>
      <div className="company-container p-3">
        <div className="company-info company-contact">
          <h5>
            <CallIcon /> CALL US
          </h5>
          <div>+60 8745 2188</div>
          <div>+6012 834 3511 (WhatsApp)</div>
          <a href="mailto: hkcargo88@gmail.com">hkcargo88@gmail.com</a>
        </div>
        <div className="company-info company-operating-hours">
          <h5>
            <AccessTimeFilledIcon /> OPERATING HOURS
          </h5>
          <div>Mon-Fri: 8:00AM - 4:30PM</div>
          <div>Saturday: 8:00AM - 12:30PM</div>
          <div>Sunday/PH: Closed</div>
        </div>
        <div className="company-info company-address">
          <h5>
            <ApartmentIcon /> ADDRESSES
          </h5>
          <div className="address-container">
            <div className="address address-1 px-3">
              <h6>LABUAN (HQ)</h6>
              Lot 53, Block E, O&G SEC Lazenda Warehouse, Jalan Rancha-Rancha
            </div>
            <div className="address address-2 px-3">
              <h6>TAWAU</h6>
              Maskargo Building KM33, Jalan Apas, Airport Tawau, Sabah
            </div>
            <div className="address address-3 px-3">
              <h6>SANDAKAN</h6>
              Maskargo Building Sandakan Airport Batu 7, Jalan Airport, Sandakan
            </div>
          </div>
        </div>
      </div>

      {/* <div className="d-flex flex-row justify-content-between my-4 divider-summary">
        <img src={Logo} alt="logo" width={100} />

        {props.data.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Divider vertical style={{ height: "90px" }} />
              <div className="d-flex flex-column">
                <div className="red-bold">{item.top}</div>
                <span className="black-font">{item.bottom}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div> */}
    </section>
  );
};

export default Home;
