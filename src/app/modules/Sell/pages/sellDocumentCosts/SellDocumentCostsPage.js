import React from "react";
import { Route } from "react-router-dom";
import { SellDocumentCostsLoadingDialog } from "./sellDocumentCosts-loading-dialog/SellDocumentCostsLoadingDialog";
import { SellDocumentCostDeleteDialog } from "./sellDocumentCost-delete-dialog/SellDocumentCostDeleteDialog";
import { SellDocumentCostsCard } from "./SellDocumentCostsCard";
import { SellDocumentCostsUIProvider } from "./SellDocumentCostsUIContext";

export function SellDocumentCostsPage({ history }) {
  const sellDocumentCostsUIEvents = {
    newSellDocumentCostButtonClick: () => {
      history.push("/sell/sellDocumentCosts/new");
    },
    openEditSellDocumentCostPage: (id) => {
      history.push(`/sell/sellDocumentCosts/${id}/edit`);
    },
    openDeleteSellDocumentCostDialog: (id) => {
      history.push(`/sell/sellDocumentCosts/${id}/delete`);
    },
    openDeleteSellDocumentCostsDialog: () => {
      history.push(`/sell/sellDocumentCosts/deleteSellDocumentCosts`);
    },
    openFetchSellDocumentCostsDialog: () => {
      history.push(`/sell/sellDocumentCosts/fetch`);
    },
    openUpdateSellDocumentCostsStatusDialog: () => {
      history.push("/sell/sellDocumentCosts/updateStatus");
    },
  };
  
  return (
    <SellDocumentCostsUIProvider sellDocumentCostsUIEvents={sellDocumentCostsUIEvents}>
      <SellDocumentCostsLoadingDialog />
      <Route path="/sell/sellDocumentCosts/:id/delete">
        {({ history, match }) => (
          <SellDocumentCostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDocumentCosts");
            }}
          />
        )}
      </Route>
      <SellDocumentCostsCard />
    </SellDocumentCostsUIProvider>
  );
}