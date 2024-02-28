import React from "react";
import { Route } from "react-router-dom";
import { DocumentsLoadingDialog } from "./documents-loading-dialog/DocumentsLoadingDialog";
import { DocumentDeleteDialog } from "./document-delete-dialog/DocumentDeleteDialog";
import { DocumentsCard } from "./DocumentsCard";
import { DocumentsUIProvider } from "./DocumentsUIContext";

export function DocumentsPage({ history }) {
  const documentsUIEvents = {
    newDocumentButtonClick: () => {
      history.push("/accounting/documents/new");
    },
    openEditDocumentPage: (id) => {
      history.push(`/accounting/documents/${id}/edit`);
    },
    openDeleteDocumentDialog: (id) => {
      history.push(`/accounting/documents/${id}/delete`);
    },
    openDeleteDocumentsDialog: () => {
      history.push(`/accounting/documents/deleteDocuments`);
    },
    openFetchDocumentsDialog: () => {
      history.push(`/accounting/documents/fetch`);
    },
    openUpdateDocumentsStatusDialog: () => {
      history.push("/accounting/documents/updateStatus");
    },
  };

  return (
    <DocumentsUIProvider documentsUIEvents={documentsUIEvents}>
      <DocumentsLoadingDialog />
      <Route path="/accounting/documents/:id/delete">
        {({ history, match }) => (
          <DocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/documents");
            }}
          />
        )}
      </Route>
      <DocumentsCard />
    </DocumentsUIProvider>
  );
}
