/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useReservePersonsUIContext } from "./ReservePersonsUIContext";
import { useTranslation } from "react-i18next";

export function ReservePersonDeleteDialog() {
  const { t } = useTranslation();

  // ReservePersons UI Context
  const reservePersonsUIContext = useReservePersonsUIContext();
  const reservePersonsUIProps = useMemo(() => {
    return {
      id: reservePersonsUIContext.selectedId,
      personId: reservePersonsUIContext.personId,
      show: reservePersonsUIContext.showDeleteReservePersonDialog,
      onHide: reservePersonsUIContext.closeDeleteReservePersonDialog,
      queryParams: reservePersonsUIContext.queryParams,
      setIds: reservePersonsUIContext.setIds,
      findReservePerson: reservePersonsUIContext.findReservePerson,
      removeReservePerson: reservePersonsUIContext.removeReservePerson,
    };
  }, [reservePersonsUIContext]);

  // ReservePersons Redux state
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!reservePersonsUIProps.id) {
      reservePersonsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservePersonsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteReservePerson = () => {
    reservePersonsUIProps.removeReservePerson(reservePersonsUIProps.id);
    reservePersonsUIProps.onHide();
  };

  return (
    <Modal
      show={reservePersonsUIProps.show}
      onHide={reservePersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("ReservePerson.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>{t("Common.DeleteQuestion")}</span>}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={reservePersonsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteReservePerson}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
