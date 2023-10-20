import React from "react";
import { Route } from "react-router-dom";
import { SellDiscountFactorsLoadingDialog } from "./sellDiscountFactors-loading-dialog/SellDiscountFactorsLoadingDialog";
import { SellDiscountFactorDeleteDialog } from "./sellDiscountFactor-delete-dialog/SellDiscountFactorDeleteDialog";
import { SellDiscountFactorsCard } from "./SellDiscountFactorsCard";
import { SellDiscountFactorsUIProvider } from "./SellDiscountFactorsUIContext";

export function SellDiscountFactorsPage({ history }) {
  const sellDiscountFactorsUIEvents = {
    newSellDiscountFactorButtonClick: () => {
      history.push("/sell/sellDiscountFactors/new");
    },
    openEditSellDiscountFactorPage: (id) => {
      history.push(`/sell/sellDiscountFactors/${id}/edit`);
    },
    openDeleteSellDiscountFactorDialog: (id) => {
      history.push(`/sell/sellDiscountFactors/${id}/delete`);
    },
    openDeleteSellDiscountFactorsDialog: () => {
      history.push(`/sell/sellDiscountFactors/deleteSellDiscountFactors`);
    },
    openFetchSellDiscountFactorsDialog: () => {
      history.push(`/sell/sellDiscountFactors/fetch`);
    },
    openUpdateSellDiscountFactorsStatusDialog: () => {
      history.push("/sell/sellDiscountFactors/updateStatus");
    },
  };
  
  return (
    <SellDiscountFactorsUIProvider sellDiscountFactorsUIEvents={sellDiscountFactorsUIEvents}>
      <SellDiscountFactorsLoadingDialog />
      <Route path="/sell/sellDiscountFactors/:id/delete">
        {({ history, match }) => (
          <SellDiscountFactorDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDiscountFactors");
            }}
          />
        )}
      </Route>
      <SellDiscountFactorsCard />
    </SellDiscountFactorsUIProvider>
  );
}