import React from "react";
import { Route } from "react-router-dom";
import { SellPricingsLoadingDialog } from "./sellPricings-loading-dialog/SellPricingsLoadingDialog";
import { SellPricingDeleteDialog } from "./sellPricing-delete-dialog/SellPricingDeleteDialog";
import { SellPricingsCard } from "./SellPricingsCard";
import { SellPricingsUIProvider } from "./SellPricingsUIContext";

export function SellPricingsPage({ history }) {
  const sellPricingsUIEvents = {
    newSellPricingButtonClick: () => {
      history.push("/Sell/sellPricings/new");
    },
    openEditSellPricingPage: (id) => {
      history.push(`/Sell/sellPricings/${id}/edit`);
    },
    openDeleteSellPricingDialog: (id) => {
      history.push(`/Sell/sellPricings/${id}/delete`);
    },
    openDeleteSellPricingsDialog: () => {
      history.push(`/Sell/sellPricings/deleteSellPricings`);
    },
    openFetchSellPricingsDialog: () => {
      history.push(`/Sell/sellPricings/fetch`);
    },
    openUpdateSellPricingsStatusDialog: () => {
      history.push("/Sell/sellPricings/updateStatus");
    },
  };
  
  return (
    <SellPricingsUIProvider sellPricingsUIEvents={sellPricingsUIEvents}>
      <SellPricingsLoadingDialog />
      <Route path="/Sell/sellPricings/:id/delete">
        {({ history, match }) => (
          <SellPricingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Sell/sellPricings");
            }}
          />
        )}
      </Route>
      <SellPricingsCard />
    </SellPricingsUIProvider>
  );
}