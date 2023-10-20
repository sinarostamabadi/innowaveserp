import React from "react";
import { Route } from "react-router-dom";
import { BuySerialsLoadingDialog } from "./buySerials-loading-dialog/BuySerialsLoadingDialog";
import { BuySerialDeleteDialog } from "./buySerial-delete-dialog/BuySerialDeleteDialog";
import { BuySerialsCard } from "./BuySerialsCard";
import { BuySerialsUIProvider } from "./BuySerialsUIContext";

export function BuySerialsPage({ history }) {
  const buySerialsUIEvents = {
    newBuySerialButtonClick: () => {
      history.push("/purchaseOrder/buySerials/new");
    },
    openEditBuySerialPage: (id) => {
      history.push(`/purchaseOrder/buySerials/${id}/edit`);
    },
    openDeleteBuySerialDialog: (id) => {
      history.push(`/purchaseOrder/buySerials/${id}/delete`);
    },
    openDeleteBuySerialsDialog: () => {
      history.push(`/purchaseOrder/buySerials/deleteBuySerials`);
    },
    openFetchBuySerialsDialog: () => {
      history.push(`/purchaseOrder/buySerials/fetch`);
    },
    openUpdateBuySerialsStatusDialog: () => {
      history.push("/purchaseOrder/buySerials/updateStatus");
    },
  };
  
  return (
    <BuySerialsUIProvider buySerialsUIEvents={buySerialsUIEvents}>
      <BuySerialsLoadingDialog />
      <Route path="/purchaseOrder/buySerials/:id/delete">
        {({ history, match }) => (
          <BuySerialDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buySerials");
            }}
          />
        )}
      </Route>
      <BuySerialsCard />
    </BuySerialsUIProvider>
  );
}