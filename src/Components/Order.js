import React, { useState, useEffect } from "react";
import { Table, Pagination } from "rsuite";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Modal } from "rsuite";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "./Order.css";

const dummyData = [
  {
    id: 1,
    statusDate: "15/06/2022",
    statusTime: "17:20:55",
    statusCountry: "SINGAPORE",
    statusTracker: "Immigration clearance.",
  },
  {
    id: 2,
    statusDate: "18/06/2022",
    statusTime: "23:11:45",
    statusCountry: "MALAYSIA",
    statusTracker: "Arrived in destination country.",
  },
  {
    id: 3,
    statusDate: "12/07/2022",
    statusTime: "09:56:12",
    statusCountry: "MALAYSIA",
    statusTracker: "Out for delivery.",
  },
];

const validationSchema = Yup.object().shape({
  orderNo: Yup.string().required(),
  orderStatus: Yup.string().required(),
  orderDate: Yup.string().required(),
  clientName: Yup.string().required(),
  clientAddress: Yup.string().required(),
  description: Yup.string().required(),
});

const Order = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { HeaderCell, Cell, Column } = Table;
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [isLoading, setIsLoading] = useState(false);
  const [orderStatusList, setOrderStatusList] = useState(dummyData);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(location.state);
    reset(location.state);
  }, []);

  const getOrderStatusList = async (id) => {
    let response = await axios.get(`http://localhost:3000/api/order/${id}`);
    if (response !== undefined && response !== null && response.status === 200)
      console.log("RESULT: " + JSON.stringify(response.data));
  };

  const createOrderHandler = (data) => {
    console.log("SUBMITTED ORDER: " + JSON.stringify(data));
  };

  const deleteOrderHandler = async () => {
    let response = await axios.delete(
      `http://localhost:3000/api/order/delete/${location.state.orderId}`
    );
    // if (response !== null && response !== undefined && response.status === 200) {
    //     // toast.success("Successfully added new order status.");
    //     console.log("Success.");
    // } else {
    //     console.log("Something went wrong.");
    // }
    // setOrderStatusList((prevState) => [ ...prevState.filter((item) => item.orderId !== location.state.orderId)]);
  };

  const addStatusSubmitHandler = async () => {
    let countryDom = document.getElementById("statusCountry");
    let trackerDom = document.getElementById("statusTracker");
    if (
      countryDom.options[countryDom.selectedIndex].value === "-1" ||
      trackerDom.value === ""
    ) {
      document.getElementById("alertMessage").innerHTML =
        "Please enter appropriate value.";
      return;
    }

    let data = {
      statusDate: new Date().toISOString().split("T")[0],
      statusTime: new Date().toISOString().split("T")[1],
      statusCountry: countryDom.options[countryDom.selectedIndex].value,
      statusTracker: trackerDom.value,
    };

    console.log(JSON.stringify(data));

    // let response = await axios.post("http://localhost:3000/api/order/status", data);
    // if (response !== null && response !== undefined && response.status === 200) {
    //     // toast.success("Successfully added new order status.");
    //     console.log("Success.");
    // } else {
    //     console.log("Something went wrong.");
    // }

    setOrderStatusList((prevState) => [...prevState, data]);
    setModalOpen(false);
  };

  return (
    <section id="order" className="order">
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Add New Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="statusCountry" className="my-4">
              <Form.Label>Country</Form.Label>
              <Form.Select name="statusCountry" className="form-input-row">
                <option value="-1">-Select Country-</option>
                <option value="MALAYSIA">Malaysia</option>
                <option value="SINGAPORE">Singapore</option>
                <option value="CHINA">China</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="statusTracker" className="my-2">
              <Form.Label>Tracker</Form.Label>
              <Form.Control
                type="text"
                required
                name="statusTracker"
                className="form-input-row"
                placeholder="Status"
              />
            </Form.Group>
            <div id="alertMessage" style={{ color: "red" }}></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mx-2"
            variant="success"
            onClick={addStatusSubmitHandler}
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
        <h4 className="mb-4">Order</h4>
        <div className="d-flex flex-row">
          <Button
            variant="danger"
            className="my-auto mx-2"
            onClick={deleteOrderHandler}
          >
            Delete
          </Button>
          <Button
            variant="warning"
            className="my-auto"
            onClick={() => navigate("/order", { replace: true })}
          >
            Return
          </Button>
        </div>
      </div>
      <div>
        <Form id="addUserForm" onSubmit={handleSubmit(createOrderHandler)}>
          <div className="d-flex flex-column my-2">
            <Row>
              <Form.Group as={Col} controlId="orderNo" className="my-2">
                <Form.Label>Order Number</Form.Label>
                <Controller
                  control={control}
                  name="orderNo"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="text"
                      className="form-input-row"
                      value={value}
                      readOnly
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.orderNo}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderNo?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="orderStatus" className="my-2">
                <Form.Label>Order Status</Form.Label>
                <Controller
                  control={control}
                  name="orderStatus"
                  render={({ field: { value } }) => (
                    <Form.Select
                      value={value ? value : ""}
                      className="form-input-row"
                      onChange={(e) => {
                        setValue("orderStatus", e.target.value, {
                          shouldValidate: true,
                        });
                      }}
                      isInvalid={errors.orderStatus}
                    >
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </Form.Select>
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderStatus?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="orderDate" className="my-2">
                <Form.Label>Order Date</Form.Label>
                <Controller
                  control={control}
                  name="orderDate"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="date"
                      className="form-input-row"
                      readOnly
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.orderDate}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderDate?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group as={Col} controlId="clientName" className="my-2">
                <Form.Label>Client Name</Form.Label>
                <Controller
                  control={control}
                  name="clientName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="text"
                      className="form-input-row"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.clientName}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientName?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Row>
            {/* <Row>
              <Form.Group as={Col} controlId="clientAddress" className="my-2">
                <Form.Label>Client Address</Form.Label>
                <Controller
                  control={control}
                  name="clientAddress"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="text"
                      className="form-input-row"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.clientAddress}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.clientAddress?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="text"
                      className="form-input-row"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.description}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}
          </div>
        </Form>

        <div className="d-flex flex-row justify-content-between">
          <h6 className="my-4"> Order Status</h6>
          <div className="d-flex flex-row my-auto">
            <Button
              className="mx-2"
              variant="primary"
              onClick={() => setModalOpen(true)}
            >
              Add Status
            </Button>
          </div>
        </div>
        {orderStatusList && orderStatusList.length > 0 ? (
          <Table height={420} data={orderStatusList} loading={isLoading}>
            <Column flexGrow={1}>
              <HeaderCell>Date</HeaderCell>
              <Cell dataKey="statusDate" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Time</HeaderCell>
              <Cell dataKey="statusTime" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Country</HeaderCell>
              <Cell dataKey="statusCountry" />
            </Column>
            <Column flexGrow={2}>
              <HeaderCell>Tracker</HeaderCell>
              <Cell dataKey="statusTracker" />
            </Column>
          </Table>
        ) : (
          <div>There are no status available.</div>
        )}
      </div>
    </section>
  );
};

export default Order;
