import React from "react";
import { Row, Col } from "react-bootstrap";
import { GroupsToolbar } from "./GroupsToolbar";
import { GroupsTable } from "./GroupsTable";
import { GroupDeleteDialog } from "./GroupDeleteDialog";
import { GroupEditDialog } from "./group-edit-dialog/GroupEditDialog";
import { TeamEditDialog } from "./group-teams/TeamEditDialog";

export function Groups() {
  return (
    <Row>
      <Col lg={12}>
        <TeamEditDialog />
        <GroupEditDialog />
        <GroupDeleteDialog />
        <div className="form margin-b-30">
          <GroupsToolbar />
        </div>
        <GroupsTable />
      </Col>
    </Row>
  );
}
