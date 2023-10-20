/* eslint-disable no-restricted-imports */
import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useBowlingTeamPersonsUIContext } from "./BowlingTeamPersonsUIContext";
import { useTranslation } from "react-i18next";

export function BowlingTeamPersonDeleteDialog() {
  const { t } = useTranslation();

  // BowlingTeamPersons UI Context
  const bowlingTeamPersonsUIContext = useBowlingTeamPersonsUIContext();
  const bowlingTeamPersonsUIProps = useMemo(() => {
    return {
      id: bowlingTeamPersonsUIContext.selectedId,
      personId: bowlingTeamPersonsUIContext.personId,
      show: bowlingTeamPersonsUIContext.showDeleteBowlingTeamPersonDialog,
      onHide: bowlingTeamPersonsUIContext.closeDeleteBowlingTeamPersonDialog,
      queryParams: bowlingTeamPersonsUIContext.queryParams,
      setIds: bowlingTeamPersonsUIContext.setIds,
      findBowlingTeamPerson: bowlingTeamPersonsUIContext.findBowlingTeamPerson,
      removeBowlingTeamPerson: bowlingTeamPersonsUIContext.removeBowlingTeamPerson,
    };
  }, [bowlingTeamPersonsUIContext]);

  // BowlingTeamPersons Redux state
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  // if !id we should close modal
  useEffect(() => {
    if (!bowlingTeamPersonsUIProps.id) {
      bowlingTeamPersonsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bowlingTeamPersonsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteBowlingTeamPerson = () => {
    bowlingTeamPersonsUIProps.removeBowlingTeamPerson(bowlingTeamPersonsUIProps.id)
    bowlingTeamPersonsUIProps.onHide();
  };

  return (
    <Modal
      show={bowlingTeamPersonsUIProps.show}
      onHide={bowlingTeamPersonsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("BowlingTeamPerson.Entity")}
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
            onClick={bowlingTeamPersonsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteBowlingTeamPerson}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
