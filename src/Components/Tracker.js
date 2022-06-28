import React from "react";
import { Button, Input } from "rsuite";
import TrackResult from "./TrackResult";
import "./Tracker.css";

const Tracker = (props) => {
  return (
    <section id="track" className="track">
      <div className="d-flex flex-column justify-content-center my-4 tracker-container">
        <div className="text-danger font-weight-bold mt-2 mb-4 tracker-title">
          {props.data.title}
        </div>
        <div className="d-flex flex-row mb-4">
          <Input
            type="text"
            placeholder={props.data.placeholder}
            className="tracker-input"
          />
          <Button className="tracker-button" color="yellow" appearance="primary">
            {props.data.button}
          </Button>
        </div>
        <TrackResult />
      </div>
    </section>
  );
};

export default Tracker;
