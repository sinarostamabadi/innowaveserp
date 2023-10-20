import React from "react";
import { Route } from "react-router-dom";
import { SellDiscountsLoadingDialog } from "./sellDiscounts-loading-dialog/SellDiscountsLoadingDialog";
import { SellDiscountDeleteDialog } from "./sellDiscount-delete-dialog/SellDiscountDeleteDialog";
import { SellDiscountsCard } from "./SellDiscountsCard";
import { SellDiscountsUIProvider } from "./SellDiscountsUIContext";

export function SellDiscountsPage({ history }) {
  const sellDiscountsUIEvents = {
    newSellDiscountButtonClick: (mode) => {
      switch (mode) {
        case 1:
          history.push("/Sell/sellDiscounts/factor/new");
          break;
        case 2:
          history.push("/Sell/sellDiscounts/product/new");
          break;
        case 3:
          history.push("/Sell/sellDiscounts/percent/new");
          break;
      }
    },
    openEditSellDiscountPage: (id) => {
      history.push(`/Sell/sellDiscounts/${id}/edit`);
    },
    openDeleteSellDiscountDialog: (id) => {
      history.push(`/Sell/sellDiscounts/${id}/delete`);
    },
    openDeleteSellDiscountsDialog: () => {
      history.push(`/Sell/sellDiscounts/deleteSellDiscounts`);
    },
    openFetchSellDiscountsDialog: () => {
      history.push(`/Sell/sellDiscounts/fetch`);
    },
    openUpdateSellDiscountsStatusDialog: () => {
      history.push("/Sell/sellDiscounts/updateStatus");
    },
  };
  
  return (
    <SellDiscountsUIProvider sellDiscountsUIEvents={sellDiscountsUIEvents}>
      <SellDiscountsLoadingDialog />
      <Route path="/Sell/sellDiscounts/:id/delete">
        {({ history, match }) => (
          <SellDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Sell/sellDiscounts");
            }}
          />
        )}
      </Route>
      <SellDiscountsCard />
    </SellDiscountsUIProvider>
  );
}