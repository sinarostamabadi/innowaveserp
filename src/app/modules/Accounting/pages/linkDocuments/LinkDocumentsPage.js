import React from "react";
import { Route } from "react-router-dom";
import { LinkDocumentsLoadingDialog } from "./linkDocuments-loading-dialog/LinkDocumentsLoadingDialog";
import { LinkDocumentDeleteDialog } from "./linkDocument-delete-dialog/LinkDocumentDeleteDialog";
import { LinkDocumentsCard } from "./LinkDocumentsCard";
import { LinkDocumentsUIProvider } from "./LinkDocumentsUIContext";

export function LinkDocumentsPage({ history }) {
  const linkDocumentsUIEvents = {
    newLinkDocumentButtonClick: () => {
      history.push("/accounting/linkDocuments/new");
    },
    openEditLinkDocumentPage: (id) => {
      history.push(`/accounting/linkDocuments/${id}/edit`);
    },
    openDeleteLinkDocumentDialog: (id) => {
      history.push(`/accounting/linkDocuments/${id}/delete`);
    },
    openDeleteLinkDocumentsDialog: () => {
      history.push(`/accounting/linkDocuments/deleteLinkDocuments`);
    },
    openFetchLinkDocumentsDialog: () => {
      history.push(`/accounting/linkDocuments/fetch`);
    },
    openUpdateLinkDocumentsStatusDialog: () => {
      history.push("/accounting/linkDocuments/updateStatus");
    },
  };
  
  return (
    <LinkDocumentsUIProvider linkDocumentsUIEvents={linkDocumentsUIEvents}>
      <LinkDocumentsLoadingDialog />
      <Route path="/accounting/linkDocuments/:id/delete">
        {({ history, match }) => (
          <LinkDocumentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/linkDocuments");
            }}
          />
        )}
      </Route>
      <LinkDocumentsCard />
    </LinkDocumentsUIProvider>
  );
}