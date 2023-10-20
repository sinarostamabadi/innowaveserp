import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../General/_redux/personSpecialDays/personSpecialDaysActions";

import { PersonSpecialDayEditDialogHeader } from "./PersonSpecialDayEditDialogHeader";
import { PersonSpecialDayEditForm } from "./PersonSpecialDayEditForm";
import { usePersonSpecialDaysUIContext } from "../PersonSpecialDaysUIContext";

export function PersonSpecialDayEditDialog() {
  // PersonSpecialDays UI Context
  const personSpecialDaysUIContext = usePersonSpecialDaysUIContext();
  const personSpecialDaysUIProps = useMemo(() => {
    return {
      id: personSpecialDaysUIContext.selectedId,
      show: personSpecialDaysUIContext.showEditPersonSpecialDayDialog,
      onHide: personSpecialDaysUIContext.closeEditPersonSpecialDayDialog,
      personId: personSpecialDaysUIContext.personId,
      queryParams: personSpecialDaysUIContext.queryParams,
      initPersonSpecialDay: personSpecialDaysUIContext.initPersonSpecialDay,
      findPersonSpecialDay: personSpecialDaysUIContext.findPersonSpecialDay,
      addPersonSpecialDay: personSpecialDaysUIContext.addPersonSpecialDay,
      updatePersonSpecialDay: personSpecialDaysUIContext.updatePersonSpecialDay,
    };
  }, [personSpecialDaysUIContext]);

  // PersonSpecialDays Redux state
  const dispatch = useDispatch();
  const { actionsLoading, personSpecialDayForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.personSpecialDays.actionsLoading,
      personSpecialDayForEdit: state.personSpecialDays.personSpecialDayForEdit,
    }),
    shallowEqual
  );

  const [editPersonSpecialDay, setEditPersonSpecialDay] = useState(null);

  useEffect(() => {
    // server request for getting personSpecialDay by seleted id
    setEditPersonSpecialDay(personSpecialDaysUIProps.findPersonSpecialDay(personSpecialDaysUIProps.id));
  }, [personSpecialDaysUIProps.id, dispatch]);

  const savePersonSpecialDay = (personSpecialDay) => {
    if (!personSpecialDaysUIProps.id) {
      console.log("personSpecialDay > ", personSpecialDay);
      personSpecialDaysUIProps.addPersonSpecialDay(personSpecialDay);
      personSpecialDaysUIProps.onHide();
    } else {
      console.log("personSpecialDay > ", personSpecialDay);

      personSpecialDaysUIProps.updatePersonSpecialDay(personSpecialDay);
      personSpecialDaysUIProps.onHide();
    }
  };

  return (
    <Modal
      show={personSpecialDaysUIProps.show}
      onHide={personSpecialDaysUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PersonSpecialDayEditDialogHeader id={personSpecialDaysUIProps.id} />
      <PersonSpecialDayEditForm
        savePersonSpecialDay={savePersonSpecialDay}
        actionsLoading={actionsLoading}
        personSpecialDay={editPersonSpecialDay || personSpecialDaysUIProps.initPersonSpecialDay}
        onHide={personSpecialDaysUIProps.onHide}
      />
    </Modal>
  );
}
