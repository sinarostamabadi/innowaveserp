import React from "react";
import { Row, Col } from "react-bootstrap";
import { EmployeeTypesToolbar } from "./EmployeeTypesToolbar";
import { EmployeeTypesTable } from "./EmployeeTypesTable";
import { EmployeeTypeDeleteDialog } from "./EmployeeTypeDeleteDialog";
import { EmployeeTypeEditDialog } from "./EmployeeType-edit-dialog/EmployeeTypeEditDialog";

export function EmployeeTypes() {
  return (
    <Row>
      <Col lg={12}>
        <EmployeeTypeEditDialog />
        <EmployeeTypeDeleteDialog />
        <div className="form margin-b-30">
          <EmployeeTypesToolbar />
        </div>
        <EmployeeTypesTable />
      </Col>
    </Row>
  );
}
