import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../_redux/addresses/addressesActions";
import { AddressEditDialogHeader } from "./AddressEditDialogHeader";
import { AddressEditForm } from "./AddressEditForm";
import { useAddressesUIContext } from "../AddressesUIContext";

export function AddressEditDialog() {
  // Addresses UI Context
  const addressesUIContext = useAddressesUIContext();
  const uiProps = useMemo(() => {
    return {
      id: addressesUIContext.selectedId,
      selectedItem: addressesUIContext.selectedItem,
      show: addressesUIContext.showEditAddressDialog,
      onHide: addressesUIContext.closeEditAddressDialog,
      addAddress: addressesUIContext.addAddress,
      updateAddress: addressesUIContext.updateAddress,
    };
  }, [addressesUIContext]);

  const saveAddress = (addresss) => {
    console.log("saveAddress > ", addresss);
    if (!uiProps.id) {
      uiProps.addAddress(addresss);
      uiProps.onHide();
    } else {
      uiProps.updateAddress(addresss);
      uiProps.onHide();
    }
  };

  return (
    <>
      {/* {!!addressesUIProps.id == false &&
        !!addressesUIProps.id &&
          editAddress.AddressId == addressesUIProps.id && ( */}
      <Modal
        size="lg"
        show={uiProps.show}
        onHide={uiProps.onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <AddressEditDialogHeader id={uiProps.id} />
        <AddressEditForm
          saveAddress={saveAddress}
          actionsLoading={false}
          address={uiProps.selectedItem}
          onHide={uiProps.onHide}
        />
      </Modal>
      {/* )} */}
    </>
  );
}
