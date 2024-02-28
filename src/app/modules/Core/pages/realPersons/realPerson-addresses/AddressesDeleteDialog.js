/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import * as actions from "../../../_redux/addresses/addressesActions";
import { useAddressesUIContext } from "./AddressesUIContext";

export function AddressesDeleteDialog() {
  // Addresses UI Context
  const addressesUIContext = useAddressesUIContext();
  const addressesUIProps = useMemo(() => {
    return {
      personId: addressesUIContext.personId,
      ids: addressesUIContext.ids,
      show: addressesUIContext.showDeleteAddressesDialog,
      onHide: addressesUIContext.closeDeleteAddressesDialog,
      setIds: addressesUIContext.setIds,
      queryParams: addressesUIContext.queryParams,
      findAddress: addressesUIContext.findAddress,
    };
  }, [addressesUIContext]);

  // Addresses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.addresses.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected addresses we should close modal
  useEffect(() => {
    if (!addressesUIProps.ids || addressesUIProps.ids.length === 0) {
      addressesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressesUIProps.ids]);

  const deleteAddresses = () => {
    // server request for selected deleting addresses
    dispatch(actions.deleteAddresses(addressesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchAddresses(
          addressesUIProps.queryParams,
          addressesUIProps.personId
        )
      ).then(() => {
        addressesUIProps.setIds([]);
        addressesUIProps.onHide();
      });
    });
  };

  return (
    <Modal
      show={addressesUIProps.show}
      onHide={addressesUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Addresses Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected addresses?</span>
        )}
        {isLoading && <span>Addresses are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={addressesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAddresses}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
