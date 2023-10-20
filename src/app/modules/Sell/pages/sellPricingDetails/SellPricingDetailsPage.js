import React from "react";
import { Route } from "react-router-dom";
import { SellPricingDetailsLoadingDialog } from "./sellPricingDetails-loading-dialog/SellPricingDetailsLoadingDialog";
import { SellPricingDetailDeleteDialog } from "./sellPricingDetail-delete-dialog/SellPricingDetailDeleteDialog";
import { SellPricingDetailsCard } from "./SellPricingDetailsCard";
import { SellPricingDetailsUIProvider } from "./SellPricingDetailsUIContext";

export function SellPricingDetailsPage({ history }) {
  const sellPricingDetailsUIEvents = {
    newSellPricingDetailButtonClick: () => {
      history.push("/sell/sellPricingDetails/new");
    },
    openEditSellPricingDetailPage: (id) => {
      history.push(`/sell/sellPricingDetails/${id}/edit`);
    },
    openDeleteSellPricingDetailDialog: (id) => {
      history.push(`/sell/sellPricingDetails/${id}/delete`);
    },
    openDeleteSellPricingDetailsDialog: () => {
      history.push(`/sell/sellPricingDetails/deleteSellPricingDetails`);
    },
    openFetchSellPricingDetailsDialog: () => {
      history.push(`/sell/sellPricingDetails/fetch`);
    },
    openUpdateSellPricingDetailsStatusDialog: () => {
      history.push("/sell/sellPricingDetails/updateStatus");
    },
  };
  
  return (
    <SellPricingDetailsUIProvider sellPricingDetailsUIEvents={sellPricingDetailsUIEvents}>
      <SellPricingDetailsLoadingDialog />
      <Route path="/sell/sellPricingDetails/:id/delete">
        {({ history, match }) => (
          <SellPricingDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellPricingDetails");
            }}
          />
        )}
      </Route>
      <SellPricingDetailsCard />
    </SellPricingDetailsUIProvider>
  );
}