import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { GroupEditDialogHeader } from "./GroupEditDialogHeader";
import { GroupEditForm } from "./GroupEditForm";
import { useGroupsUIContext } from "../GroupsUIContext";

export function GroupEditDialog() {
  // Groups UI Context
  const groupsUIContext = useGroupsUIContext();
  const groupsUIProps = useMemo(() => {
    return {
      id: groupsUIContext.selectedId,
      selectedItem: groupsUIContext.selectedItem,
      show: groupsUIContext.showEditGroupDialog,
      onHide: groupsUIContext.closeEditGroupDialog,
      personId: groupsUIContext.personId,
      queryParams: groupsUIContext.queryParams,
      initGroup: groupsUIContext.initGroup,
      findGroup: groupsUIContext.findGroup,
      addGroup: groupsUIContext.addGroup,
      updateGroup: groupsUIContext.updateGroup,
    };
  }, [groupsUIContext]);

  // Groups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editGroup, setEditGroup] = useState(groupsUIProps.initGroup);

  useEffect(() => {
    if (!!groupsUIProps.id)
      setEditGroup(groupsUIProps.findGroup(groupsUIProps.id));
  }, [groupsUIProps.id, dispatch]);

  const saveGroup = (group) => {
    if (!groupsUIProps.id) {
      groupsUIProps.addGroup(group);
      groupsUIProps.onHide();
    } else {
      groupsUIProps.updateGroup(group);
      groupsUIProps.onHide();
    }
  };
  
  return (
    <Modal
      show={groupsUIProps.show}
      onHide={groupsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <GroupEditDialogHeader id={groupsUIProps.id} />
      <GroupEditForm
        saveGroup={saveGroup}
        actionsLoading={actionsLoading}
        group={groupsUIProps.selectedItem || groupsUIProps.initGroup}
        onHide={groupsUIProps.onHide}
      />
    </Modal>
  );
}
