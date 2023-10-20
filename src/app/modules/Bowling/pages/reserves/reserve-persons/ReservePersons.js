import React from "react";
import { Row, Col } from "react-bootstrap";
import { ReservePersonsToolbar } from "./ReservePersonsToolbar";
import { ReservePersonsTable } from "./ReservePersonsTable";
import { ReservePersonDeleteDialog } from "./ReservePersonDeleteDialog";
import { ReservePersonEditDialog } from "./reservePerson-edit-dialog/ReservePersonEditDialog";

export function ReservePersons() {
  return (
    <Row>
      <Col lg={12}>
        <ReservePersonEditDialog />
        <ReservePersonDeleteDialog />
        <div className="form margin-b-30">
          <ReservePersonsToolbar />
        </div>
        <ReservePersonsTable />
      </Col>
    </Row>
  );
}
