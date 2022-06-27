import React from "react";

const News = (props) => {
  return (
    <div
      className="d-flex flex-column border border-light rounded p-4 mb-4"
    >
      <h6 style={{ fontWeight: "bolder" }}>{props.data.title}</h6>
      <div className="d-flex flex-row justify-content-between">
        <span>{props.data.description}</span>
        <span>{props.data.date}</span>
      </div>
    </div>
  );
};

export default News;
