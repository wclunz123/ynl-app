import React from "react";
import Map from "../Components/Map";
import { Button } from "react-bootstrap";

import "./Contact.css";

const API_KEY = "AIzaSyDXHtisNj0Mw8rXiCM8eMO7lZ4e1V6vW2s";

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <Map API_KEY={API_KEY} />
      <form className="form-contact">
        <div className="form-grid mb-4">
          <h3>Contact Us</h3>
          <div></div>
        </div>
        <div className="form-grid">
          <label htmlFor="name">
            Name: <span id="required">*</span>
          </label>
          <input id="name" type="text" placeholder="Name" />
          <br />
        </div>
        <div className="form-grid">
          <label htmlFor="email">
            Email: <span id="required">*</span>
          </label>
          <input id="email" type="email" placeholder="Email" />
          <br />
        </div>
        <div className="form-grid">
          <label htmlFor="subject">Subject: </label>
          <input id="subject" type="text" placeholder="Subject" />
          <br />
        </div>
        <div className="form-grid">
          <label htmlFor="message">Your Message: </label>
          <textarea
            id="message"
            type="text"
            placeholder="Ready to be your listener"
          />
          <br />
        </div>
        <div className="form-grid">
          <div></div>
          <div className="buttons-column">
            <Button
              id="submit-button"
              className="me-4"
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
            <Button id="submit-button" type="submit" variant="secondary">
              Clear
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Contact;
