import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TeamEditDialogHeader } from "./TeamEditDialogHeader";
import { TeamEditForm } from "./TeamEditForm";
import { useGroupsUIContext } from "../GroupsUIContext";

export function TeamEditDialog() {
  // Groups UI Context
  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      id: groupsUIContext.selectedId,
      selectedItem: groupsUIContext.selectedItem,
      show: groupsUIContext.showTeamGroupDialog,
      onHide: groupsUIContext.closeTeamGroupDialog,
    };
  }, [groupsUIContext]);

  // Groups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  return (
    <Modal
      show={groupsUIProps.show}
      onHide={groupsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <TeamEditDialogHeader id={groupsUIProps.id} />
      <TeamEditForm
        actionsLoading={actionsLoading}
        group={
          !!groupsUIProps.selectedItem
            ? groupsUIProps.selectedItem.BowlingCompetitionGroupTeams
            : []
        }
        onHide={groupsUIProps.onHide}
      />
    </Modal>
  );
}
