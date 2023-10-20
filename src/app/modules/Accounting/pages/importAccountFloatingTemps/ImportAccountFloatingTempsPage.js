import React from "react";
import { Route } from "react-router-dom";
import { ImportAccountFloatingTempsLoadingDialog } from "./importAccountFloatingTemps-loading-dialog/ImportAccountFloatingTempsLoadingDialog";
import { ImportAccountFloatingTempDeleteDialog } from "./importAccountFloatingTemp-delete-dialog/ImportAccountFloatingTempDeleteDialog";
import { ImportAccountFloatingTempsCard } from "./ImportAccountFloatingTempsCard";
import { ImportAccountFloatingTempsUIProvider } from "./ImportAccountFloatingTempsUIContext";

export function ImportAccountFloatingTempsPage({ history }) {
  const importAccountFloatingTempsUIEvents = {
    newImportAccountFloatingTempButtonClick: () => {
      history.push("/accounting/importAccountFloatingTemps/new");
    },
    openEditImportAccountFloatingTempPage: (id) => {
      history.push(`/accounting/importAccountFloatingTemps/${id}/edit`);
    },
    openDeleteImportAccountFloatingTempDialog: (id) => {
      history.push(`/accounting/importAccountFloatingTemps/${id}/delete`);
    },
    openDeleteImportAccountFloatingTempsDialog: () => {
      history.push(`/accounting/importAccountFloatingTemps/deleteImportAccountFloatingTemps`);
    },
    openFetchImportAccountFloatingTempsDialog: () => {
      history.push(`/accounting/importAccountFloatingTemps/fetch`);
    },
    openUpdateImportAccountFloatingTempsStatusDialog: () => {
      history.push("/accounting/importAccountFloatingTemps/updateStatus");
    },
  };
  
  return (
    <ImportAccountFloatingTempsUIProvider importAccountFloatingTempsUIEvents={importAccountFloatingTempsUIEvents}>
      <ImportAccountFloatingTempsLoadingDialog />
      <Route path="/accounting/importAccountFloatingTemps/:id/delete">
        {({ history, match }) => (
          <ImportAccountFloatingTempDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/importAccountFloatingTemps");
            }}
          />
        )}
      </Route>
      <ImportAccountFloatingTempsCard />
    </ImportAccountFloatingTempsUIProvider>
  );
}