import React from "react";
import { Route } from "react-router-dom";
import { RequestsLoadingDialog } from "./requests-loading-dialog/RequestsLoadingDialog";
import { RequestDeleteDialog } from "./request-delete-dialog/RequestDeleteDialog";
import { RequestsCard } from "./RequestsCard";
import { RequestsUIProvider } from "./RequestsUIContext";

export function RequestsPage({ history }) {
  const requestsUIEvents = {
    newRequestButtonClick: () => {
      history.push("/cash/requests/new");
    },
    openEditRequestPage: (id) => {
      history.push(`/cash/requests/${id}/edit`);
    },
    openDeleteRequestDialog: (id) => {
      history.push(`/cash/requests/${id}/delete`);
    },
    openDeleteRequestsDialog: () => {
      history.push(`/cash/requests/deleteRequests`);
    },
    openFetchRequestsDialog: () => {
      history.push(`/cash/requests/fetch`);
    },
    openUpdateRequestsStatusDialog: () => {
      history.push("/cash/requests/updateStatus");
    },
  };

  return (
    <RequestsUIProvider requestsUIEvents={requestsUIEvents}>
      <RequestsLoadingDialog />
      <Route path="/cash/requests/:id/delete">
        {({ history, match }) => (
          <RequestDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/requests");
            }}
          />
        )}
      </Route>
      <RequestsCard />
    </RequestsUIProvider>
  );
}
