/* eslint-disable no-restricted-imports */  
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/coreTransactionses/coreTransactionsesActions";
import { useCoreTransactionsesUIContext } from "../CoreTransactionsesUIContext";
export function CoreTransactionsDeleteDialog({ id, show, onHide }) {
  // CoreTransactionses UI Context  
  const coreTransactionsesUIContext = useCoreTransactionsesUIContext();
  const coreTransactionsesUIProps = useMemo(() => {
    return {
      setIds: coreTransactionsesUIContext.setIds,
      queryParams: coreTransactionsesUIContext.queryParams,
    };
  }, [coreTransactionsesUIContext]);
  // CoreTransactionses Redux state  
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.coreTransactionses.actionsLoading }),
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
  const deleteCoreTransactions = () => {
    // server request for deleting coreTransactions by id  
    dispatch(actions.deleteCoreTransactions(id)).then(() => {
      // refresh list after deletion  
      dispatch(actions.fetchCoreTransactionses(coreTransactionsesUIProps.queryParams));
      // clear selections list  
      coreTransactionsesUIProps.setIds([]);
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
        <Modal.Title id="example-modal-sizes-title-lg">
          DeleteTitle  
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Delete Question?</span>
        )}
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
            onClick={deleteCoreTransactions}
            className="btn btn-delete btn-danger"  
          >
            DeleteTitle  
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
