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
  const uiContext = usePersonSpecialDaysUIContext();
  const uiProps = useMemo(() => {
    return {
      id: uiContext.selectedId,
      personId: uiContext.personId,
      show: uiContext.showDeletePersonSpecialDayDialog,
      onHide: uiContext.closeDeletePersonSpecialDayDialog,
      queryParams: uiContext.queryParams,
      setIds: uiContext.setIds,
      findPersonSpecialDay: uiContext.findPersonSpecialDay,
      removePersonSpecialDay: uiContext.removePersonSpecialDay,
    };
  }, [uiContext]);

  // PersonSpecialDays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.personSpecialDays.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!uiProps.id) {
      uiProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deletePersonSpecialDay = () => {
    uiProps.removePersonSpecialDay(uiProps.id)
    uiProps.onHide();
  };

  return (
    <Modal
      show={uiProps.show}
      onHide={uiProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("PersonSpecialDay.Entity")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>{t("Common.DeleteQuestion")}</span>
        )}
        {isLoading && <span>{t("Common.DeleteLoading")}</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={uiProps.onHide}
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
