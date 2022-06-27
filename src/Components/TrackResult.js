import React from "react";

import { Table, Column, HeaderCell, Cell } from "rsuite-table";

const fakeData = [
  {
    id: 1,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 2,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 3,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 4,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 5,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 6,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 7,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
  {
    id: 8,
    date: "2016-09-23",
    description: "global drive functionalities",
    remark: "Intuitive impactful software",
  },
];

const TrackResult = (props) => {
  const data = fakeData.filter((v, i) => i < 4);

  return (
    <Table
      wordWrap
      height={400}
      data={data}
      onRowClick={(data) => {
        console.log(data);
      }}
    >
      <Column flexGrow={1}>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="date" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Remark</HeaderCell>
        <Cell dataKey="remark" />
      </Column>
    </Table>
  );
};

export default TrackResult;
