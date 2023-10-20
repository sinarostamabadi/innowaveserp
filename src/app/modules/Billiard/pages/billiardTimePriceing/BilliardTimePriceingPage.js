import React from "react";
import { Route } from "react-router-dom";
import { BilliardTimePriceingLoadingDialog } from "./billiardTimePriceing-loading-dialog/BilliardTimePriceingLoadingDialog";
import { BilliardTimePriceingDeleteDialog } from "./billiardTimePriceing-delete-dialog/BilliardTimePriceingDeleteDialog";
import { BilliardTimePriceingCard } from "./BilliardTimePriceingCard";
import { BilliardTimePriceingUIProvider } from "./BilliardTimePriceingUIContext";

export function BilliardTimePriceingPage({ history }) {
  const billiardTimePriceingUIEvents = {
    newBilliardTimePriceingButtonClick: () => {
      history.push("/billiard/billiardTimePriceing/new");
    },
    openEditBilliardTimePriceingPage: (id) => {
      history.push(`/billiard/billiardTimePriceing/${id}/edit`);
    },
    openDeleteBilliardTimePriceingDialog: (id) => {
      history.push(`/billiard/billiardTimePriceing/${id}/delete`);
    },
    openDeleteBilliardTimePriceingDialog: () => {
      history.push(`/billiard/billiardTimePriceing/deleteBilliardTimePriceing`);
    },
    openFetchBilliardTimePriceingDialog: () => {
      history.push(`/billiard/billiardTimePriceing/fetch`);
    },
    openUpdateBilliardTimePriceingStatusDialog: () => {
      history.push("/billiard/billiardTimePriceing/updateStatus");
    },
  };
  
  return (
    <BilliardTimePriceingUIProvider billiardTimePriceingUIEvents={billiardTimePriceingUIEvents}>
      <BilliardTimePriceingLoadingDialog />
      <Route path="/billiard/billiardTimePriceing/:id/delete">
        {({ history, match }) => (
          <BilliardTimePriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/billiard/billiardTimePriceing");
            }}
          />
        )}
      </Route>
      <BilliardTimePriceingCard />
    </BilliardTimePriceingUIProvider>
  );
}