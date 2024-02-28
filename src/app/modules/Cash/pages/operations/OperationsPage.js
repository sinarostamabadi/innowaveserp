import React from "react";
import { Route } from "react-router-dom";
import { OperationsLoadingDialog } from "./operations-loading-dialog/OperationsLoadingDialog";
import { OperationDeleteDialog } from "./operation-delete-dialog/OperationDeleteDialog";
import { OperationsCard } from "./OperationsCard";
import { OperationsUIProvider } from "./OperationsUIContext";

export function OperationsPage({ history }) {
  const operationsUIEvents = {
    newOperationButtonClick: () => {
      history.push("/cash/operations/new");
    },
    openEditOperationPage: (id) => {
      history.push(`/cash/operations/${id}/edit`);
    },
    openDeleteOperationDialog: (id) => {
      history.push(`/cash/operations/${id}/delete`);
    },
    openDeleteOperationsDialog: () => {
      history.push(`/cash/operations/deleteOperations`);
    },
    openFetchOperationsDialog: () => {
      history.push(`/cash/operations/fetch`);
    },
    openUpdateOperationsStatusDialog: () => {
      history.push("/cash/operations/updateStatus");
    },
  };

  return (
    <OperationsUIProvider operationsUIEvents={operationsUIEvents}>
      <OperationsLoadingDialog />
      <Route path="/cash/operations/:id/delete">
        {({ history, match }) => (
          <OperationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/operations");
            }}
          />
        )}
      </Route>
      <OperationsCard />
    </OperationsUIProvider>
  );
}
