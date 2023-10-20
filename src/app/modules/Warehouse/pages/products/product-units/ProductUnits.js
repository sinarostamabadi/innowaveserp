import React from "react";
import { Row, Col } from "react-bootstrap";
import { ProductUnitsToolbar } from "./ProductUnitsToolbar";
import { ProductUnitsTable } from "./ProductUnitsTable";
import { ProductUnitDeleteDialog } from "./ProductUnitDeleteDialog";
import { ProductUnitEditDialog } from "./productUnit-edit-dialog/ProductUnitEditDialog";

export function ProductUnits() {
  return (
    <Row>
      <Col lg={12}>
        <ProductUnitEditDialog />
        <ProductUnitDeleteDialog />
        <div className="form margin-b-30">
          <ProductUnitsToolbar />
        </div>
        <ProductUnitsTable />
      </Col>
    </Row>
  );
}
