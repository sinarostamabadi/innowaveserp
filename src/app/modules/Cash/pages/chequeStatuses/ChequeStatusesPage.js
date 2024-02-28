import React from "react";
import { Route } from "react-router-dom";
import { ChequeStatusesLoadingDialog } from "./chequeStatuses-loading-dialog/ChequeStatusesLoadingDialog";
import { ChequeStatusDeleteDialog } from "./chequeStatus-delete-dialog/ChequeStatusDeleteDialog";
import { ChequeStatusesCard } from "./ChequeStatusesCard";
import { ChequeStatusesUIProvider } from "./ChequeStatusesUIContext";

export function ChequeStatusesPage({ history }) {
  const chequeStatusesUIEvents = {
    newChequeStatusButtonClick: () => {
      history.push("/cash/chequeStatuses/new");
    },
    openEditChequeStatusPage: (id) => {
      history.push(`/cash/chequeStatuses/${id}/edit`);
    },
    openDeleteChequeStatusDialog: (id) => {
      history.push(`/cash/chequeStatuses/${id}/delete`);
    },
    openDeleteChequeStatusesDialog: () => {
      history.push(`/cash/chequeStatuses/deleteChequeStatuses`);
    },
    openFetchChequeStatusesDialog: () => {
      history.push(`/cash/chequeStatuses/fetch`);
    },
    openUpdateChequeStatusesStatusDialog: () => {
      history.push("/cash/chequeStatuses/updateStatus");
    },
  };

  return (
    <ChequeStatusesUIProvider chequeStatusesUIEvents={chequeStatusesUIEvents}>
      <ChequeStatusesLoadingDialog />
      <Route path="/cash/chequeStatuses/:id/delete">
        {({ history, match }) => (
          <ChequeStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/chequeStatuses");
            }}
          />
        )}
      </Route>
      <ChequeStatusesCard />
    </ChequeStatusesUIProvider>
  );
}
