import React from "react";
import { Row, Col } from "react-bootstrap";
import { DetailsToolbar } from "./DetailsToolbar";
import { DetailsTable } from "./DetailsTable";
import { DetailDeleteDialog } from "./DetailDeleteDialog";
import { DetailEditDialog } from "./detail-edit-dialog/DetailEditDialog";
import { SerialEditDialog } from "./detail-serials/SerialEditDialog";

export function Details() {
  return (
    <Row  style={{height: "100%"}}>
      <Col lg={12}  style={{height: "100%"}}>
        <SerialEditDialog />
        <DetailEditDialog />
        <DetailDeleteDialog />
        {/* <div className="form margin-b-30">
          <DetailsToolbar />
        </div> */}
        <div
          className="form-filtration pt-3"
          style={{ borderTop: "1px solid rgb(221, 221, 221)" }}
        ></div>
        <DetailsTable />
      </Col>
    </Row>
  );
}
