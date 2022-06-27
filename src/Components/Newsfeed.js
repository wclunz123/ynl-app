import React from "react";

import News from "./News";
import "./Newsfeed.css";

const Newsfeed = (props) => {
  return (
    <section id="newsfeed" className="newsfeed">
      <h1>Latest Updates</h1>
      <br />
      {props.data.map((item, idx) => {
        return <News key={idx} data={item} />;
      })}
    </section>
  );
};

export default Newsfeed;
