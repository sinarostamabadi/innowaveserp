import React from "react";
import { Route } from "react-router-dom";
import { BuyRequestsLoadingDialog } from "./buyRequests-loading-dialog/BuyRequestsLoadingDialog";
import { BuyRequestDeleteDialog } from "./buyRequest-delete-dialog/BuyRequestDeleteDialog";
import { BuyRequestsCard } from "./BuyRequestsCard";
import { BuyRequestsUIProvider } from "./BuyRequestsUIContext";

export function BuyRequestsPage({ history }) {
  const buyRequestsUIEvents = {
    newBuyRequestButtonClick: () => {
      history.push("/PurchaseOrder/buyRequests/new");
    },
    openEditBuyRequestPage: (id) => {
      history.push(`/PurchaseOrder/buyRequests/${id}/edit`);
    },
    openDeleteBuyRequestDialog: (id) => {
      history.push(`/PurchaseOrder/buyRequests/${id}/delete`);
    },
    openDeleteBuyRequestsDialog: () => {
      history.push(`/PurchaseOrder/buyRequests/deleteBuyRequests`);
    },
    openFetchBuyRequestsDialog: () => {
      history.push(`/PurchaseOrder/buyRequests/fetch`);
    },
    openUpdateBuyRequestsStatusDialog: () => {
      history.push("/PurchaseOrder/buyRequests/updateStatus");
    },
  };

  return (
    <BuyRequestsUIProvider buyRequestsUIEvents={buyRequestsUIEvents}>
      <BuyRequestsLoadingDialog />
      <Route path="/PurchaseOrder/buyRequests/:id/delete">
        {({ history, match }) => (
          <BuyRequestDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/PurchaseOrder/buyRequests");
            }}
          />
        )}
      </Route>
      <BuyRequestsCard />
    </BuyRequestsUIProvider>
  );
}
