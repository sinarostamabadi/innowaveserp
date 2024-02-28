/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/coreTransactionTypes/coreTransactionTypesActions";
import { useCoreTransactionTypesUIContext } from "../CoreTransactionTypesUIContext";
export function CoreTransactionTypeDeleteDialog({ id, show, onHide }) {
  // CoreTransactionTypes UI Context
  const coreTransactionTypesUIContext = useCoreTransactionTypesUIContext();
  const coreTransactionTypesUIProps = useMemo(() => {
    return {
      setIds: coreTransactionTypesUIContext.setIds,
      queryParams: coreTransactionTypesUIContext.queryParams,
    };
  }, [coreTransactionTypesUIContext]);
  // CoreTransactionTypes Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coreTransactionTypes.actionsLoading }),
    shallowEqual
  );
  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);
  const deleteCoreTransactionType = () => {
    // server request for deleting coreTransactionType by id
    dispatch(actions.deleteCoreTransactionType(id)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchCoreTransactionTypes(
          coreTransactionTypesUIProps.queryParams
        )
      );
      // clear selections list
      coreTransactionTypesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">DeleteTitle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && <span>Delete Question?</span>}
        {isLoading && <span>Delete Loading</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            DeleteCancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteCoreTransactionType}
            className="btn btn-delete btn-danger"
          >
            DeleteTitle
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
