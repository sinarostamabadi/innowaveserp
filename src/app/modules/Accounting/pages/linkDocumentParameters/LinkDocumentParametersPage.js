import React from "react";
import { Route } from "react-router-dom";
import { LinkDocumentParametersLoadingDialog } from "./linkDocumentParameters-loading-dialog/LinkDocumentParametersLoadingDialog";
import { LinkDocumentParameterDeleteDialog } from "./linkDocumentParameter-delete-dialog/LinkDocumentParameterDeleteDialog";
import { LinkDocumentParametersCard } from "./LinkDocumentParametersCard";
import { LinkDocumentParametersUIProvider } from "./LinkDocumentParametersUIContext";

export function LinkDocumentParametersPage({ history }) {
  const linkDocumentParametersUIEvents = {
    newLinkDocumentParameterButtonClick: () => {
      history.push("/accounting/linkDocumentParameters/new");
    },
    openEditLinkDocumentParameterPage: (id) => {
      history.push(`/accounting/linkDocumentParameters/${id}/edit`);
    },
    openDeleteLinkDocumentParameterDialog: (id) => {
      history.push(`/accounting/linkDocumentParameters/${id}/delete`);
    },
    openDeleteLinkDocumentParametersDialog: () => {
      history.push(`/accounting/linkDocumentParameters/deleteLinkDocumentParameters`);
    },
    openFetchLinkDocumentParametersDialog: () => {
      history.push(`/accounting/linkDocumentParameters/fetch`);
    },
    openUpdateLinkDocumentParametersStatusDialog: () => {
      history.push("/accounting/linkDocumentParameters/updateStatus");
    },
  };
  
  return (
    <LinkDocumentParametersUIProvider linkDocumentParametersUIEvents={linkDocumentParametersUIEvents}>
      <LinkDocumentParametersLoadingDialog />
      <Route path="/accounting/linkDocumentParameters/:id/delete">
        {({ history, match }) => (
          <LinkDocumentParameterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounting/linkDocumentParameters");
            }}
          />
        )}
      </Route>
      <LinkDocumentParametersCard />
    </LinkDocumentParametersUIProvider>
  );
}