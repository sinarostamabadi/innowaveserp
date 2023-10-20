import React from "react";
import { Route } from "react-router-dom";
import { FutsalCentersLoadingDialog } from "./futsalCenters-loading-dialog/FutsalCentersLoadingDialog";
import { FutsalCenterDeleteDialog } from "./futsalCenter-delete-dialog/FutsalCenterDeleteDialog";
import { FutsalCentersCard } from "./FutsalCentersCard";
import { FutsalCentersUIProvider } from "./FutsalCentersUIContext";

export function FutsalCentersPage({ history }) {
  const futsalCentersUIEvents = {
    newFutsalCenterButtonClick: () => {
      history.push("/futsal/futsalCenters/new");
    },
    openEditFutsalCenterPage: (id) => {
      history.push(`/futsal/futsalCenters/${id}/edit`);
    },
    openDeleteFutsalCenterDialog: (id) => {
      history.push(`/futsal/futsalCenters/${id}/delete`);
    },
    openDeleteFutsalCentersDialog: () => {
      history.push(`/futsal/futsalCenters/deleteFutsalCenters`);
    },
    openFetchFutsalCentersDialog: () => {
      history.push(`/futsal/futsalCenters/fetch`);
    },
    openUpdateFutsalCentersStatusDialog: () => {
      history.push("/futsal/futsalCenters/updateStatus");
    },
  };
  
  return (
    <FutsalCentersUIProvider futsalCentersUIEvents={futsalCentersUIEvents}>
      <FutsalCentersLoadingDialog />
      <Route path="/futsal/futsalCenters/:id/delete">
        {({ history, match }) => (
          <FutsalCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalCenters");
            }}
          />
        )}
      </Route>
      <FutsalCentersCard />
    </FutsalCentersUIProvider>
  );
}