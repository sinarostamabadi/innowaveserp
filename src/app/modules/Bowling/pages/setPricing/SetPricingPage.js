import React from "react";
import { Route } from "react-router-dom";
import { SetPricingLoadingDialog } from "./setPricing-loading-dialog/SetPricingLoadingDialog";
import { SetPricingDeleteDialog } from "./setPricing-delete-dialog/SetPricingDeleteDialog"
import { SetPricingCard } from "./SetPricingCard";
import { SetPricingUIProvider } from "./SetPricingUIContext";

export function SetPricingPage({ history }) {
  const setPricingUIEvents = {
    newSetPricingButtonClick: () => {
      history.push("/bowling/setPricing/new");
    },
    openEditSetPricingPage: (id) => {
      history.push(`/bowling/setPricing/${id}/edit`);
    },
    openDeleteSetPricingDialog: (id) => {
      history.push(`/bowling/setPricing/${id}/delete`);
    },
  /*   openDeleteSetPricingDialog: () => {
      history.push(`/bowling/setPricing/deleteSetPricing`);
    }, */
    openFetchSetPricingDialog: () => {
      history.push(`/bowling/setPricing/fetch`);
    },
    openUpdateSetPricingStatusDialog: () => {
      history.push("/bowling/setPricing/updateStatus");
    },
  };
  return (
    <SetPricingUIProvider setPricingUIEvents={setPricingUIEvents}>
      <SetPricingLoadingDialog />
      <Route path="/bowling/setPricing/:id/delete">
        {({ history, match }) => (
          <SetPricingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/setPricing");
            }}
          />
        )}
      </Route>
      <SetPricingCard />
    </SetPricingUIProvider>
  );
}