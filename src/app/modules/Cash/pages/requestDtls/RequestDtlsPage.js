import React from "react";
import { Route } from "react-router-dom";
import { RequestDtlsLoadingDialog } from "./requestDtls-loading-dialog/RequestDtlsLoadingDialog";
import { RequestDtlDeleteDialog } from "./requestDtl-delete-dialog/RequestDtlDeleteDialog";
import { RequestDtlsCard } from "./RequestDtlsCard";
import { RequestDtlsUIProvider } from "./RequestDtlsUIContext";

export function RequestDtlsPage({ history }) {
  const requestDtlsUIEvents = {
    newRequestDtlButtonClick: () => {
      history.push("/cash/requestDtls/new");
    },
    openEditRequestDtlPage: (id) => {
      history.push(`/cash/requestDtls/${id}/edit`);
    },
    openDeleteRequestDtlDialog: (id) => {
      history.push(`/cash/requestDtls/${id}/delete`);
    },
    openDeleteRequestDtlsDialog: () => {
      history.push(`/cash/requestDtls/deleteRequestDtls`);
    },
    openFetchRequestDtlsDialog: () => {
      history.push(`/cash/requestDtls/fetch`);
    },
    openUpdateRequestDtlsStatusDialog: () => {
      history.push("/cash/requestDtls/updateStatus");
    },
  };

  return (
    <RequestDtlsUIProvider requestDtlsUIEvents={requestDtlsUIEvents}>
      <RequestDtlsLoadingDialog />
      <Route path="/cash/requestDtls/:id/delete">
        {({ history, match }) => (
          <RequestDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/requestDtls");
            }}
          />
        )}
      </Route>
      <RequestDtlsCard />
    </RequestDtlsUIProvider>
  );
}
