import React from "react";
import { Route } from "react-router-dom";
import { EmployeeEducarionsLoadingDialog } from "./employeeEducarions-loading-dialog/EmployeeEducarionsLoadingDialog";
import { EmployeeEducarionDeleteDialog } from "./employeeEducarion-delete-dialog/EmployeeEducarionDeleteDialog";
import { EmployeeEducarionsCard } from "./EmployeeEducarionsCard";
import { EmployeeEducarionsUIProvider } from "./EmployeeEducarionsUIContext";

export function EmployeeEducarionsPage({ history }) {
  const employeeEducarionsUIEvents = {
    newEmployeeEducarionButtonClick: () => {
      history.push("/employment/employeeEducarions/new");
    },
    openEditEmployeeEducarionPage: (id) => {
      history.push(`/employment/employeeEducarions/${id}/edit`);
    },
    openDeleteEmployeeEducarionDialog: (id) => {
      history.push(`/employment/employeeEducarions/${id}/delete`);
    },
    openDeleteEmployeeEducarionsDialog: () => {
      history.push(`/employment/employeeEducarions/deleteEmployeeEducarions`);
    },
    openFetchEmployeeEducarionsDialog: () => {
      history.push(`/employment/employeeEducarions/fetch`);
    },
    openUpdateEmployeeEducarionsStatusDialog: () => {
      history.push("/employment/employeeEducarions/updateStatus");
    },
  };
  
  return (
    <EmployeeEducarionsUIProvider employeeEducarionsUIEvents={employeeEducarionsUIEvents}>
      <EmployeeEducarionsLoadingDialog />
      <Route path="/employment/employeeEducarions/:id/delete">
        {({ history, match }) => (
          <EmployeeEducarionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeEducarions");
            }}
          />
        )}
      </Route>
      <EmployeeEducarionsCard />
    </EmployeeEducarionsUIProvider>
  );
}