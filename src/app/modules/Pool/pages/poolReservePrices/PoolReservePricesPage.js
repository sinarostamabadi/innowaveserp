import React from "react";
import { Route } from "react-router-dom";
import { PoolReservePricesLoadingDialog } from "./poolReservePrices-loading-dialog/PoolReservePricesLoadingDialog";
import { PoolReservePriceDeleteDialog } from "./poolReservePrice-delete-dialog/PoolReservePriceDeleteDialog";
import { PoolReservePricesCard } from "./PoolReservePricesCard";
import { PoolReservePricesUIProvider } from "./PoolReservePricesUIContext";

export function PoolReservePricesPage({ history }) {
  const poolReservePricesUIEvents = {
    newPoolReservePriceButtonClick: () => {
      history.push("/pool/poolReservePrices/new");
    },
    openEditPoolReservePricePage: (id) => {
      history.push(`/pool/poolReservePrices/${id}/edit`);
    },
    openDeletePoolReservePriceDialog: (id) => {
      history.push(`/pool/poolReservePrices/${id}/delete`);
    },
    openDeletePoolReservePricesDialog: () => {
      history.push(`/pool/poolReservePrices/deletePoolReservePrices`);
    },
    openFetchPoolReservePricesDialog: () => {
      history.push(`/pool/poolReservePrices/fetch`);
    },
    openUpdatePoolReservePricesStatusDialog: () => {
      history.push("/pool/poolReservePrices/updateStatus");
    },
  };
  
  return (
    <PoolReservePricesUIProvider poolReservePricesUIEvents={poolReservePricesUIEvents}>
      <PoolReservePricesLoadingDialog />
      <Route path="/pool/poolReservePrices/:id/delete">
        {({ history, match }) => (
          <PoolReservePriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/pool/poolReservePrices");
            }}
          />
        )}
      </Route>
      <PoolReservePricesCard />
    </PoolReservePricesUIProvider>
  );
}