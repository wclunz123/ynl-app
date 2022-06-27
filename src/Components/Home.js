import React from "react";
import { Carousel, Divider } from "rsuite";
import Image from "../Images/bg.jpeg";
import AnotherImage from "../Images/bg2.jpg";
import Logo from "../Images/logo.jpg";

import Ads0 from "../Images/ads0.png";
import Ads1 from "../Images/ads1.jpg";
import Ads2 from "../Images/ads2.png";
import Ads3 from "../Images/ads3.png";
import Ads4 from "../Images/ads4.png";

import "./Home.css";

const Home = (props) => {
  const [placement, setPlacement] = React.useState("bottom");
  const [shape, setShape] = React.useState("dot");

  return (
    <section id="home" className="home">
      <div className="carousel-container">
        <Carousel
          key={`${placement}.${shape}`}
          placement={placement}
          shape={shape}
          className="custom-slider"
          autoplay
          autoplayInterval={4000}
          style={{ height: "450px" }}
        >
          {props.carousel.map((item, idx) => {
            return <img key={idx} src={item.image} height="800" />;
          })}
        </Carousel>
      </div>

      <div className="d-flex flex-row justify-content-between my-4 divider-summary">
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
      </div>
    </section>
  );
};

export default Home;
