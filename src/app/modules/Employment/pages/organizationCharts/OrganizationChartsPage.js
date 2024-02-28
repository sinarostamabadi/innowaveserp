import React from "react";
import { Route } from "react-router-dom";
import { OrganizationChartsLoadingDialog } from "./organizationCharts-loading-dialog/OrganizationChartsLoadingDialog";
import { OrganizationChartDeleteDialog } from "./organizationChart-delete-dialog/OrganizationChartDeleteDialog";
import { OrganizationChartsCard } from "./OrganizationChartsCard";
import { OrganizationChartsUIProvider } from "./OrganizationChartsUIContext";

export function OrganizationChartsPage({ history }) {
  const organizationChartsUIEvents = {
    newOrganizationChartButtonClick: () => {
      history.push("/employment/organizationCharts/new");
    },
    openEditOrganizationChartPage: (id) => {
      history.push(`/employment/organizationCharts/${id}/edit`);
    },
    openDeleteOrganizationChartDialog: (id) => {
      history.push(`/employment/organizationCharts/${id}/delete`);
    },
    openDeleteOrganizationChartsDialog: () => {
      history.push(`/employment/organizationCharts/deleteOrganizationCharts`);
    },
    openFetchOrganizationChartsDialog: () => {
      history.push(`/employment/organizationCharts/fetch`);
    },
    openUpdateOrganizationChartsStatusDialog: () => {
      history.push("/employment/organizationCharts/updateStatus");
    },
  };

  return (
    <OrganizationChartsUIProvider
      organizationChartsUIEvents={organizationChartsUIEvents}
    >
      <OrganizationChartsLoadingDialog />
      <Route path="/employment/organizationCharts/:id/delete">
        {({ history, match }) => (
          <OrganizationChartDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/organizationCharts");
            }}
          />
        )}
      </Route>
      <OrganizationChartsCard />
    </OrganizationChartsUIProvider>
  );
}
