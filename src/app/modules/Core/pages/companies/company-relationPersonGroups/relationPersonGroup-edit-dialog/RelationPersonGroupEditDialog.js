import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RelationPersonGroupEditDialogHeader } from "./RelationPersonGroupEditDialogHeader";
import { RelationPersonGroupEditForm } from "./RelationPersonGroupEditForm";
import { useRelationPersonGroupsUIContext } from "../RelationPersonGroupsUIContext";

export function RelationPersonGroupEditDialog() {
  // RelationPersonGroups UI Context
  const relationPersonGroupsUIContext = useRelationPersonGroupsUIContext();
  const relationPersonGroupsUIProps = useMemo(() => {
    return {
      id: relationPersonGroupsUIContext.selectedId,
      show: relationPersonGroupsUIContext.showEditRelationPersonGroupDialog,
      onHide: relationPersonGroupsUIContext.closeEditRelationPersonGroupDialog,
      personId: relationPersonGroupsUIContext.personId,
      queryParams: relationPersonGroupsUIContext.queryParams,
      initRelationPersonGroup: relationPersonGroupsUIContext.initRelationPersonGroup,
      findRelationPersonGroup: relationPersonGroupsUIContext.findRelationPersonGroup,
      addRelationPersonGroup: relationPersonGroupsUIContext.addRelationPersonGroup,
      updateRelationPersonGroup: relationPersonGroupsUIContext.updateRelationPersonGroup,
    };
  }, [relationPersonGroupsUIContext]);

  // RelationPersonGroups Redux state
  const dispatch = useDispatch();
  const { actionsLoading, relationPersonGroupForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.companies.actionsLoading,
      relationPersonGroupForEdit: state.companies.companyForEdit,
    }),
    shallowEqual
  );

  const [editRelationPersonGroup, setEditRelationPersonGroup] = useState(null);

  useEffect(() => {
    // server request for getting relationPersonGroup by seleted id
    setEditRelationPersonGroup(relationPersonGroupsUIProps.findRelationPersonGroup(relationPersonGroupsUIProps.id));
  }, [relationPersonGroupsUIProps.id, dispatch]);

  const saveRelationPersonGroup = (relationPersonGroup) => {
    console.log("relationPersonGroup > ", relationPersonGroup);
    if (!relationPersonGroupsUIProps.id) {
      relationPersonGroupsUIProps.addRelationPersonGroup(relationPersonGroup);
      relationPersonGroupsUIProps.onHide();
    } else {
      console.log("relationPersonGroup > ", relationPersonGroup);

      relationPersonGroupsUIProps.updateRelationPersonGroup(relationPersonGroup);
      relationPersonGroupsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={relationPersonGroupsUIProps.show}
      onHide={relationPersonGroupsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <RelationPersonGroupEditDialogHeader id={relationPersonGroupsUIProps.id} />
      <RelationPersonGroupEditForm
        saveRelationPersonGroup={saveRelationPersonGroup}
        actionsLoading={actionsLoading}
        relationPersonGroup={editRelationPersonGroup || relationPersonGroupsUIProps.initRelationPersonGroup}
        onHide={relationPersonGroupsUIProps.onHide}
      />
    </Modal>
  );
}
