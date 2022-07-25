import React, { useState, useEffect } from "react";
import { Table, Pagination } from "rsuite";
import { Form, Row, Col, Button } from "react-bootstrap";
import { Modal } from "rsuite";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "react-bootstrap-icons";

import "./Order.css";

const dummyData = [
  {
    id: 1,
    statusDate: "2022-06-15",
    statusTime: "17:20:55",
    statusCountry: "SINGAPORE",
    statusDescription: "Immigration clearance.",
  },
  {
    id: 2,
    statusDate: "2022-06-18",
    statusTime: "23:11:45",
    statusCountry: "MALAYSIA",
    statusDescription: "Arrived in destination country.",
  },
  {
    id: 3,
    statusDate: "2022-07-11",
    statusTime: "09:56:12",
    statusCountry: "MALAYSIA",
    statusDescription: "Out for delivery.",
  },
];

const validationSchema = Yup.object().shape({
  orderId: Yup.string().required(),
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
  const [orderStatusList, setOrderStatusList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    reset(location.state);
    getOrderStatusList(location.state.orderId);
  }, []);

  const getOrderStatusList = async (id) => {
    let response = await axios.get(`http://localhost:3000/api/track/${id}`);
    if (response?.status === 200) {
      response.data.map((item) => {
        item.statusTime = item.statusDateTime.split("T")[1].split(".")[0];
        item.statusDate = item.statusDateTime.split("T")[0];
      })
      setOrderStatusList(response.data);
    }
  };

  const createOrderHandler = (data) => {
    console.log("SUBMITTED ORDER: " + JSON.stringify(data));
  };

  const deleteOrderHandler = async () => {
    console.log("DELETING: " + location.state.orderId);
    let response = await axios.delete(
      `http://localhost:3000/api/order/delete/${location.state.orderId}`
    );
    if (response?.status === 200) {
      // toast.success("Successfully added new order status.");
      console.log("Success.");
      navigate("/admin/order", { replace: true });
    } else {
      console.log("Something went wrong.");
    }
    // setOrderStatusList((prevState) => [
    //   ...prevState.filter((item) => item.orderId !== location.state.orderId),
    // ]);
  };

  const deleteStatusHandler = async (data) => {
    console.log("DELETE STATUS ID: " + JSON.stringify(data.orderStatusId));
    let response = await axios.delete(
      `http://localhost:3000/api/track/delete/${data.orderStatusId}`
    );

    if (response?.status === 200) {
      // toast.success("Successfully remove order status.");
      console.log("Success");
    } else {
      console.log("Something went wrong.");
    }

    setOrderStatusList((prevState) => [
      ...prevState.filter((item) => item.orderStatusId !== data.orderStatusId),
    ]);
  };

  const addStatusSubmitHandler = async () => {
    let countryDom = document.getElementById("statusCountry");
    let trackerDom = document.getElementById("statusDescription");
    if (
      countryDom.options[countryDom.selectedIndex].value === "-1" ||
      trackerDom.value === ""
    ) {
      document.getElementById("alertMessage").innerHTML =
        "Please enter appropriate value.";
      return;
    }

    let data = {
      orderId: location.state.orderId,
      statusCountry: countryDom.options[countryDom.selectedIndex].value,
      statusDescription: trackerDom.value,
    };

    let response = await axios.post(
      "http://localhost:3000/api/track/add",
      data
    );

    if (
      response !== null &&
      response !== undefined &&
      response.status === 200
    ) {
      // toast.success("Successfully added new order status.");
      console.log("Success.");
      console.log(JSON.stringify(response.data));
      response.data.map((item) => {
        item.statusTime = item.statusDateTime.split("T")[1].split(".")[0];
        item.statusDate = item.statusDateTime.split("T")[0];
      })
      setOrderStatusList((prevState) => [...prevState, response.data[0]]);
    } else console.log("Something went wrong.");
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
            <Form.Group controlId="statusDescription" className="my-2">
              <Form.Label>Tracker</Form.Label>
              <Form.Control
                type="text"
                required
                name="statusDescription"
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
            onClick={() => navigate("/admin/order", { replace: true })}
          >
            Return
          </Button>
        </div>
      </div>
      <div>
        <Form id="addUserForm" onSubmit={handleSubmit(createOrderHandler)}>
          <div className="d-flex flex-column my-2">
            <Row>
              <Form.Group as={Col} controlId="orderId" className="my-2">
                <Form.Label>Order Number</Form.Label>
                <Controller
                  control={control}
                  name="orderId"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Form.Control
                      type="text"
                      className="form-input-row"
                      value={value}
                      readOnly
                      onBlur={onBlur}
                      onChange={onChange}
                      isInvalid={errors.orderId}
                    />
                  )}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.orderId?.message}
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
            </Row>
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
              <Cell dataKey="statusDescription" />
            </Column>
            <Column fixed="right">
              <HeaderCell>Action</HeaderCell>
              <Cell>
                {(rowData) => {
                  const deleteAction = () => deleteStatusHandler(rowData);
                  return (
                    <X
                      className="delete-marker my-auto"
                      onClick={deleteAction}
                    />
                  );
                }}
              </Cell>
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
