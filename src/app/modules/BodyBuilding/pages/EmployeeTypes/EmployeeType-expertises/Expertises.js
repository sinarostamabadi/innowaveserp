import React from "react";
import { Row, Col } from "react-bootstrap";
import { ExpertisesToolbar } from "./ExpertisesToolbar";
import { ExpertisesTable } from "./ExpertisesTable";
import { ExpertiseDeleteDialog } from "./ExpertiseDeleteDialog";
import { ExpertiseEditDialog } from "./Expertise-edit-dialog/ExpertiseEditDialog";

export function Expertises() {
  return (
    <Row>
      <Col lg={12}>
        <ExpertiseEditDialog />
        <ExpertiseDeleteDialog />
        <div className="form margin-b-30">
          <ExpertisesToolbar />
        </div>
        <ExpertisesTable />
      </Col>
    </Row>
  );
}
