import React from "react";
import { Row, Col } from "react-bootstrap";
import { ServicesToolbar } from "./ServicesToolbar";
import { ServicesTable } from "./ServicesTable";
import { ServiceDeleteDialog } from "./ServiceDeleteDialog";
import { ServiceEditDialog } from "./Service-edit-dialog/ServiceEditDialog";

export function Services() {
  return (
    <Row>
      <Col lg={12}>
        <ServiceEditDialog />
        <ServiceDeleteDialog />
        <div className="form margin-b-30">
          <ServicesToolbar />
        </div>
        <ServicesTable />
      </Col>
    </Row>
  );
}
