import React from "react";
import { Route } from "react-router-dom";
import { ImportXMLKeiesLoadingDialog } from "./importXMLKeies-loading-dialog/ImportXMLKeiesLoadingDialog";
import { ImportXMLKeyDeleteDialog } from "./importXMLKey-delete-dialog/ImportXMLKeyDeleteDialog";
import { ImportXMLKeiesCard } from "./ImportXMLKeiesCard";
import { ImportXMLKeiesUIProvider } from "./ImportXMLKeiesUIContext";

export function ImportXMLKeiesPage({ history }) {
  const importXMLKeiesUIEvents = {
    newImportXMLKeyButtonClick: () => {
      history.push("/accounting/importXMLKeies/new");
    },
    openEditImportXMLKeyPage: (id) => {
      history.push(`/accounting/importXMLKeies/${id}/edit`);
    },
    openDeleteImportXMLKeyDialog: (id) => {
      history.push(`/accounting/importXMLKeies/${id}/delete`);
    },
    openDeleteImportXMLKeiesDialog: () => {
      history.push(`/accounting/importXMLKeies/deleteImportXMLKeies`);
    },
    openFetchImportXMLKeiesDialog: () => {
      history.push(`/accounting/importXMLKeies/fetch`);
    },
    openUpdateImportXMLKeiesStatusDialog: () => {
      history.push("/accounting/importXMLKeies/updateStatus");
    },
  };

  return (
    <ImportXMLKeiesUIProvider importXMLKeiesUIEvents={importXMLKeiesUIEvents}>
      <ImportXMLKeiesLoadingDialog />
      <Route path="/accounting/importXMLKeies/:id/delete">
        {({ history, match }) => (
          <ImportXMLKeyDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/importXMLKeies");
            }}
          />
        )}
      </Route>
      <ImportXMLKeiesCard />
    </ImportXMLKeiesUIProvider>
  );
}
