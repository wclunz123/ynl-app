import React, { useContext } from "react";
import { X } from "react-bootstrap-icons";

import { AuthContext } from "../Hook/auth-context";

import "./News.css";

const News = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div className="d-flex flex-column border border-light rounded p-4 mb-4">
      <div className="d-flex flex-row justify-content-between">
        <h6 style={{ fontWeight: "bolder" }}>{props.data.newsfeedTitle}</h6>
        {auth.token && (
          <X
            className="delete-marker my-auto"
            onClick={() => props.onDelete(props.data.newsfeedId)}
          />
        )}
      </div>
      <div className="d-flex flex-row justify-content-between">
        <span>{props.data.newsfeedBody}</span>
        <span>{props.data.newsfeedDate}</span>
      </div>
    </div>
  );
};

export default News;
