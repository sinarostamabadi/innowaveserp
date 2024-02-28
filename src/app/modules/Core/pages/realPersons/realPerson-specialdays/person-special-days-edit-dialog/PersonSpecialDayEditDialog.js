import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PersonSpecialDayEditDialogHeader } from "./PersonSpecialDayEditDialogHeader";
import { PersonSpecialDayEditForm } from "./PersonSpecialDayEditForm";
import { usePersonSpecialDaysUIContext } from "../PersonSpecialDaysUIContext";
import { EnToFaObjDate } from "../../../../../../../core/_helpers";

export function PersonSpecialDayEditDialog() {
  // PersonSpecialDays UI Context
  const uiContext = usePersonSpecialDaysUIContext();
  const uiProps = useMemo(() => {
    return {
      id: uiContext.selectedId,
      show: uiContext.showEditPersonSpecialDayDialog,
      onHide: uiContext.closeEditPersonSpecialDayDialog,
      personId: uiContext.personId,
      queryParams: uiContext.queryParams,
      initPersonSpecialDay: uiContext.initPersonSpecialDay,
      findPersonSpecialDay: uiContext.findPersonSpecialDay,
      addPersonSpecialDay: uiContext.addPersonSpecialDay,
      updatePersonSpecialDay: uiContext.updatePersonSpecialDay,
    };
  }, [uiContext]);

  // PersonSpecialDays Redux state
  const dispatch = useDispatch();
  const { actionsLoading } = useSelector(
    (state) => ({
      actionsLoading: state.personSpecialDays.actionsLoading,
    }),
    shallowEqual
  );

  const [editPersonSpecialDay, setEditPersonSpecialDay] = useState(null);

  useEffect(() => {
    if (!!uiProps.id == false) return;
    let dataObj = uiProps.findPersonSpecialDay(uiProps.id);

    setEditPersonSpecialDay({
      ...dataObj,
      PersonSpecialDayDate: EnToFaObjDate(dataObj.PersonSpecialDayDate),
    });
  }, [uiProps.id, dispatch]);

  const savePersonSpecialDay = (personSpecialDay) => {
    if (!uiProps.id) {
      console.log("personSpecialDay > ", personSpecialDay);
      uiProps.addPersonSpecialDay(personSpecialDay);
      uiProps.onHide();
    } else {
      console.log("personSpecialDay > ", personSpecialDay);

      uiProps.updatePersonSpecialDay(personSpecialDay);
      uiProps.onHide();
    }
  };

  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <PersonSpecialDayEditDialogHeader id={uiProps.id} />
      <PersonSpecialDayEditForm
        savePersonSpecialDay={savePersonSpecialDay}
        actionsLoading={actionsLoading}
        personSpecialDay={editPersonSpecialDay || uiProps.initPersonSpecialDay}
        onHide={uiProps.onHide}
      />
    </Modal>
  );
}
