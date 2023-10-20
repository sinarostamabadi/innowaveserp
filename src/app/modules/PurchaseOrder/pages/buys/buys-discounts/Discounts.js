import React from "react";
import { Row, Col } from "react-bootstrap";
import { DiscountsToolbar } from "./DiscountsToolbar";
import { DiscountsTable } from "./DiscountsTable";
import { DiscountDeleteDialog } from "./DiscountDeleteDialog";
import { DiscountEditDialog } from "./discount-edit-dialog/DiscountEditDialog";

export function Discounts() {
  return (
    <Row>
      <Col lg={12}>
        <DiscountEditDialog />
        <DiscountDeleteDialog />
        <div className="form margin-b-30">
          <DiscountsToolbar />
        </div>
        <DiscountsTable />
      </Col>
    </Row>
  );
}
