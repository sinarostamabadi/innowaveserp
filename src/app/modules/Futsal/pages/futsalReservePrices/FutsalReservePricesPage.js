import React from "react";
import { Route } from "react-router-dom";
import { FutsalReservePricesLoadingDialog } from "./futsalReservePrices-loading-dialog/FutsalReservePricesLoadingDialog";
import { FutsalReservePriceDeleteDialog } from "./futsalReservePrice-delete-dialog/FutsalReservePriceDeleteDialog";
import { FutsalReservePricesCard } from "./FutsalReservePricesCard";
import { FutsalReservePricesUIProvider } from "./FutsalReservePricesUIContext";

export function FutsalReservePricesPage({ history }) {
  const futsalReservePricesUIEvents = {
    newFutsalReservePriceButtonClick: () => {
      history.push("/futsal/futsalReservePrices/new");
    },
    openEditFutsalReservePricePage: (id) => {
      history.push(`/futsal/futsalReservePrices/${id}/edit`);
    },
    openDeleteFutsalReservePriceDialog: (id) => {
      history.push(`/futsal/futsalReservePrices/${id}/delete`);
    },
    openDeleteFutsalReservePricesDialog: () => {
      history.push(`/futsal/futsalReservePrices/deleteFutsalReservePrices`);
    },
    openFetchFutsalReservePricesDialog: () => {
      history.push(`/futsal/futsalReservePrices/fetch`);
    },
    openUpdateFutsalReservePricesStatusDialog: () => {
      history.push("/futsal/futsalReservePrices/updateStatus");
    },
  };

  return (
    <FutsalReservePricesUIProvider
      futsalReservePricesUIEvents={futsalReservePricesUIEvents}
    >
      <FutsalReservePricesLoadingDialog />
      <Route path="/futsal/futsalReservePrices/:id/delete">
        {({ history, match }) => (
          <FutsalReservePriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalReservePrices");
            }}
          />
        )}
      </Route>
      <FutsalReservePricesCard />
    </FutsalReservePricesUIProvider>
  );
}
