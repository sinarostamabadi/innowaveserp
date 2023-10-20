import React from "react";
import { Route } from "react-router-dom";
import { IODeviceTransactionTypesLoadingDialog } from "./iODeviceTransactionTypes-loading-dialog/IODeviceTransactionTypesLoadingDialog";
import { IODeviceTransactionTypeDeleteDialog } from "./iODeviceTransactionType-delete-dialog/IODeviceTransactionTypeDeleteDialog";
import { IODeviceTransactionTypesCard } from "./IODeviceTransactionTypesCard";
import { IODeviceTransactionTypesUIProvider } from "./IODeviceTransactionTypesUIContext";

export function IODeviceTransactionTypesPage({ history }) {
  const iODeviceTransactionTypesUIEvents = {
    newIODeviceTransactionTypeButtonClick: () => {
      history.push("/employment/iODeviceTransactionTypes/new");
    },
    openEditIODeviceTransactionTypePage: (id) => {
      history.push(`/employment/iODeviceTransactionTypes/${id}/edit`);
    },
    openDeleteIODeviceTransactionTypeDialog: (id) => {
      history.push(`/employment/iODeviceTransactionTypes/${id}/delete`);
    },
    openDeleteIODeviceTransactionTypesDialog: () => {
      history.push(`/employment/iODeviceTransactionTypes/deleteIODeviceTransactionTypes`);
    },
    openFetchIODeviceTransactionTypesDialog: () => {
      history.push(`/employment/iODeviceTransactionTypes/fetch`);
    },
    openUpdateIODeviceTransactionTypesStatusDialog: () => {
      history.push("/employment/iODeviceTransactionTypes/updateStatus");
    },
  };
  
  return (
    <IODeviceTransactionTypesUIProvider iODeviceTransactionTypesUIEvents={iODeviceTransactionTypesUIEvents}>
      <IODeviceTransactionTypesLoadingDialog />
      <Route path="/employment/iODeviceTransactionTypes/:id/delete">
        {({ history, match }) => (
          <IODeviceTransactionTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/iODeviceTransactionTypes");
            }}
          />
        )}
      </Route>
      <IODeviceTransactionTypesCard />
    </IODeviceTransactionTypesUIProvider>
  );
}