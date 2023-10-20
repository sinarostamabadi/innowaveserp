import React from "react";
import { Route } from "react-router-dom";
import { CoreTransactionTypesLoadingDialog } from "./coreTransactionTypes-loading-dialog/CoreTransactionTypesLoadingDialog";
import { CoreTransactionTypeDeleteDialog } from "./coreTransactionType-delete-dialog/CoreTransactionTypeDeleteDialog";
import { CoreTransactionTypesCard } from "./CoreTransactionTypesCard";
import { CoreTransactionTypesUIProvider } from "./CoreTransactionTypesUIContext";
export function CoreTransactionTypesPage({ history }) {
  const coreTransactionTypesUIEvents = {
    newCoreTransactionTypeButtonClick: () => {
      history.push("/Core/coreTransactionTypes/new");
    },
    openEditCoreTransactionTypePage: (id) => {
      history.push(`/Core/coreTransactionTypes/${id}/edit`);
    },
    openDeleteCoreTransactionTypeDialog: (id) => {
      history.push(`/Core/coreTransactionTypes/${id}/delete`);
    },
    openDeleteCoreTransactionTypesDialog: () => {
      history.push(`/Core/coreTransactionTypes/deleteCoreTransactionTypes`);
    },
    openFetchCoreTransactionTypesDialog: () => {
      history.push(`/Core/coreTransactionTypes/fetch`);
    },
    openUpdateCoreTransactionTypesStatusDialog: () => {
      history.push("/Core/coreTransactionTypes/updateStatus");
    },
  };
  return (
    <CoreTransactionTypesUIProvider coreTransactionTypesUIEvents={coreTransactionTypesUIEvents}>
      <CoreTransactionTypesLoadingDialog />
      <Route path="/Core/coreTransactionTypes/:id/delete">
        {({ history, match }) => (
          <CoreTransactionTypeDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/coreTransactionTypes");
            }}
          />
        )}
      </Route>
      <CoreTransactionTypesCard />
    </CoreTransactionTypesUIProvider>
  );
}
