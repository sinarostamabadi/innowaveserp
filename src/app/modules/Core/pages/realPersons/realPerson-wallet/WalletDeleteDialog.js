/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../core/_partials/controls";
import { useWalletsUIContext } from "./WalletsUIContext";
import { useTranslation } from "react-i18next";

export function WalletDeleteDialog() {
  const { t } = useTranslation();

  // Wallets UI Context
  const walletsUIContext = useWalletsUIContext();
  const walletsUIProps = useMemo(() => {
    return {
      id: walletsUIContext.selectedId,
      personId: walletsUIContext.personId,
      show: walletsUIContext.showDeleteWalletDialog,
      onHide: walletsUIContext.closeDeleteWalletDialog,
      queryParams: walletsUIContext.queryParams,
      setIds: walletsUIContext.setIds,
      findWallet: walletsUIContext.findWallet,
      removeWallet: walletsUIContext.removeWallet,
    };
  }, [walletsUIContext]);

  // Wallets Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.wallets.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!walletsUIProps.id) {
      walletsUIProps.onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletsUIProps.id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const deleteWallet = () => {
    walletsUIProps.removeWallet(walletsUIProps.id)
    walletsUIProps.onHide();
  };

  return (
    <Modal
      show={walletsUIProps.show}
      onHide={walletsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {t("Common.Delete")} {t("Wallet.Entity")}
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
            onClick={walletsUIProps.onHide}
            className="btn btn-light btn-elevate"
          >
            {t("Common.Cancel")}
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteWallet}
            className="btn btn-primary btn-elevate"
          >
            {t("Common.Delete")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
