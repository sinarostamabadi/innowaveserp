import React from "react";
import { Route } from "react-router-dom";
import { BuyDetailsLoadingDialog } from "./buyDetails-loading-dialog/BuyDetailsLoadingDialog";
import { BuyDetailDeleteDialog } from "./buyDetail-delete-dialog/BuyDetailDeleteDialog";
import { BuyDetailsCard } from "./BuyDetailsCard";
import { BuyDetailsUIProvider } from "./BuyDetailsUIContext";

export function BuyDetailsPage({ history }) {
  const buyDetailsUIEvents = {
    newBuyDetailButtonClick: () => {
      history.push("/purchaseOrder/buyDetails/new");
    },
    openEditBuyDetailPage: (id) => {
      history.push(`/purchaseOrder/buyDetails/${id}/edit`);
    },
    openDeleteBuyDetailDialog: (id) => {
      history.push(`/purchaseOrder/buyDetails/${id}/delete`);
    },
    openDeleteBuyDetailsDialog: () => {
      history.push(`/purchaseOrder/buyDetails/deleteBuyDetails`);
    },
    openFetchBuyDetailsDialog: () => {
      history.push(`/purchaseOrder/buyDetails/fetch`);
    },
    openUpdateBuyDetailsStatusDialog: () => {
      history.push("/purchaseOrder/buyDetails/updateStatus");
    },
  };
  
  return (
    <BuyDetailsUIProvider buyDetailsUIEvents={buyDetailsUIEvents}>
      <BuyDetailsLoadingDialog />
      <Route path="/purchaseOrder/buyDetails/:id/delete">
        {({ history, match }) => (
          <BuyDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buyDetails");
            }}
          />
        )}
      </Route>
      <BuyDetailsCard />
    </BuyDetailsUIProvider>
  );
}