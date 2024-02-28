import React from "react";
import { Route } from "react-router-dom";
import { ImportAccountTempsLoadingDialog } from "./importAccountTemps-loading-dialog/ImportAccountTempsLoadingDialog";
import { ImportAccountTempDeleteDialog } from "./importAccountTemp-delete-dialog/ImportAccountTempDeleteDialog";
import { ImportAccountTempsCard } from "./ImportAccountTempsCard";
import { ImportAccountTempsUIProvider } from "./ImportAccountTempsUIContext";

export function ImportAccountTempsPage({ history }) {
  const importAccountTempsUIEvents = {
    newImportAccountTempButtonClick: () => {
      history.push("/accounting/importAccountTemps/new");
    },
    openEditImportAccountTempPage: (id) => {
      history.push(`/accounting/importAccountTemps/${id}/edit`);
    },
    openDeleteImportAccountTempDialog: (id) => {
      history.push(`/accounting/importAccountTemps/${id}/delete`);
    },
    openDeleteImportAccountTempsDialog: () => {
      history.push(`/accounting/importAccountTemps/deleteImportAccountTemps`);
    },
    openFetchImportAccountTempsDialog: () => {
      history.push(`/accounting/importAccountTemps/fetch`);
    },
    openUpdateImportAccountTempsStatusDialog: () => {
      history.push("/accounting/importAccountTemps/updateStatus");
    },
  };

  return (
    <ImportAccountTempsUIProvider
      importAccountTempsUIEvents={importAccountTempsUIEvents}
    >
      <ImportAccountTempsLoadingDialog />
      <Route path="/accounting/importAccountTemps/:id/delete">
        {({ history, match }) => (
          <ImportAccountTempDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/importAccountTemps");
            }}
          />
        )}
      </Route>
      <ImportAccountTempsCard />
    </ImportAccountTempsUIProvider>
  );
}
