import React from "react";
import { Route } from "react-router-dom";
import { BuyRequestDetailsLoadingDialog } from "./buyRequestDetails-loading-dialog/BuyRequestDetailsLoadingDialog";
import { BuyRequestDetailDeleteDialog } from "./buyRequestDetail-delete-dialog/BuyRequestDetailDeleteDialog";
import { BuyRequestDetailsCard } from "./BuyRequestDetailsCard";
import { BuyRequestDetailsUIProvider } from "./BuyRequestDetailsUIContext";

export function BuyRequestDetailsPage({ history }) {
  const buyRequestDetailsUIEvents = {
    newBuyRequestDetailButtonClick: () => {
      history.push("/purchaseOrder/buyRequestDetails/new");
    },
    openEditBuyRequestDetailPage: (id) => {
      history.push(`/purchaseOrder/buyRequestDetails/${id}/edit`);
    },
    openDeleteBuyRequestDetailDialog: (id) => {
      history.push(`/purchaseOrder/buyRequestDetails/${id}/delete`);
    },
    openDeleteBuyRequestDetailsDialog: () => {
      history.push(`/purchaseOrder/buyRequestDetails/deleteBuyRequestDetails`);
    },
    openFetchBuyRequestDetailsDialog: () => {
      history.push(`/purchaseOrder/buyRequestDetails/fetch`);
    },
    openUpdateBuyRequestDetailsStatusDialog: () => {
      history.push("/purchaseOrder/buyRequestDetails/updateStatus");
    },
  };
  
  return (
    <BuyRequestDetailsUIProvider buyRequestDetailsUIEvents={buyRequestDetailsUIEvents}>
      <BuyRequestDetailsLoadingDialog />
      <Route path="/purchaseOrder/buyRequestDetails/:id/delete">
        {({ history, match }) => (
          <BuyRequestDetailDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buyRequestDetails");
            }}
          />
        )}
      </Route>
      <BuyRequestDetailsCard />
    </BuyRequestDetailsUIProvider>
  );
}