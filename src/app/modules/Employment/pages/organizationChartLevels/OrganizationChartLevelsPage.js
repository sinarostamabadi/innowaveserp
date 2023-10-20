import React from "react";
import { Route } from "react-router-dom";
import { OrganizationChartLevelsLoadingDialog } from "./organizationChartLevels-loading-dialog/OrganizationChartLevelsLoadingDialog";
import { OrganizationChartLevelDeleteDialog } from "./organizationChartLevel-delete-dialog/OrganizationChartLevelDeleteDialog";
import { OrganizationChartLevelsCard } from "./OrganizationChartLevelsCard";
import { OrganizationChartLevelsUIProvider } from "./OrganizationChartLevelsUIContext";

export function OrganizationChartLevelsPage({ history }) {
  const organizationChartLevelsUIEvents = {
    newOrganizationChartLevelButtonClick: () => {
      history.push("/employment/organizationChartLevels/new");
    },
    openEditOrganizationChartLevelPage: (id) => {
      history.push(`/employment/organizationChartLevels/${id}/edit`);
    },
    openDeleteOrganizationChartLevelDialog: (id) => {
      history.push(`/employment/organizationChartLevels/${id}/delete`);
    },
    openDeleteOrganizationChartLevelsDialog: () => {
      history.push(`/employment/organizationChartLevels/deleteOrganizationChartLevels`);
    },
    openFetchOrganizationChartLevelsDialog: () => {
      history.push(`/employment/organizationChartLevels/fetch`);
    },
    openUpdateOrganizationChartLevelsStatusDialog: () => {
      history.push("/employment/organizationChartLevels/updateStatus");
    },
  };
  
  return (
    <OrganizationChartLevelsUIProvider organizationChartLevelsUIEvents={organizationChartLevelsUIEvents}>
      <OrganizationChartLevelsLoadingDialog />
      <Route path="/employment/organizationChartLevels/:id/delete">
        {({ history, match }) => (
          <OrganizationChartLevelDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/organizationChartLevels");
            }}
          />
        )}
      </Route>
      <OrganizationChartLevelsCard />
    </OrganizationChartLevelsUIProvider>
  );
}