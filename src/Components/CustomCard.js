import React from "react";

import "./CustomCard.css";

const CustomCard = (props) => {
  return (
    <div className="d-flex flex-column">
      <img
        src={props.data.image}
        alt="logo"
        height={300}
        // width={200}
        className="services-image mb-4"
        style={{ margin: "auto" }}
      />
      <h3 className="p-2" style={{ color: "#a5a5a5" }}>
        {props.data.title}
      </h3>
      <p className="px-4" style={{ width: "80%", marginLeft: "10%", fontSize: "100%", textAlign: "justify" }}>
        {props.data.description}
      </p>
    </div>
  );
};

export default CustomCard;
