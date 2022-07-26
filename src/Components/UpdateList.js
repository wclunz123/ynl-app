import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Modal } from "rsuite";
import News from "./News";
import axios from "axios";

import "./UpdateList.css";

const UpdateList = (props) => {
  const [newsList, setNewsList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState();

  useEffect(() => {
    getNewsfeedList();
  }, []);

  const getNewsfeedList = async () => {
    let response = await axios.get("http://localhost:3000/api/news/");
    if (response?.status === 200) {
      console.log(JSON.stringify(response.data));
      setNewsList(response.data);
    }
  }

  const addNewsSubmitHandler = async () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("description").value;

    if (title === "" || desc === "" ) { 
      document.getElementById("alertMessage").innerHTML = "Please insert appropriate value.";
      return;
    }

    let response = await axios.post("http://localhost:3000/api/news/create", { title, desc });
    if (response?.status === 200) { 
      console.log(JSON.stringify(response.data));
      setNewsList((prevState) => [ ...prevState, response.data[0]]);
    }
    setModalOpen(false);
  };

  const deleteNewsSubmitHandler = async (id) => {
    console.log("DELETING: " + id);
    let response = await axios.delete(`http://localhost:3000/api/news/delete/${id}`);
    if (response?.status === 200) {
      console.log(JSON.stringify(response.data));
      setNewsList((prevState) => [...prevState.filter((item) => item.newsfeedId !== id)]);
    }
  };

  return (
    <section id="updateNews" className="updateNews">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Add New Updates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="my-4 mx-4" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" />
            </Form.Group>
            <Form.Group className="my-2 mx-4" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" />
            </Form.Group>
            <div id="alertMessage" className="mx-4" style={{ color: "red" }}></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mx-2"
            variant="primary"
            onClick={addNewsSubmitHandler}
          >
            Confirm
          </Button>
          <Button
            className="mx-2"
            variant="light"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex flex-row justify-content-between">
        <h4 className="mb-4">News Update</h4>
        <Button
          className="my-auto"
          variant="primary"
          onClick={() => setModalOpen(true)}
        >
          Add Updates
        </Button>
      </div>
      {newsList.map((item, idx) => {
        console.log(JSON.stringify(item));
        return (
          <News key={idx} data={item} onDelete={deleteNewsSubmitHandler} />
        );
      })}
      {newsList && newsList.length === 0 && (
        <div>There are no news on your website.</div>
      )}
    </section>
  );
};

export default UpdateList;
