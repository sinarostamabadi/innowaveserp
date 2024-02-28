import React from "react";
import { Route } from "react-router-dom";
import { DocumentDtlsLoadingDialog } from "./documentDtls-loading-dialog/DocumentDtlsLoadingDialog";
import { DocumentDtlDeleteDialog } from "./documentDtl-delete-dialog/DocumentDtlDeleteDialog";
import { DocumentDtlsCard } from "./DocumentDtlsCard";
import { DocumentDtlsUIProvider } from "./DocumentDtlsUIContext";

export function DocumentDtlsPage({ history }) {
  const documentDtlsUIEvents = {
    newDocumentDtlButtonClick: () => {
      history.push("/accounting/documentDtls/new");
    },
    openEditDocumentDtlPage: (id) => {
      history.push(`/accounting/documentDtls/${id}/edit`);
    },
    openDeleteDocumentDtlDialog: (id) => {
      history.push(`/accounting/documentDtls/${id}/delete`);
    },
    openDeleteDocumentDtlsDialog: () => {
      history.push(`/accounting/documentDtls/deleteDocumentDtls`);
    },
    openFetchDocumentDtlsDialog: () => {
      history.push(`/accounting/documentDtls/fetch`);
    },
    openUpdateDocumentDtlsStatusDialog: () => {
      history.push("/accounting/documentDtls/updateStatus");
    },
  };

  return (
    <DocumentDtlsUIProvider documentDtlsUIEvents={documentDtlsUIEvents}>
      <DocumentDtlsLoadingDialog />
      <Route path="/accounting/documentDtls/:id/delete">
        {({ history, match }) => (
          <DocumentDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/documentDtls");
            }}
          />
        )}
      </Route>
      <DocumentDtlsCard />
    </DocumentDtlsUIProvider>
  );
}
