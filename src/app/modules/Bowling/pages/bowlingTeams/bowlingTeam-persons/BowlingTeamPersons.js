import React from "react";
import { Row, Col } from "react-bootstrap";
import { BowlingTeamPersonsToolbar } from "./BowlingTeamPersonsToolbar";
import { BowlingTeamPersonsTable } from "./BowlingTeamPersonsTable";
import { BowlingTeamPersonDeleteDialog } from "./BowlingTeamPersonDeleteDialog";
import { BowlingTeamPersonEditDialog } from "./bowlingTeamPerson-edit-dialog/BowlingTeamPersonEditDialog";

export function BowlingTeamPersons() {
  return (
    <Row>
      <Col lg={12}>
        <BowlingTeamPersonEditDialog />
        <BowlingTeamPersonDeleteDialog />
        <div className="form margin-b-30">
          <BowlingTeamPersonsToolbar />
        </div>
        <BowlingTeamPersonsTable />
      </Col>
    </Row>
  );
}
