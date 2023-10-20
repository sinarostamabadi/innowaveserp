import React from "react";
import { Route } from "react-router-dom";
import { ImportDocumentTempsLoadingDialog } from "./importDocumentTemps-loading-dialog/ImportDocumentTempsLoadingDialog";
import { ImportDocumentTempDeleteDialog } from "./importDocumentTemp-delete-dialog/ImportDocumentTempDeleteDialog";
import { ImportDocumentTempsCard } from "./ImportDocumentTempsCard";
import { ImportDocumentTempsUIProvider } from "./ImportDocumentTempsUIContext";

export function ImportDocumentTempsPage({ history }) {
  const importDocumentTempsUIEvents = {
    newImportDocumentTempButtonClick: () => {
      history.push("/accounting/importDocumentTemps/new");
    },
    openEditImportDocumentTempPage: (id) => {
      history.push(`/accounting/importDocumentTemps/${id}/edit`);
    },
    openDeleteImportDocumentTempDialog: (id) => {
      history.push(`/accounting/importDocumentTemps/${id}/delete`);
    },
    openDeleteImportDocumentTempsDialog: () => {
      history.push(`/accounting/importDocumentTemps/deleteImportDocumentTemps`);
    },
    openFetchImportDocumentTempsDialog: () => {
      history.push(`/accounting/importDocumentTemps/fetch`);
    },
    openUpdateImportDocumentTempsStatusDialog: () => {
      history.push("/accounting/importDocumentTemps/updateStatus");
    },
  };
  
  return (
    <ImportDocumentTempsUIProvider importDocumentTempsUIEvents={importDocumentTempsUIEvents}>
      <ImportDocumentTempsLoadingDialog />
      <Route path="/accounting/importDocumentTemps/:id/delete">
        {({ history, match }) => (
          <ImportDocumentTempDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/importDocumentTemps");
            }}
          />
        )}
      </Route>
      <ImportDocumentTempsCard />
    </ImportDocumentTempsUIProvider>
  );
}