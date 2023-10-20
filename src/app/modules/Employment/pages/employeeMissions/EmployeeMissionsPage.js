import React from "react";
import { Route } from "react-router-dom";
import { EmployeeMissionsLoadingDialog } from "./employeeMissions-loading-dialog/EmployeeMissionsLoadingDialog";
import { EmployeeMissionDeleteDialog } from "./employeeMission-delete-dialog/EmployeeMissionDeleteDialog";
import { EmployeeMissionsCard } from "./EmployeeMissionsCard";
import { EmployeeMissionsUIProvider } from "./EmployeeMissionsUIContext";

export function EmployeeMissionsPage({ history }) {
  const employeeMissionsUIEvents = {
    newEmployeeMissionButtonClick: () => {
      history.push("/employment/employeeMissions/new");
    },
    openEditEmployeeMissionPage: (id) => {
      history.push(`/employment/employeeMissions/${id}/edit`);
    },
    openDeleteEmployeeMissionDialog: (id) => {
      history.push(`/employment/employeeMissions/${id}/delete`);
    },
    openDeleteEmployeeMissionsDialog: () => {
      history.push(`/employment/employeeMissions/deleteEmployeeMissions`);
    },
    openFetchEmployeeMissionsDialog: () => {
      history.push(`/employment/employeeMissions/fetch`);
    },
    openUpdateEmployeeMissionsStatusDialog: () => {
      history.push("/employment/employeeMissions/updateStatus");
    },
  };
  
  return (
    <EmployeeMissionsUIProvider employeeMissionsUIEvents={employeeMissionsUIEvents}>
      <EmployeeMissionsLoadingDialog />
      <Route path="/employment/employeeMissions/:id/delete">
        {({ history, match }) => (
          <EmployeeMissionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeMissions");
            }}
          />
        )}
      </Route>
      <EmployeeMissionsCard />
    </EmployeeMissionsUIProvider>
  );
}