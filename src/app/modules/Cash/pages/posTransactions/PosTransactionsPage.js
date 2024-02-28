import React from "react";
import { Route } from "react-router-dom";
import { PosTransactionsLoadingDialog } from "./posTransactions-loading-dialog/PosTransactionsLoadingDialog";
import { PosTransactionDeleteDialog } from "./posTransaction-delete-dialog/PosTransactionDeleteDialog";
import { PosTransactionsCard } from "./PosTransactionsCard";
import { PosTransactionsUIProvider } from "./PosTransactionsUIContext";

export function PosTransactionsPage({ history }) {
  const posTransactionsUIEvents = {
    newPosTransactionButtonClick: () => {
      history.push("/cash/posTransactions/new");
    },
    openEditPosTransactionPage: (id) => {
      history.push(`/cash/posTransactions/${id}/edit`);
    },
    openDeletePosTransactionDialog: (id) => {
      history.push(`/cash/posTransactions/${id}/delete`);
    },
    openDeletePosTransactionsDialog: () => {
      history.push(`/cash/posTransactions/deletePosTransactions`);
    },
    openFetchPosTransactionsDialog: () => {
      history.push(`/cash/posTransactions/fetch`);
    },
    openUpdatePosTransactionsStatusDialog: () => {
      history.push("/cash/posTransactions/updateStatus");
    },
  };

  return (
    <PosTransactionsUIProvider
      posTransactionsUIEvents={posTransactionsUIEvents}
    >
      <PosTransactionsLoadingDialog />
      <Route path="/cash/posTransactions/:id/delete">
        {({ history, match }) => (
          <PosTransactionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/posTransactions");
            }}
          />
        )}
      </Route>
      <PosTransactionsCard />
    </PosTransactionsUIProvider>
  );
}
