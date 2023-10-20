/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useAddressesUIContext } from "./AddressesUIContext";
import { useTranslation } from "react-i18next";

export function AddressDeleteDialog() {
  const { t } = useTranslation();

  // Addresses UI Context
  const addressesUIContext = useAddressesUIContext();
  const addressesUIProps = useMemo(() => {
    return {
      id: addressesUIContext.selectedId,
      personId: addressesUIContext.personId,
      show: addressesUIContext.showDeleteAddressDialog,
      onHide: addressesUIContext.closeDeleteAddressDialog,
      queryParams: addressesUIContext.queryParams,
      setIds: addressesUIContext.setIds,
      findAddress: addressesUIContext.findAddress,
      removeAddress: addressesUIContext.removeAddress,
    };
  }, [addressesUIContext]);

  // Addresses Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.addresses.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!addressesUIProps.id) {
      addressesUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressesUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteAddress = () => {
    addressesUIProps.removeAddress(addressesUIProps.id);
    addressesUIProps.onHide();
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
          {t("Common.Delete")} {t("Address.Entity")}
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
            onClick={addressesUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteAddress}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
