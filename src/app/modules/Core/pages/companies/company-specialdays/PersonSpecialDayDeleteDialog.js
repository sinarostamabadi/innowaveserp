/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { usePersonSpecialDaysUIContext } from "./PersonSpecialDaysUIContext";
import { useTranslation } from "react-i18next";

export function PersonSpecialDayDeleteDialog() {
  const { t } = useTranslation();

  // PersonSpecialDays UI Context
  const personSpecialDaysUIContext = usePersonSpecialDaysUIContext();
  const personSpecialDaysUIProps = useMemo(() => {
    return {
      id: personSpecialDaysUIContext.selectedId,
      personId: personSpecialDaysUIContext.personId,
      show: personSpecialDaysUIContext.showDeletePersonSpecialDayDialog,
      onHide: personSpecialDaysUIContext.closeDeletePersonSpecialDayDialog,
      queryParams: personSpecialDaysUIContext.queryParams,
      setIds: personSpecialDaysUIContext.setIds,
      findPersonSpecialDay: personSpecialDaysUIContext.findPersonSpecialDay,
      removePersonSpecialDay: personSpecialDaysUIContext.removePersonSpecialDay,
    };
  }, [personSpecialDaysUIContext]);

  // PersonSpecialDays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.personSpecialDays.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!personSpecialDaysUIProps.id) {
      personSpecialDaysUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personSpecialDaysUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deletePersonSpecialDay = () => {
    personSpecialDaysUIProps.removePersonSpecialDay(
      personSpecialDaysUIProps.id
    );
    personSpecialDaysUIProps.onHide();
  };

  return (
    <Modal
      show={personSpecialDaysUIProps.show}
      onHide={personSpecialDaysUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("PersonSpecialDay.Entity")}
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
            onClick={personSpecialDaysUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePersonSpecialDay}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
