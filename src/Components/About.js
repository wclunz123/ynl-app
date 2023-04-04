import React from "react";
import Mission from "../Images/ads1.jpg";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="mission-container">
        <img
          className="mission-image"
          src={Mission}
          alt="Mission"
          height={200}
        />
        <div className="mission-content">
          <h2>Our Mission</h2>
          <div>
            As a logistics company based in Malaysia, our mission is to provide
            exceptional logistics solutions to our customers, tailored to their
            unique needs and requirements. We strive to offer efficient and
            reliable transportation and supply chain services, while ensuring
            the highest levels of safety, sustainability, and customer
            satisfaction. 
            {/* We aim to become the go-to logistics partner for
            businesses of all sizes, offering a comprehensive range of services
            that enable our customers to streamline their operations, reduce
            costs, and improve their bottom line. */}
          </div>
        </div>
      </div>
      <div className="vision-container">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <div>
            Our vision is to become a leader in the logistics industry, not only
            in Malaysia but also in the global market. We believe in creating
            long-lasting partnerships with our customers, built on trust,
            transparency, and shared success. We are committed to investing in
            cutting-edge technology and innovative solutions that enhance our
            capabilities and enable us to meet the evolving needs of our
            customers. 
            {/* By providing reliable, efficient, and sustainable
            logistics services, we strive to contribute to the growth and
            prosperity of the Malaysian economy and beyond. */}
          </div>
        </div>
        <img
          className="vision-image"
          src={Mission}
          alt="Vission"
          height={200}
        />
      </div>
    </section>
  );
};

export default About;
