import React from "react";
import { Route } from "react-router-dom";
import { CentersLoadingDialog } from "./centers-loading-dialog/CentersLoadingDialog";
import { CenterDeleteDialog } from "./center-delete-dialog/CenterDeleteDialog";
import { CentersCard } from "./CentersCard";
import { CentersUIProvider } from "./CentersUIContext";

export function CentersPage({ history }) {
  const centersUIEvents = {
    newCenterButtonClick: () => {
      history.push("/bowling/centers/new");
    },
    openEditCenterPage: (id) => {
      history.push(`/bowling/centers/${id}/edit`);
    },
    openDeleteCenterDialog: (id) => {
      history.push(`/bowling/centers/${id}/delete`);
    },
    openDeleteCentersDialog: () => {
      history.push(`/bowling/centers/deleteCenters`);
    },
    openFetchCentersDialog: () => {
      history.push(`/bowling/centers/fetch`);
    },
    openUpdateCentersStatusDialog: () => {
      history.push("/bowling/centers/updateStatus");
    },
  };
  
  return (
    <CentersUIProvider centersUIEvents={centersUIEvents}>
      <CentersLoadingDialog />
      <Route path="/bowling/centers/:id/delete">
        {({ history, match }) => (
          <CenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/centers");
            }}
          />
        )}
      </Route>
      <CentersCard />
    </CentersUIProvider>
  );
}