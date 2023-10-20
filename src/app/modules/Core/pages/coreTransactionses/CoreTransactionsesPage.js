import React from "react";
import { Route } from "react-router-dom";
import { CoreTransactionsesLoadingDialog } from "./coreTransactionses-loading-dialog/CoreTransactionsesLoadingDialog";
import { CoreTransactionsDeleteDialog } from "./coreTransactions-delete-dialog/CoreTransactionsDeleteDialog";
import { CoreTransactionsesCard } from "./CoreTransactionsesCard";
import { CoreTransactionsesUIProvider } from "./CoreTransactionsesUIContext";
export function CoreTransactionsesPage({ history }) {
  const coreTransactionsesUIEvents = {
    newCoreTransactionsButtonClick: () => {
      history.push("/Core/coreTransactionses/new");
    },
    openEditCoreTransactionsPage: (id) => {
      history.push(`/Core/coreTransactionses/${id}/edit`);
    },
    openDeleteCoreTransactionsDialog: (id) => {
      history.push(`/Core/coreTransactionses/${id}/delete`);
    },
    openDeleteCoreTransactionsesDialog: () => {
      history.push(`/Core/coreTransactionses/deleteCoreTransactionses`);
    },
    openFetchCoreTransactionsesDialog: () => {
      history.push(`/Core/coreTransactionses/fetch`);
    },
    openUpdateCoreTransactionsesStatusDialog: () => {
      history.push("/Core/coreTransactionses/updateStatus");
    },
  };
  return (
    <CoreTransactionsesUIProvider coreTransactionsesUIEvents={coreTransactionsesUIEvents}>
      <CoreTransactionsesLoadingDialog />
      <Route path="/Core/coreTransactionses/:id/delete">
        {({ history, match }) => (
          <CoreTransactionsDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/coreTransactionses");
            }}
          />
        )}
      </Route>
      <CoreTransactionsesCard />
    </CoreTransactionsesUIProvider>
  );
}
