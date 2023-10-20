import React from "react";
import { Route } from "react-router-dom";
import { ChequesLoadingDialog } from "./cheques-loading-dialog/ChequesLoadingDialog";
import { ChequeDeleteDialog } from "./cheque-delete-dialog/ChequeDeleteDialog";
import { ChequesCard } from "./ChequesCard";
import { ChequesUIProvider } from "./ChequesUIContext";

export function ChequesPage({ history }) {
  const chequesUIEvents = {
    newChequeButtonClick: () => {
      history.push("/cash/cheques/new");
    },
    openEditChequePage: (id) => {
      history.push(`/cash/cheques/${id}/edit`);
    },
    openDeleteChequeDialog: (id) => {
      history.push(`/cash/cheques/${id}/delete`);
    },
    openDeleteChequesDialog: () => {
      history.push(`/cash/cheques/deleteCheques`);
    },
    openFetchChequesDialog: () => {
      history.push(`/cash/cheques/fetch`);
    },
    openUpdateChequesStatusDialog: () => {
      history.push("/cash/cheques/updateStatus");
    },
  };
  
  return (
    <ChequesUIProvider chequesUIEvents={chequesUIEvents}>
      <ChequesLoadingDialog />
      <Route path="/cash/cheques/:id/delete">
        {({ history, match }) => (
          <ChequeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cash/cheques");
            }}
          />
        )}
      </Route>
      <ChequesCard />
    </ChequesUIProvider>
  );
}