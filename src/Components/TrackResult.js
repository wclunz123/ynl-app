import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";

const TrackResult = (props) => {
  const data = props.result.filter((v, i) => i < 4);

  return (
    <Table
      wordWrap
      height={400}
      data={data}
      loading={props.loading}
    >
      <Column flexGrow={1}>
        <HeaderCell>Date</HeaderCell>
        <Cell dataKey="statusDate" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Time</HeaderCell>
        <Cell dataKey="statusTime" />
      </Column>

      <Column flexGrow={1}>
        <HeaderCell>Location</HeaderCell>
        <Cell dataKey="statusCountry" />
      </Column>

      <Column flexGrow={2}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="statusDescription" />
      </Column>
    </Table>
  );
};

export default TrackResult;
