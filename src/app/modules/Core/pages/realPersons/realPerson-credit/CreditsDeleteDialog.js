/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/credits/creditsActions";
import { useCreditsUIContext } from "./CreditsUIContext";

export function CreditsDeleteDialog() {
  // Credits UI Context
  const creditsUIContext = useCreditsUIContext();
  const creditsUIProps = useMemo(() => {
    return {
      personId: creditsUIContext.personId,
      ids: creditsUIContext.ids,
      show: creditsUIContext.showDeleteCreditsDialog,
      onHide: creditsUIContext.closeDeleteCreditsDialog,
      setIds: creditsUIContext.setIds,
      queryParams: creditsUIContext.queryParams,
      findCredit: creditsUIContext.findCredit,
    };
  }, [creditsUIContext]);

  // Credits Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.credits.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected credits we should close modal
  useEffect(() => {
    if (!creditsUIProps.ids || creditsUIProps.ids.length === 0) {
      creditsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creditsUIProps.ids]);

  const deleteCredits = () => {
    // server request for selected deleting credits
    dispatch(actions.deleteCredits(creditsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCredits(
          creditsUIProps.queryParams,
          creditsUIProps.personId
        )
      ).then(() => {
        creditsUIProps.setIds([]);
        creditsUIProps.onHide();
      });
    });
  };

  return (
    <Modal
      show={creditsUIProps.show}
      onHide={creditsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Credits Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected credits?
          </span>
        )}
        {isLoading && <span>Credits are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={creditsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCredits}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
