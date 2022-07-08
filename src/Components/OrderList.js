import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from "rsuite";
import { Form, Row, Col, Button } from "react-bootstrap";
import { PencilSquare, TrashFill } from "react-bootstrap-icons";
import { Modal } from "rsuite";
import axios from "axios";

import Order from "./Order";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./OrderList.css";

// mock data
const dummyData = [
  {
    idx: 1,
    orderNo: "YNL41024012",
    orderStatus: "Open",
    orderDate: "15-06-2022",
    clientName: "Lawrence Yoong",
    clientAddress: "276A Compassvale Bow #02-421 Singapore 502512",
    description: "",
  },
  {
    idx: 2,
    orderNo: "YNL410223242",
    orderStatus: "Open",
    orderDate: "25-06-2022",
    clientName: "Babi Yoong",
    clientAddress: "276A Compassvale Bow #02-421 Singapore 502512",
    description: "",
  },
  {
    idx: 3,
    orderNo: "YNL41024212",
    orderStatus: "Closed",
    orderDate: "15-06-2022",
    clientName: "Salad Yoong",
    clientAddress: "276A Compassvale Bow #02-421 Singapore 502512",
    description: "",
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

const OrderList = (props) => {
  const { HeaderCell, Cell, Column } = Table;
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => {
    // getOrderList();
    setOrderList(dummyData);
  }, []);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const getOrderList = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get("http://localhost:3000/api/orderlist");
      if (
        (response !== null || response !== undefined) &&
        response.status === 200
      ) {
        setOrderList(response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Failed to retrieve order " + err);
    }
  };

  const addOrderSubmitHandler = async () => {
    let orderNo = document.getElementById("orderNumber").value;
    let orderStatus =
      document.getElementById("orderStatus").options[
        document.getElementById("orderStatus").selectedIndex
      ].value;

    if (orderNo === "" || orderStatus === "")
      document.getElementById("alertMessage").innerHTML =
        "Please insert appropriate value.";

    // let response = await axios.post("http://localhost:3000/api/order", {
    //     orderNo,
    //     orderStatus
    // })

    // if (response !== null && response !== undefined && response.status === 200) {
    //     console.log("Success");
    //     setOrderList((prevState) => [ ...prevState, response.data])
    // }

    setOrderList((prevState) => [
      ...prevState,
      {
        id: prevState.length+1,
        orderNo: Math.random() * 1000,
        orderStatus: "Open",
        orderDate: "01-07-2022",
        orderTime: "15:30:25",
      },
    ]);

    setModalOpen(false);
  };

  const searchSubmitHandler = (event) => {
    setSearchValue(event.target.value);
    setSearchResult(
      orderList.filter((status) => {
        for (const [key, value] of Object.entries(status)) {
          if (value !== "" && value !== null && value !== undefined) {
            if (
              value.toString().toLowerCase().includes(searchValue.toLowerCase())
            ) {
              return status;
            }
          }
        }
      })
    );
  };

  return (
    <React.Fragment>
      <section id="orderList" className="orderList">
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>
            <Modal.Title>Add Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="orderNumber" className="my-2">
                <Form.Label>Order Number</Form.Label>
                <Form.Control
                  type="text"
                  name="orderNumber"
                  required
                  className="form-input-row"
                />
              </Form.Group>
              <Form.Group controlId="orderStatus" className="my-2">
                <Form.Label>Order Status</Form.Label>
                <Form.Select name="orderStatus" className="form-input-row">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </Form.Select>
              </Form.Group>
            </Form>
            <div id="alertMessage" style={{ color: "red" }}></div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mx-2"
              variant="primary"
              onClick={addOrderSubmitHandler}
            >
              Add Order
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
        <div className="p-4 mx-4">
          <div className="d-flex flex-column">
            <h5 className="mb-4">Order List</h5>
            <div className="d-flex flex-row justify-content-between mb-4">
              <Form.Group className="d-flex flex-row" controlId="search">
                <Form.Label className="my-auto">Search:</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  placeholder="Search.."
                  className="mx-4"
                  onChange={searchSubmitHandler}
                  //   onKeyPress={searchSubmitHandler}
                />
              </Form.Group>
              <div className="d-flex flex-row">
                <Button
                  className="mx-2"
                  variant="primary"
                  onClick={() => setModalOpen(true)}
                >
                  Add Order
                </Button>
                {/* <Button className="mx-2" variant="danger">
                  Delete
                </Button> */}
                {/* <Button className="mx-2" variant="success">
                  Refresh
                </Button> */}
              </div>
            </div>
            <div>
              <Table
                height={420}
                data={searchValue === "" ? orderList : searchResult}
                loading={isLoading}
                onRowClick={(rowData) =>
                  navigate("/order/item", { replace: true, state: rowData })
                }
              >
                <Column>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="idx" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Order No</HeaderCell>
                  <Cell dataKey="orderNo" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Status</HeaderCell>
                  <Cell dataKey="orderStatus" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Date</HeaderCell>
                  <Cell dataKey="orderDate" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Time</HeaderCell>
                  <Cell dataKey="orderTime" />
                </Column>
                {/* <Column flexGrow={1}>
                  <HeaderCell>Client Name</HeaderCell>
                  <Cell dataKey="clientName" />
                </Column>
                <Column flexGrow={1}>
                  <HeaderCell>Client Address</HeaderCell>
                  <Cell dataKey="clientAddress" />
                </Column> */}
              </Table>
              <div style={{ padding: 20 }}>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  maxButtons={5}
                  size="xs"
                  layout={["total", "-", "limit", "|", "pager", "skip"]}
                  total={dummyData.length}
                  limitOptions={[10, 20]}
                  limit={limit}
                  activePage={page}
                  onChangePage={setPage}
                  onChangeLimit={handleChangeLimit}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default OrderList;
