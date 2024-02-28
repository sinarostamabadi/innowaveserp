import React from "react";
import { Route } from "react-router-dom";
import { IOTransactionTypesLoadingDialog } from "./iOTransactionTypes-loading-dialog/IOTransactionTypesLoadingDialog";
import { IOTransactionTypeDeleteDialog } from "./iOTransactionType-delete-dialog/IOTransactionTypeDeleteDialog";
import { IOTransactionTypesCard } from "./IOTransactionTypesCard";
import { IOTransactionTypesUIProvider } from "./IOTransactionTypesUIContext";

export function IOTransactionTypesPage({ history }) {
  const iOTransactionTypesUIEvents = {
    newIOTransactionTypeButtonClick: () => {
      history.push("/employment/iOTransactionTypes/new");
    },
    openEditIOTransactionTypePage: (id) => {
      history.push(`/employment/iOTransactionTypes/${id}/edit`);
    },
    openDeleteIOTransactionTypeDialog: (id) => {
      history.push(`/employment/iOTransactionTypes/${id}/delete`);
    },
    openDeleteIOTransactionTypesDialog: () => {
      history.push(`/employment/iOTransactionTypes/deleteIOTransactionTypes`);
    },
    openFetchIOTransactionTypesDialog: () => {
      history.push(`/employment/iOTransactionTypes/fetch`);
    },
    openUpdateIOTransactionTypesStatusDialog: () => {
      history.push("/employment/iOTransactionTypes/updateStatus");
    },
  };

  return (
    <IOTransactionTypesUIProvider
      iOTransactionTypesUIEvents={iOTransactionTypesUIEvents}
    >
      <IOTransactionTypesLoadingDialog />
      <Route path="/employment/iOTransactionTypes/:id/delete">
        {({ history, match }) => (
          <IOTransactionTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/iOTransactionTypes");
            }}
          />
        )}
      </Route>
      <IOTransactionTypesCard />
    </IOTransactionTypesUIProvider>
  );
}
