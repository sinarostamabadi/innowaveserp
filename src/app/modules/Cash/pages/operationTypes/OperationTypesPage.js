import React from "react";
import { Route } from "react-router-dom";
import { OperationTypesLoadingDialog } from "./operationTypes-loading-dialog/OperationTypesLoadingDialog";
import { OperationTypeDeleteDialog } from "./operationType-delete-dialog/OperationTypeDeleteDialog";
import { OperationTypesCard } from "./OperationTypesCard";
import { OperationTypesUIProvider } from "./OperationTypesUIContext";

export function OperationTypesPage({ history }) {
  const operationTypesUIEvents = {
    newOperationTypeButtonClick: () => {
      history.push("/cash/operationTypes/new");
    },
    openEditOperationTypePage: (id) => {
      history.push(`/cash/operationTypes/${id}/edit`);
    },
    openDeleteOperationTypeDialog: (id) => {
      history.push(`/cash/operationTypes/${id}/delete`);
    },
    openDeleteOperationTypesDialog: () => {
      history.push(`/cash/operationTypes/deleteOperationTypes`);
    },
    openFetchOperationTypesDialog: () => {
      history.push(`/cash/operationTypes/fetch`);
    },
    openUpdateOperationTypesStatusDialog: () => {
      history.push("/cash/operationTypes/updateStatus");
    },
  };
  
  return (
    <OperationTypesUIProvider operationTypesUIEvents={operationTypesUIEvents}>
      <OperationTypesLoadingDialog />
      <Route path="/cash/operationTypes/:id/delete">
        {({ history, match }) => (
          <OperationTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/operationTypes");
            }}
          />
        )}
      </Route>
      <OperationTypesCard />
    </OperationTypesUIProvider>
  );
}