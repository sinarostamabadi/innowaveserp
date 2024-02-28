import React from "react";
import { Route } from "react-router-dom";
import { PoolCentersLoadingDialog } from "./poolCenters-loading-dialog/PoolCentersLoadingDialog";
import { PoolCenterDeleteDialog } from "./poolCenter-delete-dialog/PoolCenterDeleteDialog";
import { PoolCentersCard } from "./PoolCentersCard";
import { PoolCentersUIProvider } from "./PoolCentersUIContext";

export function PoolCentersPage({ history }) {
  const poolCentersUIEvents = {
    newPoolCenterButtonClick: () => {
      history.push("/pool/poolCenters/new");
    },
    openEditPoolCenterPage: (id) => {
      history.push(`/pool/poolCenters/${id}/edit`);
    },
    openDeletePoolCenterDialog: (id) => {
      history.push(`/pool/poolCenters/${id}/delete`);
    },
    openDeletePoolCentersDialog: () => {
      history.push(`/pool/poolCenters/deletePoolCenters`);
    },
    openFetchPoolCentersDialog: () => {
      history.push(`/pool/poolCenters/fetch`);
    },
    openUpdatePoolCentersStatusDialog: () => {
      history.push("/pool/poolCenters/updateStatus");
    },
  };

  return (
    <PoolCentersUIProvider poolCentersUIEvents={poolCentersUIEvents}>
      <PoolCentersLoadingDialog />
      <Route path="/pool/poolCenters/:id/delete">
        {({ history, match }) => (
          <PoolCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/pool/poolCenters");
            }}
          />
        )}
      </Route>
      <PoolCentersCard />
    </PoolCentersUIProvider>
  );
}
