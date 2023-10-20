import React from "react";
import { Route } from "react-router-dom";
import { DocumentTypesLoadingDialog } from "./documentTypes-loading-dialog/DocumentTypesLoadingDialog";
import { DocumentTypeDeleteDialog } from "./documentType-delete-dialog/DocumentTypeDeleteDialog";
import { DocumentTypesCard } from "./DocumentTypesCard";
import { DocumentTypesUIProvider } from "./DocumentTypesUIContext";

export function DocumentTypesPage({ history }) {
  const documentTypesUIEvents = {
    newDocumentTypeButtonClick: () => {
      history.push("/accounting/documentTypes/new");
    },
    openEditDocumentTypePage: (id) => {
      history.push(`/accounting/documentTypes/${id}/edit`);
    },
    openDeleteDocumentTypeDialog: (id) => {
      history.push(`/accounting/documentTypes/${id}/delete`);
    },
    openDeleteDocumentTypesDialog: () => {
      history.push(`/accounting/documentTypes/deleteDocumentTypes`);
    },
    openFetchDocumentTypesDialog: () => {
      history.push(`/accounting/documentTypes/fetch`);
    },
    openUpdateDocumentTypesStatusDialog: () => {
      history.push("/accounting/documentTypes/updateStatus");
    },
  };
  
  return (
    <DocumentTypesUIProvider documentTypesUIEvents={documentTypesUIEvents}>
      <DocumentTypesLoadingDialog />
      <Route path="/accounting/documentTypes/:id/delete">
        {({ history, match }) => (
          <DocumentTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/documentTypes");
            }}
          />
        )}
      </Route>
      <DocumentTypesCard />
    </DocumentTypesUIProvider>
  );
}