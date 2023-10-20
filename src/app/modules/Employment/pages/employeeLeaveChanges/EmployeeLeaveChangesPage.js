import React from "react";
import { Route } from "react-router-dom";
import { EmployeeLeaveChangesLoadingDialog } from "./employeeLeaveChanges-loading-dialog/EmployeeLeaveChangesLoadingDialog";
import { EmployeeLeaveChangeDeleteDialog } from "./employeeLeaveChange-delete-dialog/EmployeeLeaveChangeDeleteDialog";
import { EmployeeLeaveChangesCard } from "./EmployeeLeaveChangesCard";
import { EmployeeLeaveChangesUIProvider } from "./EmployeeLeaveChangesUIContext";

export function EmployeeLeaveChangesPage({ history }) {
  const employeeLeaveChangesUIEvents = {
    newEmployeeLeaveChangeButtonClick: () => {
      history.push("/employment/employeeLeaveChanges/new");
    },
    openEditEmployeeLeaveChangePage: (id) => {
      history.push(`/employment/employeeLeaveChanges/${id}/edit`);
    },
    openDeleteEmployeeLeaveChangeDialog: (id) => {
      history.push(`/employment/employeeLeaveChanges/${id}/delete`);
    },
    openDeleteEmployeeLeaveChangesDialog: () => {
      history.push(`/employment/employeeLeaveChanges/deleteEmployeeLeaveChanges`);
    },
    openFetchEmployeeLeaveChangesDialog: () => {
      history.push(`/employment/employeeLeaveChanges/fetch`);
    },
    openUpdateEmployeeLeaveChangesStatusDialog: () => {
      history.push("/employment/employeeLeaveChanges/updateStatus");
    },
  };
  
  return (
    <EmployeeLeaveChangesUIProvider employeeLeaveChangesUIEvents={employeeLeaveChangesUIEvents}>
      <EmployeeLeaveChangesLoadingDialog />
      <Route path="/employment/employeeLeaveChanges/:id/delete">
        {({ history, match }) => (
          <EmployeeLeaveChangeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeLeaveChanges");
            }}
          />
        )}
      </Route>
      <EmployeeLeaveChangesCard />
    </EmployeeLeaveChangesUIProvider>
  );
}