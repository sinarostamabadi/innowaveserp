/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../../General/_redux/personSpecialDays/personSpecialDaysActions";
import { usePersonSpecialDaysUIContext } from "./PersonSpecialDaysUIContext";

export function PersonSpecialDaysDeleteDialog() {
  // PersonSpecialDays UI Context
  const personSpecialDaysUIContext = usePersonSpecialDaysUIContext();
  const personSpecialDaysUIProps = useMemo(() => {
    return {
      personId: personSpecialDaysUIContext.personId,
      ids: personSpecialDaysUIContext.ids,
      show: personSpecialDaysUIContext.showDeletePersonSpecialDaysDialog,
      onHide: personSpecialDaysUIContext.closeDeletePersonSpecialDaysDialog,
      setIds: personSpecialDaysUIContext.setIds,
      queryParams: personSpecialDaysUIContext.queryParams,
      findPersonSpecialDay: personSpecialDaysUIContext.findPersonSpecialDay,
    };
  }, [personSpecialDaysUIContext]);

  // PersonSpecialDays Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.personSpecialDays.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected personSpecialDays we should close modal
  useEffect(() => {
    if (
      !personSpecialDaysUIProps.ids ||
      personSpecialDaysUIProps.ids.length === 0
    ) {
      personSpecialDaysUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personSpecialDaysUIProps.ids]);

  const deletePersonSpecialDays = () => {
    // server request for selected deleting personSpecialDays
    dispatch(
      actions.deletePersonSpecialDays(personSpecialDaysUIProps.ids)
    ).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchPersonSpecialDays(
          personSpecialDaysUIProps.queryParams,
          personSpecialDaysUIProps.personId
        )
      ).then(() => {
        personSpecialDaysUIProps.setIds([]);
        personSpecialDaysUIProps.onHide();
      });
    });
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
          PersonSpecialDays Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>
            Are you sure to permanently delete selected personSpecialDays?
          </span>
        )}
        {isLoading && <span>PersonSpecialDays are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={personSpecialDaysUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePersonSpecialDays}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
