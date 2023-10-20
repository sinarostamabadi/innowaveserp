import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ReservePersonEditDialogHeader } from "./ReservePersonEditDialogHeader";
import { ReservePersonEditForm } from "./ReservePersonEditForm";
import { useReservePersonsUIContext } from "../ReservePersonsUIContext";

export function ReservePersonEditDialog() {
  // ReservePersons UI Context
  const reservePersonsUIContext = useReservePersonsUIContext();
  const reservePersonsUIProps = useMemo(() => {
    return {
      id: reservePersonsUIContext.selectedId,
      selectedItem: reservePersonsUIContext.selectedItem,
      show: reservePersonsUIContext.showEditReservePersonDialog,
      onHide: reservePersonsUIContext.closeEditReservePersonDialog,
      personId: reservePersonsUIContext.personId,
      queryParams: reservePersonsUIContext.queryParams,
      initReservePerson: reservePersonsUIContext.initReservePerson,
      findReservePerson: reservePersonsUIContext.findReservePerson,
      addReservePerson: reservePersonsUIContext.addReservePerson,
      updateReservePerson: reservePersonsUIContext.updateReservePerson,
    };
  }, [reservePersonsUIContext]);

  // ReservePersons Redux state
  const dispatch = useDispatch();
  const { actionsLoading, setActionsLoading } = useState(false);

  const [editReservePerson, setEditReservePerson] = useState(reservePersonsUIProps.initReservePerson);

  useEffect(() => {
    if (!!reservePersonsUIProps.id)
      setEditReservePerson(reservePersonsUIProps.findReservePerson(reservePersonsUIProps.id));
  }, [reservePersonsUIProps.id, dispatch]);

  const saveReservePerson = (reservePerson) => {
    if (!reservePersonsUIProps.id) {
      reservePersonsUIProps.addReservePerson(reservePerson);
      reservePersonsUIProps.onHide();
    } else {
      reservePersonsUIProps.updateReservePerson(reservePerson);
      reservePersonsUIProps.onHide();
    }
  };
  return (
    <Modal
      show={reservePersonsUIProps.show}
      onHide={reservePersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ReservePersonEditDialogHeader id={reservePersonsUIProps.id} />
      <ReservePersonEditForm
        saveReservePerson={saveReservePerson}
        actionsLoading={actionsLoading}
        reservePerson={reservePersonsUIProps.selectedItem || reservePersonsUIProps.initReservePerson}
        onHide={reservePersonsUIProps.onHide}
      />
    </Modal>
  );
}
