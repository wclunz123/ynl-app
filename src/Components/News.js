import React, { useContext } from "react";
import { X } from "react-bootstrap-icons";

import { useSelector } from "react-redux";
import { selectToken } from "../Redux/authSlice";

import "./News.css";

const News = (props) => {
  const token = useSelector(selectToken);

  return (
    <div className="d-flex flex-column border border-light rounded p-4 mb-4">
      <div className="d-flex flex-row justify-content-between">
        <h6 style={{ fontWeight: "bolder" }}>{props.data.newsfeedTitle}</h6>
        {token && (
          <X
            className="delete-marker my-auto"
            onClick={() => props.onDelete(props.data.newsfeedId)}
          />
        )}
      </div>
      <div className="d-flex flex-row justify-content-between">
        <span>{props.data.newsfeedBody}</span>
        <span>{props.data.newsfeedDate.split("T")[0] + " " + props.data.newsfeedDate.split("T")[1].split(".")[0]}</span>
      </div>
    </div>
  );
};

export default News;
