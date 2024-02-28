/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/phones/phonesActions";
import { usePhonesUIContext } from "./PhonesUIContext";

export function PhonesDeleteDialog() {
  // Phones UI Context
  const phonesUIContext = usePhonesUIContext();
  const phonesUIProps = useMemo(() => {
    return {
      personId: phonesUIContext.personId,
      ids: phonesUIContext.ids,
      show: phonesUIContext.showDeletePhonesDialog,
      onHide: phonesUIContext.closeDeletePhonesDialog,
      setIds: phonesUIContext.setIds,
      queryParams: phonesUIContext.queryParams,
      findPhone: phonesUIContext.findPhone,
    };
  }, [phonesUIContext]);

  // Phones Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.phones.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected phones we should close modal
  useEffect(() => {
    if (!phonesUIProps.ids || phonesUIProps.ids.length === 0) {
      phonesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phonesUIProps.ids]);

  const deletePhones = () => {
    // server request for selected deleting phones
    dispatch(actions.deletePhones(phonesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchPhones(phonesUIProps.queryParams, phonesUIProps.personId)
      ).then(() => {
        phonesUIProps.setIds([]);
        phonesUIProps.onHide();
      });
    });
  };

  return (
    <Modal
      show={phonesUIProps.show}
      onHide={phonesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Phones Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected phones?</span>
        )}
        {isLoading && <span>Phones are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={phonesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deletePhones}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
