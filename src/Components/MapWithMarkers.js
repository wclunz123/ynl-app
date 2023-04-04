import React from "react";
import GoogleMapReact from "google-map-react";
import MarkerLogo from "../Images/marker.png";
import "./MapWithMarkers.css";

const Marker = ({ text }) => (
  <div
    style={{
      position: "relative",
      top: "-20px",
      left: "-20px",
      width: "40px",
      height: "40px",
    }}
  >
    <img
      src={MarkerLogo}
      alt="Marker"
      style={{ height: "35px" }}
    />
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      {/* <span style={{ fontSize: "16px", fontWeight: "bold" }}>{text}</span> */}
    </div>
  </div>
);

const MapWithMarkers = ({ apiKey, lat, lng, locations }) => {
  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat, lng }}
        defaultZoom={8}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            lat={location.lat}
            lng={location.lng}
            text={location.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapWithMarkers;
