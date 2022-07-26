import React, { useState, useEffect } from "react";
import News from "./News";
import axios from "axios";
import "./Newsfeed.css";

const Newsfeed = (props) => {
  const [newsfeedList, setNewsfeedList] = useState([]);

  useEffect(() => {
    getNewsfeedList();
  }, [])

  const getNewsfeedList = async () => {
    try {
      let response = await axios.get("http://localhost:3000/api/news/");
      if (response?.status === 200) {
        console.log(JSON.stringify(response.data));
        setNewsfeedList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="newsfeed" className="newsfeed">
      <h1>Latest Updates</h1>
      <br />
      {newsfeedList && newsfeedList.length > 0 && newsfeedList.map((item, idx) => {
        return <News key={idx} data={item} />;
      })}
    </section>
  );
};

export default Newsfeed;
