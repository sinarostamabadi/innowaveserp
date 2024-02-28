import React from "react";
import { Route } from "react-router-dom";
import { OrganizationUnitsLoadingDialog } from "./organizationUnits-loading-dialog/OrganizationUnitsLoadingDialog";
import { OrganizationUnitDeleteDialog } from "./organizationUnit-delete-dialog/OrganizationUnitDeleteDialog";
import { OrganizationUnitsCard } from "./OrganizationUnitsCard";
import { OrganizationUnitsUIProvider } from "./OrganizationUnitsUIContext";

export function OrganizationUnitsPage({ history }) {
  const organizationUnitsUIEvents = {
    newOrganizationUnitButtonClick: () => {
      history.push("/employment/organizationUnits/new");
    },
    openEditOrganizationUnitPage: (id) => {
      history.push(`/employment/organizationUnits/${id}/edit`);
    },
    openDeleteOrganizationUnitDialog: (id) => {
      history.push(`/employment/organizationUnits/${id}/delete`);
    },
    openDeleteOrganizationUnitsDialog: () => {
      history.push(`/employment/organizationUnits/deleteOrganizationUnits`);
    },
    openFetchOrganizationUnitsDialog: () => {
      history.push(`/employment/organizationUnits/fetch`);
    },
    openUpdateOrganizationUnitsStatusDialog: () => {
      history.push("/employment/organizationUnits/updateStatus");
    },
  };

  return (
    <OrganizationUnitsUIProvider
      organizationUnitsUIEvents={organizationUnitsUIEvents}
    >
      <OrganizationUnitsLoadingDialog />
      <Route path="/employment/organizationUnits/:id/delete">
        {({ history, match }) => (
          <OrganizationUnitDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/organizationUnits");
            }}
          />
        )}
      </Route>
      <OrganizationUnitsCard />
    </OrganizationUnitsUIProvider>
  );
}
