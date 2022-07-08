import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Modal } from "rsuite";
import News from "./News";

import "./UpdateList.css";

const dummyData = [
  {
    id: 1,
    title: "NASDAQ dropping all time low.",
    description: "Collapsing of the tech stock index is awesome.",
    date: "21/3/2022",
    time: "10:52AM",
  },
  {
    id: 2,
    title: "DJ30 dropping all time low.",
    description: "Collapsing of the tech stock index is awesome.",
    date: "22/3/2022",
    time: "05:06AM",
  },
  {
    id: 3,
    title: "SPX500 dropping all time low.",
    description: "Collapsing of the tech stock index is awesome.",
    date: "23/3/2022",
    time: "06:12PM",
  },
];

const UpdateList = (props) => {
  const [newsList, setNewsList] = useState(dummyData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState();

  const addNewsSubmitHandler = async () => {
    let title = document.getElementById("title").value;
    let desc = document.getElementById("description").value;

    if (title === "" || desc === "" ) { 
      document.getElementById("alertMessage").innerHTML = "Please insert appropriate value.";
      return;
    }

    setNewsList((prevState) => [
      {
        id: 4,
        title,
        description: desc,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toISOString().split("T")[1],
      },
      ...prevState,
    ]);
    setModalOpen(false);
  };

  const deleteNewsSubmitHandler = async (id) => {
    setNewsList((prevState) => [...prevState.filter((item) => item.id !== id)]);
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
