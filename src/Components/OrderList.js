import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'rsuite';

// mock data
const dummyData = [
    {
        idx: 1,
        orderNo: "YNL41024012",
        orderStatus: "Pending",
        orderData: "15-06-2022",
        clientName: "Lawrence Yoong",
        clientAddress: "276A Compassvale Bow #02-421 Singapore 502512"
    },
    {
        idx: 2,
        orderNo: "YNL410223242",
        orderStatus: "Sending",
        orderData: "25-06-2022",
        clientName: "Babi Yoong",
        clientAddress: "276A Compassvale Bow #02-421 Singapore 502512"
    },
    {
        idx: 3,
        orderNo: "YNL41024212",
        orderStatus: "Delivered",
        orderData: "15-06-2022",
        clientName: "Salad Yoong",
        clientAddress: "276A Compassvale Bow #02-421 Singapore 502512"
    }
]

const OrderList = props => {
    const { HeaderCell, Cell, Column } = Table;
    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        // getOrderList(); 
        setOrderList(dummyData);
    }, []);

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const getOrderList = async () => {
        setIsLoading(true);
        try {
            let response = await axios.get("http://localhost:3000/api/orderlist");
            if ((response !== null || response !== undefined) && response.status === 200) {
                setOrderList(response.data);
                setIsLoading(false);
            }
        } catch (err) {
            console.log("Failed to retrieve order " + err);
        }
    }

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
                <h5>Order List</h5>
                <div className="d-flex flex-row">
                    <Button variant="primary">
                        Add Order
                    </Button>
                    <Button variant="danger">
                        Delete Order
                    </Button>
                    <Button variant="success">
                        Refresh
                    </Button>
                </div>
            </div>
            <div>
                <Table height={420} data={orderList} loading={isLoading} onRowClick={() => setModalOpen(true)}>
                    <Column flexGrow={1}>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="idx" />
                    </Column >
                    <Column flexGrow={1}>
                        <HeaderCell>Order No</HeaderCell>
                        <Cell dataKey="orderNo" />
                    </Column >
                    <Column flexGrow={1}>
                        <HeaderCell>Status</HeaderCell>
                        <Cell dataKey="orderStatus" />
                    </Column >
                    <Column flexGrow={1}>
                        <HeaderCell>Date</HeaderCell>
                        <Cell dataKey="orderDate" />
                    </Column >
                    <Column flexGrow={1}>
                        <HeaderCell>Client Name</HeaderCell>
                        <Cell dataKey="clientName" />
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell>Client Address</HeaderCell>
                        <Cell dataKey="clientAddress" />
                    </Column >
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
                        layout={['total', '-', 'limit', '|', 'pager', 'skip']}
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
    )
}

export default OrderList;