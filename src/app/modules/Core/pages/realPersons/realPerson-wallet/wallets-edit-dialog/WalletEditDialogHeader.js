/* eslint-disable no-restricted-imports */
import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../../core/_partials/controls";
import { useTranslation } from "react-i18next";

export function WalletEditDialogHeader({ id }) {
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  // Specs Redux state
  const { walletForEdit, actionsLoading } = useSelector(
    (state) => ({
      walletForEdit: state.wallets.walletForEdit,
      actionsLoading: state.wallets.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    let _title = id ? "" : t("Common.Create") + " " + t("Wallet.Entity");
    if (walletForEdit && id) {
      _title = t("Common.Edit") + " " + t("Wallet.Entity") ;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [walletForEdit, actionsLoading]);
  return (
    <>
      {actionsLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
