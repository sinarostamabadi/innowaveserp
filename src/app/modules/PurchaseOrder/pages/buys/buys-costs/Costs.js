import React from "react";
import { Row, Col } from "react-bootstrap";
import { CostsToolbar } from "./CostsToolbar";
import { CostsTable } from "./CostsTable";
import { CostDeleteDialog } from "./CostDeleteDialog";
import { CostEditDialog } from "./cost-edit-dialog/CostEditDialog";

export function Costs() {
  return (
    <Row>
      <Col lg={12}>
        <CostEditDialog />
        <CostDeleteDialog />
        <div className="form margin-b-30">
          <CostsToolbar />
        </div>
        <CostsTable />
      </Col>
    </Row>
  );
}
