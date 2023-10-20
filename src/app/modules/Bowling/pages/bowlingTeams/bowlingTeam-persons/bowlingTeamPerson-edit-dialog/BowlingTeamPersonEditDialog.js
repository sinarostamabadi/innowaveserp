import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BowlingTeamPersonEditDialogHeader } from "./BowlingTeamPersonEditDialogHeader";
import { BowlingTeamPersonEditForm } from "./BowlingTeamPersonEditForm";
import { useBowlingTeamPersonsUIContext } from "../BowlingTeamPersonsUIContext";

export function BowlingTeamPersonEditDialog() {
  // BowlingTeamPersons UI Context
  const bowlingTeamPersonsUIContext = useBowlingTeamPersonsUIContext();
  const bowlingTeamPersonsUIProps = useMemo(() => {
    return {
      id: bowlingTeamPersonsUIContext.selectedId,
      selectedItem: bowlingTeamPersonsUIContext.selectedItem,
      show: bowlingTeamPersonsUIContext.showEditBowlingTeamPersonDialog,
      onHide: bowlingTeamPersonsUIContext.closeEditBowlingTeamPersonDialog,
      personId: bowlingTeamPersonsUIContext.personId,
      queryParams: bowlingTeamPersonsUIContext.queryParams,
      initBowlingTeamPerson: bowlingTeamPersonsUIContext.initBowlingTeamPerson,
      findBowlingTeamPerson: bowlingTeamPersonsUIContext.findBowlingTeamPerson,
      addBowlingTeamPerson: bowlingTeamPersonsUIContext.addBowlingTeamPerson,
      updateBowlingTeamPerson: bowlingTeamPersonsUIContext.updateBowlingTeamPerson,
    };
  }, [bowlingTeamPersonsUIContext]);

  // BowlingTeamPersons Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editBowlingTeamPerson, setEditBowlingTeamPerson] = useState(bowlingTeamPersonsUIProps.initBowlingTeamPerson);

  useEffect(() => {
    if (!!bowlingTeamPersonsUIProps.id)
      setEditBowlingTeamPerson(bowlingTeamPersonsUIProps.findBowlingTeamPerson(bowlingTeamPersonsUIProps.id));
  }, [bowlingTeamPersonsUIProps.id, dispatch]);

  const saveBowlingTeamPerson = (bowlingTeamPerson) => {
    if (!bowlingTeamPersonsUIProps.id) {
      bowlingTeamPersonsUIProps.addBowlingTeamPerson(bowlingTeamPerson);
      bowlingTeamPersonsUIProps.onHide();
    } else {
      bowlingTeamPersonsUIProps.updateBowlingTeamPerson(bowlingTeamPerson);
      bowlingTeamPersonsUIProps.onHide();
    }
  };
  return (
    <Modal
      show={bowlingTeamPersonsUIProps.show}
      onHide={bowlingTeamPersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <BowlingTeamPersonEditDialogHeader id={bowlingTeamPersonsUIProps.id} />
      <BowlingTeamPersonEditForm
        saveBowlingTeamPerson={saveBowlingTeamPerson}
        actionsLoading={actionsLoading}
        bowlingTeamPerson={bowlingTeamPersonsUIProps.selectedItem || bowlingTeamPersonsUIProps.initBowlingTeamPerson}
        onHide={bowlingTeamPersonsUIProps.onHide}
      />
    </Modal>
  );
}
