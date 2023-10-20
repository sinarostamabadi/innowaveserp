import React from "react";
import { Route } from "react-router-dom";
import { OperationTypeAccountsLoadingDialog } from "./operationTypeAccounts-loading-dialog/OperationTypeAccountsLoadingDialog";
import { OperationTypeAccountDeleteDialog } from "./operationTypeAccount-delete-dialog/OperationTypeAccountDeleteDialog";
import { OperationTypeAccountsCard } from "./OperationTypeAccountsCard";
import { OperationTypeAccountsUIProvider } from "./OperationTypeAccountsUIContext";

export function OperationTypeAccountsPage({ history }) {
  const operationTypeAccountsUIEvents = {
    newOperationTypeAccountButtonClick: () => {
      history.push("/cash/operationTypeAccounts/new");
    },
    openEditOperationTypeAccountPage: (id) => {
      history.push(`/cash/operationTypeAccounts/${id}/edit`);
    },
    openDeleteOperationTypeAccountDialog: (id) => {
      history.push(`/cash/operationTypeAccounts/${id}/delete`);
    },
    openDeleteOperationTypeAccountsDialog: () => {
      history.push(`/cash/operationTypeAccounts/deleteOperationTypeAccounts`);
    },
    openFetchOperationTypeAccountsDialog: () => {
      history.push(`/cash/operationTypeAccounts/fetch`);
    },
    openUpdateOperationTypeAccountsStatusDialog: () => {
      history.push("/cash/operationTypeAccounts/updateStatus");
    },
  };
  
  return (
    <OperationTypeAccountsUIProvider operationTypeAccountsUIEvents={operationTypeAccountsUIEvents}>
      <OperationTypeAccountsLoadingDialog />
      <Route path="/cash/operationTypeAccounts/:id/delete">
        {({ history, match }) => (
          <OperationTypeAccountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/operationTypeAccounts");
            }}
          />
        )}
      </Route>
      <OperationTypeAccountsCard />
    </OperationTypeAccountsUIProvider>
  );
}