import React, { useState } from "react";
import { Button, Input } from "rsuite";
import TrackResult from "./TrackResult";
import axios from "axios";
import "./Tracker.css";

const Tracker = (props) => {
  const [searchOrder, setSearchOrder] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const searchSubmitHandler = async (e) => {
    setLoading(true);
    setSearchResult([]);
    try {
      let response = await axios.post(
        `http://localhost:3000/api/track/search`,
        {
          searchOrder,
        }
      );

      if (response?.status === 200) {
        response.data.map((item) => {
          item.statusTime = item.statusDateTime.split("T")[1].split(".")[0];
          item.statusDate = item.statusDateTime.split("T")[0];
        });
        setSearchResult(response.data);
        setLoading(false);
        setError("");
      }
    } catch (err) {
      setError("Order not found. Please try again later.");
      setLoading(false);
    }
  };

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
            onChange={(e) => setSearchOrder(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") searchSubmitHandler();
            }}
          />
          <Button
            className="tracker-button"
            color="yellow"
            appearance="primary"
            onClick={searchSubmitHandler}
          >
            {props.data.button}
          </Button>
        </div>
        <div className="alertMessage text-danger">{error}</div>
        {searchResult && searchResult.length > 0 && (
          <TrackResult result={searchResult} loading={loading} />
        )}
      </div>
    </section>
  );
};

export default Tracker;
