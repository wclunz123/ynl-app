import React from "react";

import { Card } from "react-bootstrap";
import Logo from "../Images/parcel.jpg";

const CustomCard = (props) => {
  return (
    <div className="d-flex flex-column">
      <img
        src={props.data.image}
        alt="logo"
        height={200}
        width={200}
        className="mb-4"
        style={{ margin: "auto" }}
      />
      <h3 className="p-2" style={{ color: "#a5a5a5" }}>
        {props.data.title}
      </h3>
      <p className="px-4" style={{ fontSize: "120%" }}>
        {props.data.description}
      </p>
    </div>
  );
};

export default CustomCard;
