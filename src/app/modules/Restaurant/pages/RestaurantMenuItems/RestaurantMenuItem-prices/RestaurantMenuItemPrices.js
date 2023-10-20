import React from "react";
import { Row, Col } from "react-bootstrap";
import { RestaurantMenuItemPricesToolbar } from "./RestaurantMenuItemPricesToolbar";
import { RestaurantMenuItemPricesTable } from "./RestaurantMenuItemPricesTable";
import { RestaurantMenuItemPriceDeleteDialog } from "./RestaurantMenuItemPriceDeleteDialog";
import { RestaurantMenuItemPriceEditDialog } from "./RestaurantMenuItemPrice-edit-dialog/RestaurantMenuItemPriceEditDialog";

export function RestaurantMenuItemPrices() {
  return (
    <Row>
      <Col lg={12}>
        <RestaurantMenuItemPriceEditDialog />
        <RestaurantMenuItemPriceDeleteDialog />
        <div className="form margin-b-30">
          <RestaurantMenuItemPricesToolbar />
        </div>
        <RestaurantMenuItemPricesTable />
      </Col>
    </Row>
  );
}
