import React from "react";

import { Row, Col } from "react-bootstrap";
import CustomCard from "../Components/CustomCard";

import "./About.css";

const About = (props) => {
  return (
    <section id="about" className="about">
      <h1 className="red-bold mb-4">{props.data.title}</h1>
      <div className="about-description">{props.data.description}</div>
      <Row xs={1} md={3} className="g-4">
        {props.data.cards.map((item, idx) => {
          return (
            <Col key={idx}>
              <CustomCard data={item}/>
            </Col>
          );
        })}
      </Row>
    </section>
  );
};

export default About;
