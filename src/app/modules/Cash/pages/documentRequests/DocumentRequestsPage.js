import React from "react";
import { Route } from "react-router-dom";
import { DocumentRequestsLoadingDialog } from "./documentRequests-loading-dialog/DocumentRequestsLoadingDialog";
import { DocumentRequestDeleteDialog } from "./documentRequest-delete-dialog/DocumentRequestDeleteDialog";
import { DocumentRequestsCard } from "./DocumentRequestsCard";
import { DocumentRequestsUIProvider } from "./DocumentRequestsUIContext";

export function DocumentRequestsPage({ history }) {
  const documentRequestsUIEvents = {
    newDocumentRequestButtonClick: () => {
      history.push("/cash/documentRequests/new");
    },
    openEditDocumentRequestPage: (id) => {
      history.push(`/cash/documentRequests/${id}/edit`);
    },
    openDeleteDocumentRequestDialog: (id) => {
      history.push(`/cash/documentRequests/${id}/delete`);
    },
    openDeleteDocumentRequestsDialog: () => {
      history.push(`/cash/documentRequests/deleteDocumentRequests`);
    },
    openFetchDocumentRequestsDialog: () => {
      history.push(`/cash/documentRequests/fetch`);
    },
    openUpdateDocumentRequestsStatusDialog: () => {
      history.push("/cash/documentRequests/updateStatus");
    },
  };
  
  return (
    <DocumentRequestsUIProvider documentRequestsUIEvents={documentRequestsUIEvents}>
      <DocumentRequestsLoadingDialog />
      <Route path="/cash/documentRequests/:id/delete">
        {({ history, match }) => (
          <DocumentRequestDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/documentRequests");
            }}
          />
        )}
      </Route>
      <DocumentRequestsCard />
    </DocumentRequestsUIProvider>
  );
}