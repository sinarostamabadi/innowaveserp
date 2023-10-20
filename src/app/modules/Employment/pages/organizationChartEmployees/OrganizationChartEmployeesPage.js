import React from "react";
import { Route } from "react-router-dom";
import { OrganizationChartEmployeesLoadingDialog } from "./organizationChartEmployees-loading-dialog/OrganizationChartEmployeesLoadingDialog";
import { OrganizationChartEmployeeDeleteDialog } from "./organizationChartEmployee-delete-dialog/OrganizationChartEmployeeDeleteDialog";
import { OrganizationChartEmployeesCard } from "./OrganizationChartEmployeesCard";
import { OrganizationChartEmployeesUIProvider } from "./OrganizationChartEmployeesUIContext";

export function OrganizationChartEmployeesPage({ history }) {
  const organizationChartEmployeesUIEvents = {
    newOrganizationChartEmployeeButtonClick: () => {
      history.push("/employment/organizationChartEmployees/new");
    },
    openEditOrganizationChartEmployeePage: (id) => {
      history.push(`/employment/organizationChartEmployees/${id}/edit`);
    },
    openDeleteOrganizationChartEmployeeDialog: (id) => {
      history.push(`/employment/organizationChartEmployees/${id}/delete`);
    },
    openDeleteOrganizationChartEmployeesDialog: () => {
      history.push(`/employment/organizationChartEmployees/deleteOrganizationChartEmployees`);
    },
    openFetchOrganizationChartEmployeesDialog: () => {
      history.push(`/employment/organizationChartEmployees/fetch`);
    },
    openUpdateOrganizationChartEmployeesStatusDialog: () => {
      history.push("/employment/organizationChartEmployees/updateStatus");
    },
  };
  
  return (
    <OrganizationChartEmployeesUIProvider organizationChartEmployeesUIEvents={organizationChartEmployeesUIEvents}>
      <OrganizationChartEmployeesLoadingDialog />
      <Route path="/employment/organizationChartEmployees/:id/delete">
        {({ history, match }) => (
          <OrganizationChartEmployeeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/organizationChartEmployees");
            }}
          />
        )}
      </Route>
      <OrganizationChartEmployeesCard />
    </OrganizationChartEmployeesUIProvider>
  );
}