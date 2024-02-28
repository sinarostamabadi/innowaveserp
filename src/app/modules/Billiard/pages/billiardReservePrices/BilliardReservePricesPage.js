import React from "react";
import { Route } from "react-router-dom";
import { BilliardReservePricesLoadingDialog } from "./billiardReservePrices-loading-dialog/BilliardReservePricesLoadingDialog";
import { BilliardReservePriceDeleteDialog } from "./billiardReservePrice-delete-dialog/BilliardReservePriceDeleteDialog";
import { BilliardReservePricesCard } from "./BilliardReservePricesCard";
import { BilliardReservePricesUIProvider } from "./BilliardReservePricesUIContext";

export function BilliardReservePricesPage({ history }) {
  const billiardReservePricesUIEvents = {
    newBilliardReservePriceButtonClick: () => {
      history.push("/billiard/billiardReservePrices/new");
    },
    openEditBilliardReservePricePage: (id) => {
      history.push(`/billiard/billiardReservePrices/${id}/edit`);
    },
    openDeleteBilliardReservePriceDialog: (id) => {
      history.push(`/billiard/billiardReservePrices/${id}/delete`);
    },
    openDeleteBilliardReservePricesDialog: () => {
      history.push(
        `/billiard/billiardReservePrices/deleteBilliardReservePrices`
      );
    },
    openFetchBilliardReservePricesDialog: () => {
      history.push(`/billiard/billiardReservePrices/fetch`);
    },
    openUpdateBilliardReservePricesStatusDialog: () => {
      history.push("/billiard/billiardReservePrices/updateStatus");
    },
  };

  return (
    <BilliardReservePricesUIProvider
      billiardReservePricesUIEvents={billiardReservePricesUIEvents}
    >
      <BilliardReservePricesLoadingDialog />
      <Route path="/billiard/billiardReservePrices/:id/delete">
        {({ history, match }) => (
          <BilliardReservePriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/billiard/billiardReservePrices");
            }}
          />
        )}
      </Route>
      <BilliardReservePricesCard />
    </BilliardReservePricesUIProvider>
  );
}
