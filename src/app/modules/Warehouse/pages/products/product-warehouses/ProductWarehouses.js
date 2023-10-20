import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductWarehousesToolbar } from "./ProductWarehousesToolbar";
import { ProductWarehousesTable } from "./ProductWarehousesTable";
import { ProductWarehouseDeleteDialog } from "./ProductWarehouseDeleteDialog";
import { ProductWarehouseEditDialog } from "./productWarehouse-edit-dialog/ProductWarehouseEditDialog";

export function ProductWarehouses() {
  return (
    <Row>
      <Col lg={12}>
        <ProductWarehouseEditDialog />
        <ProductWarehouseDeleteDialog />
        <div className="form margin-b-30">
          <ProductWarehousesToolbar />
        </div>
        <ProductWarehousesTable />
      </Col>
    </Row>
  );
}
