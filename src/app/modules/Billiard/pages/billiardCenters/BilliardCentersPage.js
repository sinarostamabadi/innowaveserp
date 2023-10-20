import React from "react";
import { Route } from "react-router-dom";
import { BilliardCentersLoadingDialog } from "./billiardCenters-loading-dialog/BilliardCentersLoadingDialog";
import { BilliardCenterDeleteDialog } from "./billiardCenter-delete-dialog/BilliardCenterDeleteDialog";
import { BilliardCentersCard } from "./BilliardCentersCard";
import { BilliardCentersUIProvider } from "./BilliardCentersUIContext";

export function BilliardCentersPage({ history }) {
  const billiardCentersUIEvents = {
    newBilliardCenterButtonClick: () => {
      history.push("/billiard/billiardCenters/new");
    },
    openEditBilliardCenterPage: (id) => {
      history.push(`/billiard/billiardCenters/${id}/edit`);
    },
    openDeleteBilliardCenterDialog: (id) => {
      history.push(`/billiard/billiardCenters/${id}/delete`);
    },
    openDeleteBilliardCentersDialog: () => {
      history.push(`/billiard/billiardCenters/deleteBilliardCenters`);
    },
    openFetchBilliardCentersDialog: () => {
      history.push(`/billiard/billiardCenters/fetch`);
    },
    openUpdateBilliardCentersStatusDialog: () => {
      history.push("/billiard/billiardCenters/updateStatus");
    },
  };
  
  return (
    <BilliardCentersUIProvider billiardCentersUIEvents={billiardCentersUIEvents}>
      <BilliardCentersLoadingDialog />
      <Route path="/billiard/billiardCenters/:id/delete">
        {({ history, match }) => (
          <BilliardCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/billiard/billiardCenters");
            }}
          />
        )}
      </Route>
      <BilliardCentersCard />
    </BilliardCentersUIProvider>
  );
}