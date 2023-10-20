import React from "react";
import { Route } from "react-router-dom";
import { BuyDiscountsLoadingDialog } from "./buyDiscounts-loading-dialog/BuyDiscountsLoadingDialog";
import { BuyDiscountDeleteDialog } from "./buyDiscount-delete-dialog/BuyDiscountDeleteDialog";
import { BuyDiscountsCard } from "./BuyDiscountsCard";
import { BuyDiscountsUIProvider } from "./BuyDiscountsUIContext";

export function BuyDiscountsPage({ history }) {
  const buyDiscountsUIEvents = {
    newBuyDiscountButtonClick: () => {
      history.push("/purchaseOrder/buyDiscounts/new");
    },
    openEditBuyDiscountPage: (id) => {
      history.push(`/purchaseOrder/buyDiscounts/${id}/edit`);
    },
    openDeleteBuyDiscountDialog: (id) => {
      history.push(`/purchaseOrder/buyDiscounts/${id}/delete`);
    },
    openDeleteBuyDiscountsDialog: () => {
      history.push(`/purchaseOrder/buyDiscounts/deleteBuyDiscounts`);
    },
    openFetchBuyDiscountsDialog: () => {
      history.push(`/purchaseOrder/buyDiscounts/fetch`);
    },
    openUpdateBuyDiscountsStatusDialog: () => {
      history.push("/purchaseOrder/buyDiscounts/updateStatus");
    },
  };
  
  return (
    <BuyDiscountsUIProvider buyDiscountsUIEvents={buyDiscountsUIEvents}>
      <BuyDiscountsLoadingDialog />
      <Route path="/purchaseOrder/buyDiscounts/:id/delete">
        {({ history, match }) => (
          <BuyDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buyDiscounts");
            }}
          />
        )}
      </Route>
      <BuyDiscountsCard />
    </BuyDiscountsUIProvider>
  );
}