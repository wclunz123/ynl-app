import React from "react";

import MapWithMarkers from "./MapWithMarkers";

const Map = ({ API_KEY }) => {
  return (
    <MapWithMarkers
      apiKey={API_KEY}
      lat={5.250750663367341}
      lng={116.87981347670616}
      locations={[
        {
          lat: 5.8968206156906025,
          lng: 118.05996098027435,
          name: "Maskargo Sandakan",
        },
        {
          lat: 4.313638027762942,
          lng: 118.11141489667348,
          name: "Maskargo Tawau",
        },
        { lat: 5.272689772669616, lng: 115.2312473799708, name: "Labuan HQ" },
      ]}
    />
  );
};

export default Map;
