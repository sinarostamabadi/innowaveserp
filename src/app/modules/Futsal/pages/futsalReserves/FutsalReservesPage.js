import React from "react";
import { Route } from "react-router-dom";
import { FutsalReservesLoadingDialog } from "./futsalReserves-loading-dialog/FutsalReservesLoadingDialog";
import { FutsalReserveDeleteDialog } from "./futsalReserve-delete-dialog/FutsalReserveDeleteDialog";
import { FutsalReservesCard } from "./FutsalReservesCard";
import { FutsalReservesUIProvider } from "./FutsalReservesUIContext";

export function FutsalReservesPage({ history }) {
  const futsalReservesUIEvents = {
    newFutsalReserveButtonClick: () => {
      history.push("/futsal/futsalReserves/new");
    },
    openEditFutsalReservePage: (id) => {
      history.push(`/futsal/futsalReserves/${id}/edit`);
    },
    openDeleteFutsalReserveDialog: (id) => {
      history.push(`/futsal/futsalReserves/${id}/delete`);
    },
    openDeleteFutsalReservesDialog: () => {
      history.push(`/futsal/futsalReserves/deleteFutsalReserves`);
    },
    openFetchFutsalReservesDialog: () => {
      history.push(`/futsal/futsalReserves/fetch`);
    },
    openUpdateFutsalReservesStatusDialog: () => {
      history.push("/futsal/futsalReserves/updateStatus");
    },
  };
  
  return (
    <FutsalReservesUIProvider futsalReservesUIEvents={futsalReservesUIEvents}>
      <FutsalReservesLoadingDialog />
      <Route path="/futsal/futsalReserves/:id/delete">
        {({ history, match }) => (
          <FutsalReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalReserves");
            }}
          />
        )}
      </Route>
      <FutsalReservesCard />
    </FutsalReservesUIProvider>
  );
}