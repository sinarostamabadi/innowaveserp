import React from "react";
import { Route } from "react-router-dom";
import { ServicesesLoadingDialog } from "./serviceses-loading-dialog/ServicesesLoadingDialog";
import { ServicesDeleteDialog } from "./services-delete-dialog/ServicesDeleteDialog";
import { ServicesesCard } from "./ServicesesCard";
import { ServicesesUIProvider } from "./ServicesesUIContext";

export function ServicesesPage({ history }) {
  const servicesesUIEvents = {
    newServicesButtonClick: () => {
      history.push("/security/serviceses/new");
    },
    openEditServicesPage: (id) => {
      history.push(`/security/serviceses/${id}/edit`);
    },
    openDeleteServicesDialog: (id) => {
      history.push(`/security/serviceses/${id}/delete`);
    },
    openDeleteServicesesDialog: () => {
      history.push(`/security/serviceses/deleteServiceses`);
    },
    openFetchServicesesDialog: () => {
      history.push(`/security/serviceses/fetch`);
    },
    openUpdateServicesesStatusDialog: () => {
      history.push("/security/serviceses/updateStatus");
    },
  };
  
  return (
    <ServicesesUIProvider servicesesUIEvents={servicesesUIEvents}>
      <ServicesesLoadingDialog />
      <Route path="/security/serviceses/:id/delete">
        {({ history, match }) => (
          <ServicesDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/security/serviceses");
            }}
          />
        )}
      </Route>
      <ServicesesCard />
    </ServicesesUIProvider>
  );
}