import React from "react";
import { Route } from "react-router-dom";
import { ServiceItemsLoadingDialog } from "./serviceItems-loading-dialog/ServiceItemsLoadingDialog";
import { ServiceItemDeleteDialog } from "./serviceItem-delete-dialog/ServiceItemDeleteDialog";
import { ServiceItemsCard } from "./ServiceItemsCard";
import { ServiceItemsUIProvider } from "./ServiceItemsUIContext";

export function ServiceItemsPage({ history }) {
  const serviceItemsUIEvents = {
    newServiceItemButtonClick: () => {
      history.push("/security/serviceItems/new");
    },
    openEditServiceItemPage: (id) => {
      history.push(`/security/serviceItems/${id}/edit`);
    },
    openDeleteServiceItemDialog: (id) => {
      history.push(`/security/serviceItems/${id}/delete`);
    },
    openDeleteServiceItemsDialog: () => {
      history.push(`/security/serviceItems/deleteServiceItems`);
    },
    openFetchServiceItemsDialog: () => {
      history.push(`/security/serviceItems/fetch`);
    },
    openUpdateServiceItemsStatusDialog: () => {
      history.push("/security/serviceItems/updateStatus");
    },
  };

  return (
    <ServiceItemsUIProvider serviceItemsUIEvents={serviceItemsUIEvents}>
      <ServiceItemsLoadingDialog />
      <Route path="/security/serviceItems/:id/delete">
        {({ history, match }) => (
          <ServiceItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/serviceItems");
            }}
          />
        )}
      </Route>
      <ServiceItemsCard />
    </ServiceItemsUIProvider>
  );
}
