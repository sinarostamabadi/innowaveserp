import React from "react";
import { Route } from "react-router-dom";
import { FutsalTimingLoadingDialog } from "./futsalTiming-loading-dialog/FutsalTimingLoadingDialog";
import { FutsalTimingDeleteDialog } from "./futsalTiming-delete-dialog/FutsalTimingDeleteDialog";
import { FutsalTimingCard } from "./FutsalTimingCard";
import { FutsalTimingUIProvider } from "./FutsalTimingUIContext";

export function FutsalTimingPage({ history }) {
  const futsalTimingUIEvents = {
    newFutsalTimingButtonClick: () => {
      history.push("/futsal/futsalTiming/new");
    },
    openEditFutsalTimingPage: (id) => {
      history.push(`/futsal/futsalTiming/${id}/edit`);
    },
    openDeleteFutsalTimingDialog: (id) => {
      history.push(`/futsal/futsalTiming/${id}/delete`);
    },
    openDeleteFutsalTimingDialog: () => {
      history.push(`/futsal/futsalTiming/deleteFutsalTiming`);
    },
    openFetchFutsalTimingDialog: () => {
      history.push(`/futsal/futsalTiming/fetch`);
    },
    openUpdateFutsalTimingStatusDialog: () => {
      history.push("/futsal/futsalTiming/updateStatus");
    },
  };
  
  return (
    <FutsalTimingUIProvider futsalTimingUIEvents={futsalTimingUIEvents}>
      <FutsalTimingLoadingDialog />
      <Route path="/futsal/futsalTiming/:id/delete">
        {({ history, match }) => (
          <FutsalTimingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalTiming");
            }}
          />
        )}
      </Route>
      <FutsalTimingCard />
    </FutsalTimingUIProvider>
  );
}