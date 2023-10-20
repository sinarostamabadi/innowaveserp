import React from "react";
import { Route } from "react-router-dom";
import { FutsalTimePriceingLoadingDialog } from "./futsalTimePriceing-loading-dialog/FutsalTimePriceingLoadingDialog";
import { FutsalTimePriceingDeleteDialog } from "./futsalTimePriceing-delete-dialog/FutsalTimePriceingDeleteDialog";
import { FutsalTimePriceingCard } from "./FutsalTimePriceingCard";
import { FutsalTimePriceingUIProvider } from "./FutsalTimePriceingUIContext";

export function FutsalTimePriceingPage({ history }) {
  const futsalTimePriceingUIEvents = {
    newFutsalTimePriceingButtonClick: () => {
      history.push("/futsal/futsalTimePriceing/new");
    },
    openEditFutsalTimePriceingPage: (id) => {
      history.push(`/futsal/futsalTimePriceing/${id}/edit`);
    },
    openDeleteFutsalTimePriceingDialog: (id) => {
      history.push(`/futsal/futsalTimePriceing/${id}/delete`);
    },
    openDeleteFutsalTimePriceingDialog: () => {
      history.push(`/futsal/futsalTimePriceing/deleteFutsalTimePriceing`);
    },
    openFetchFutsalTimePriceingDialog: () => {
      history.push(`/futsal/futsalTimePriceing/fetch`);
    },
    openUpdateFutsalTimePriceingStatusDialog: () => {
      history.push("/futsal/futsalTimePriceing/updateStatus");
    },
  };
  
  return (
    <FutsalTimePriceingUIProvider futsalTimePriceingUIEvents={futsalTimePriceingUIEvents}>
      <FutsalTimePriceingLoadingDialog />
      <Route path="/futsal/futsalTimePriceing/:id/delete">
        {({ history, match }) => (
          <FutsalTimePriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalTimePriceing");
            }}
          />
        )}
      </Route>
      <FutsalTimePriceingCard />
    </FutsalTimePriceingUIProvider>
  );
}