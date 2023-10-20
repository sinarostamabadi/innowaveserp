import React from "react";
import { Route } from "react-router-dom";
import { SellDocumentDiscountsLoadingDialog } from "./sellDocumentDiscounts-loading-dialog/SellDocumentDiscountsLoadingDialog";
import { SellDocumentDiscountDeleteDialog } from "./sellDocumentDiscount-delete-dialog/SellDocumentDiscountDeleteDialog";
import { SellDocumentDiscountsCard } from "./SellDocumentDiscountsCard";
import { SellDocumentDiscountsUIProvider } from "./SellDocumentDiscountsUIContext";

export function SellDocumentDiscountsPage({ history }) {
  const sellDocumentDiscountsUIEvents = {
    newSellDocumentDiscountButtonClick: () => {
      history.push("/sell/sellDocumentDiscounts/new");
    },
    openEditSellDocumentDiscountPage: (id) => {
      history.push(`/sell/sellDocumentDiscounts/${id}/edit`);
    },
    openDeleteSellDocumentDiscountDialog: (id) => {
      history.push(`/sell/sellDocumentDiscounts/${id}/delete`);
    },
    openDeleteSellDocumentDiscountsDialog: () => {
      history.push(`/sell/sellDocumentDiscounts/deleteSellDocumentDiscounts`);
    },
    openFetchSellDocumentDiscountsDialog: () => {
      history.push(`/sell/sellDocumentDiscounts/fetch`);
    },
    openUpdateSellDocumentDiscountsStatusDialog: () => {
      history.push("/sell/sellDocumentDiscounts/updateStatus");
    },
  };
  
  return (
    <SellDocumentDiscountsUIProvider sellDocumentDiscountsUIEvents={sellDocumentDiscountsUIEvents}>
      <SellDocumentDiscountsLoadingDialog />
      <Route path="/sell/sellDocumentDiscounts/:id/delete">
        {({ history, match }) => (
          <SellDocumentDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/sell/sellDocumentDiscounts");
            }}
          />
        )}
      </Route>
      <SellDocumentDiscountsCard />
    </SellDocumentDiscountsUIProvider>
  );
}