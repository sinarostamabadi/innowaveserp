import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { WalletEditDialogHeader } from "./WalletEditDialogHeader";
import { WalletEditForm } from "./WalletEditForm";
import { useWalletsUIContext } from "../WalletsUIContext";

export function WalletEditDialog() {
  // Wallets UI Context
  const walletsUIContext = useWalletsUIContext();
  const walletsUIProps = useMemo(() => {
    return {
      id: walletsUIContext.selectedId,
      show: walletsUIContext.showEditWalletDialog,
      onHide: walletsUIContext.closeEditWalletDialog,
      personId: walletsUIContext.personId,
      queryParams: walletsUIContext.queryParams,
      initWallet: walletsUIContext.initWallet,
      findWallet: walletsUIContext.findWallet,
      addWallet: walletsUIContext.addWallet,
      updateWallet: walletsUIContext.updateWallet,
    };
  }, [walletsUIContext]);

  // Wallets Redux state
  const dispatch = useDispatch();
  const { actionsLoading, walletForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.wallets.actionsLoading,
      walletForEdit: state.wallets.walletForEdit,
    }),
    shallowEqual
  );

  const [editWallet, setEditWallet] = useState(null);

  useEffect(() => {
    // server request for getting wallet by seleted id
    setEditWallet(walletsUIProps.findWallet(walletsUIProps.id));
  }, [walletsUIProps.id, dispatch]);

  const saveWallet = (wallet) => {
    if (!walletsUIProps.id) {
      console.log("wallet > ", wallet);
      walletsUIProps.addWallet(wallet);
      walletsUIProps.onHide();
    } else {
      console.log("wallet > ", wallet);

      walletsUIProps.updateWallet(wallet);
      walletsUIProps.onHide();
    }
  };

  return (
    <Modal
      show={walletsUIProps.show}
      onHide={walletsUIProps.onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <WalletEditDialogHeader id={walletsUIProps.id} />
      <WalletEditForm
        saveWallet={saveWallet}
        actionsLoading={actionsLoading}
        wallet={editWallet || walletsUIProps.initWallet}
        onHide={walletsUIProps.onHide}
      />
    </Modal>
  );
}
