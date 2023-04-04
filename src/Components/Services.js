import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomCard from "./CustomCard";
import Maslogo from "../Images/mas.png";
import Rayalogo from "../Images/raya.png";
import Ynllogo from "../Images/logo.png";

import "./Services.css";

const Services = (props) => {
  return (
    <section id="services" className="services">
      <h2 className="mb-4" style={{ color: "cadetblue", fontWeight: "700" }}>
        {props.data.title}
      </h2>
      <div className="services-description">{props.data.description}</div>
      <Row xs={1} md={2} className="g-4">
        {props.data.cards.map((item, idx) => {
          return (
            <Col key={idx}>
              <CustomCard data={item} />
            </Col>
          );
        })}
      </Row>
      <div className="logo-container">
        <div>Partnered with: </div>
        <img className="logo" src={Maslogo} height={120} />
        <img className="logo" src={Rayalogo} height={120} />
        <img className="logo" src={Ynllogo} height={120} />
      </div>
    </section>
  );
};

export default Services;
