import React from "react";
import { Row, Col } from "react-bootstrap";
import { SellPricingDetailsToolbar } from "./SellPricingDetailsToolbar";
import { SellPricingDetailsTable } from "./SellPricingDetailsTable";
import { SellPricingDetailDeleteDialog } from "./SellPricingDetailDeleteDialog";
import { SellPricingDetailEditDialog } from "./sellPricingDetail-edit-dialog/SellPricingDetailEditDialog";

export function SellPricingDetails() {
  return (
    <Row>
      <Col lg={12}>
        <SellPricingDetailEditDialog />
        <SellPricingDetailDeleteDialog />
        <div className="form margin-b-30">
          <SellPricingDetailsToolbar />
        </div>
        <SellPricingDetailsTable />
        <div className="form margin-b-30">
          <SellPricingDetailsToolbar />
        </div>
      </Col>
    </Row>
  );
}
