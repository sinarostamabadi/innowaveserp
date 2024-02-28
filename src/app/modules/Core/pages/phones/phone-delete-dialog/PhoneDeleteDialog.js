/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/phones/phonesActions";
import { usePhonesUIContext } from "../PhonesUIContext";
export function PhoneDeleteDialog({ id, show, onHide }) {
  // Phones UI Context
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      setIds: phonesUIContext.setIds,
      queryParams: phonesUIContext.queryParams,
    };
  }, [phonesUIContext]);
  // Phones Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.phones.actionsLoading }),
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
  const deletePhone = () => {
    // server request for deleting phone by id
    dispatch(actions.deletePhone(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchPhones(phonesUIProps.queryParams));
      // clear selections list
      phonesUIProps.setIds([]);
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
            onClick={deletePhone}
            className="btn btn-delete btn-danger"
          >
            DeleteTitle
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
