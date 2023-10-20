import React from "react";
import { Route } from "react-router-dom";
import { IOTransactionsLoadingDialog } from "./iOTransactions-loading-dialog/IOTransactionsLoadingDialog";
import { IOTransactionDeleteDialog } from "./iOTransaction-delete-dialog/IOTransactionDeleteDialog";
import { IOTransactionsCard } from "./IOTransactionsCard";
import { IOTransactionsUIProvider } from "./IOTransactionsUIContext";

export function IOTransactionsPage({ history }) {
  const iOTransactionsUIEvents = {
    newIOTransactionButtonClick: () => {
      history.push("/employment/iOTransactions/new");
    },
    openEditIOTransactionPage: (id) => {
      history.push(`/employment/iOTransactions/${id}/edit`);
    },
    openDeleteIOTransactionDialog: (id) => {
      history.push(`/employment/iOTransactions/${id}/delete`);
    },
    openDeleteIOTransactionsDialog: () => {
      history.push(`/employment/iOTransactions/deleteIOTransactions`);
    },
    openFetchIOTransactionsDialog: () => {
      history.push(`/employment/iOTransactions/fetch`);
    },
    openUpdateIOTransactionsStatusDialog: () => {
      history.push("/employment/iOTransactions/updateStatus");
    },
  };
  
  return (
    <IOTransactionsUIProvider iOTransactionsUIEvents={iOTransactionsUIEvents}>
      <IOTransactionsLoadingDialog />
      <Route path="/employment/iOTransactions/:id/delete">
        {({ history, match }) => (
          <IOTransactionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/iOTransactions");
            }}
          />
        )}
      </Route>
      <IOTransactionsCard />
    </IOTransactionsUIProvider>
  );
}