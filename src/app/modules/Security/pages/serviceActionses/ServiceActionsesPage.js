import React from "react";
import { Route } from "react-router-dom";
import { ServiceActionsesLoadingDialog } from "./serviceActionses-loading-dialog/ServiceActionsesLoadingDialog";
import { ServiceActionsDeleteDialog } from "./serviceActions-delete-dialog/ServiceActionsDeleteDialog";
import { ServiceActionsesCard } from "./ServiceActionsesCard";
import { ServiceActionsesUIProvider } from "./ServiceActionsesUIContext";

export function ServiceActionsesPage({ history }) {
  const serviceActionsesUIEvents = {
    newServiceActionsButtonClick: () => {
      history.push("/security/serviceActionses/new");
    },
    openEditServiceActionsPage: (id) => {
      history.push(`/security/serviceActionses/${id}/edit`);
    },
    openDeleteServiceActionsDialog: (id) => {
      history.push(`/security/serviceActionses/${id}/delete`);
    },
    openDeleteServiceActionsesDialog: () => {
      history.push(`/security/serviceActionses/deleteServiceActionses`);
    },
    openFetchServiceActionsesDialog: () => {
      history.push(`/security/serviceActionses/fetch`);
    },
    openUpdateServiceActionsesStatusDialog: () => {
      history.push("/security/serviceActionses/updateStatus");
    },
  };
  
  return (
    <ServiceActionsesUIProvider serviceActionsesUIEvents={serviceActionsesUIEvents}>
      <ServiceActionsesLoadingDialog />
      <Route path="/security/serviceActionses/:id/delete">
        {({ history, match }) => (
          <ServiceActionsDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/serviceActionses");
            }}
          />
        )}
      </Route>
      <ServiceActionsesCard />
    </ServiceActionsesUIProvider>
  );
}