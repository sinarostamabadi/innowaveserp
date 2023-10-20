import React from "react";
import { Row, Col } from "react-bootstrap";
import { DetailsToolbar } from "./DetailsToolbar";
import { DetailsTable } from "./DetailsTable";
import { DetailDeleteDialog } from "./DetailDeleteDialog";
import { DetailEditDialog } from "./detail-edit-dialog/DetailEditDialog";

export function Details() {
  return (
    <Row>
      <Col lg={12}>
        <DetailEditDialog />
        <DetailDeleteDialog />
        <div className="form margin-b-30">
          <DetailsToolbar />
        </div>
        <DetailsTable />
      </Col>
    </Row>
  );
}
