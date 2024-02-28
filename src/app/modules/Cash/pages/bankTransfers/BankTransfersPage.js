import React from "react";
import { Route } from "react-router-dom";
import { BankTransfersLoadingDialog } from "./bankTransfers-loading-dialog/BankTransfersLoadingDialog";
import { BankTransferDeleteDialog } from "./bankTransfer-delete-dialog/BankTransferDeleteDialog";
import { BankTransfersCard } from "./BankTransfersCard";
import { BankTransfersUIProvider } from "./BankTransfersUIContext";

export function BankTransfersPage({ history }) {
  const bankTransfersUIEvents = {
    newBankTransferButtonClick: () => {
      history.push("/cash/bankTransfers/new");
    },
    openEditBankTransferPage: (id) => {
      history.push(`/cash/bankTransfers/${id}/edit`);
    },
    openDeleteBankTransferDialog: (id) => {
      history.push(`/cash/bankTransfers/${id}/delete`);
    },
    openDeleteBankTransfersDialog: () => {
      history.push(`/cash/bankTransfers/deleteBankTransfers`);
    },
    openFetchBankTransfersDialog: () => {
      history.push(`/cash/bankTransfers/fetch`);
    },
    openUpdateBankTransfersStatusDialog: () => {
      history.push("/cash/bankTransfers/updateStatus");
    },
  };

  return (
    <BankTransfersUIProvider bankTransfersUIEvents={bankTransfersUIEvents}>
      <BankTransfersLoadingDialog />
      <Route path="/cash/bankTransfers/:id/delete">
        {({ history, match }) => (
          <BankTransferDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/bankTransfers");
            }}
          />
        )}
      </Route>
      <BankTransfersCard />
    </BankTransfersUIProvider>
  );
}
