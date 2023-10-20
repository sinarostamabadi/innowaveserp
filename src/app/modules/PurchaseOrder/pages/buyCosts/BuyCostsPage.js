import React from "react";
import { Route } from "react-router-dom";
import { BuyCostsLoadingDialog } from "./buyCosts-loading-dialog/BuyCostsLoadingDialog";
import { BuyCostDeleteDialog } from "./buyCost-delete-dialog/BuyCostDeleteDialog";
import { BuyCostsCard } from "./BuyCostsCard";
import { BuyCostsUIProvider } from "./BuyCostsUIContext";

export function BuyCostsPage({ history }) {
  const buyCostsUIEvents = {
    newBuyCostButtonClick: () => {
      history.push("/purchaseOrder/buyCosts/new");
    },
    openEditBuyCostPage: (id) => {
      history.push(`/purchaseOrder/buyCosts/${id}/edit`);
    },
    openDeleteBuyCostDialog: (id) => {
      history.push(`/purchaseOrder/buyCosts/${id}/delete`);
    },
    openDeleteBuyCostsDialog: () => {
      history.push(`/purchaseOrder/buyCosts/deleteBuyCosts`);
    },
    openFetchBuyCostsDialog: () => {
      history.push(`/purchaseOrder/buyCosts/fetch`);
    },
    openUpdateBuyCostsStatusDialog: () => {
      history.push("/purchaseOrder/buyCosts/updateStatus");
    },
  };
  
  return (
    <BuyCostsUIProvider buyCostsUIEvents={buyCostsUIEvents}>
      <BuyCostsLoadingDialog />
      <Route path="/purchaseOrder/buyCosts/:id/delete">
        {({ history, match }) => (
          <BuyCostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/purchaseOrder/buyCosts");
            }}
          />
        )}
      </Route>
      <BuyCostsCard />
    </BuyCostsUIProvider>
  );
}