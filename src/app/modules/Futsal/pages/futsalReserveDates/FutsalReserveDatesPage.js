import React from "react";
import { Route } from "react-router-dom";
import { FutsalReserveDatesLoadingDialog } from "./futsalReserveDates-loading-dialog/FutsalReserveDatesLoadingDialog";
import { FutsalReserveDateDeleteDialog } from "./futsalReserveDate-delete-dialog/FutsalReserveDateDeleteDialog";
import { FutsalReserveDatesCard } from "./FutsalReserveDatesCard";
import { FutsalReserveDatesUIProvider } from "./FutsalReserveDatesUIContext";

export function FutsalReserveDatesPage({ history }) {
  const futsalReserveDatesUIEvents = {
    newFutsalReserveDateButtonClick: () => {
      history.push("/futsal/futsalReserveDates/new");
    },
    openEditFutsalReserveDatePage: (id) => {
      history.push(`/futsal/futsalReserveDates/${id}/edit`);
    },
    openDeleteFutsalReserveDateDialog: (id) => {
      history.push(`/futsal/futsalReserveDates/${id}/delete`);
    },
    openDeleteFutsalReserveDatesDialog: () => {
      history.push(`/futsal/futsalReserveDates/deleteFutsalReserveDates`);
    },
    openFetchFutsalReserveDatesDialog: () => {
      history.push(`/futsal/futsalReserveDates/fetch`);
    },
    openUpdateFutsalReserveDatesStatusDialog: () => {
      history.push("/futsal/futsalReserveDates/updateStatus");
    },
  };

  return (
    <FutsalReserveDatesUIProvider
      futsalReserveDatesUIEvents={futsalReserveDatesUIEvents}
    >
      <FutsalReserveDatesLoadingDialog />
      <Route path="/futsal/futsalReserveDates/:id/delete">
        {({ history, match }) => (
          <FutsalReserveDateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalReserveDates");
            }}
          />
        )}
      </Route>
      <FutsalReserveDatesCard />
    </FutsalReserveDatesUIProvider>
  );
}
