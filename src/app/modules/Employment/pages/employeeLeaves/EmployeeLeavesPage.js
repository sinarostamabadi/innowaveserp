import React from "react";
import { Route } from "react-router-dom";
import { EmployeeLeavesLoadingDialog } from "./employeeLeaves-loading-dialog/EmployeeLeavesLoadingDialog";
import { EmployeeLeaveDeleteDialog } from "./employeeLeave-delete-dialog/EmployeeLeaveDeleteDialog";
import { EmployeeLeavesCard } from "./EmployeeLeavesCard";
import { EmployeeLeavesUIProvider } from "./EmployeeLeavesUIContext";

export function EmployeeLeavesPage({ history }) {
  const employeeLeavesUIEvents = {
    newEmployeeLeaveButtonClick: () => {
      history.push("/employment/employeeLeaves/new");
    },
    openEditEmployeeLeavePage: (id) => {
      history.push(`/employment/employeeLeaves/${id}/edit`);
    },
    openDeleteEmployeeLeaveDialog: (id) => {
      history.push(`/employment/employeeLeaves/${id}/delete`);
    },
    openDeleteEmployeeLeavesDialog: () => {
      history.push(`/employment/employeeLeaves/deleteEmployeeLeaves`);
    },
    openFetchEmployeeLeavesDialog: () => {
      history.push(`/employment/employeeLeaves/fetch`);
    },
    openUpdateEmployeeLeavesStatusDialog: () => {
      history.push("/employment/employeeLeaves/updateStatus");
    },
  };
  
  return (
    <EmployeeLeavesUIProvider employeeLeavesUIEvents={employeeLeavesUIEvents}>
      <EmployeeLeavesLoadingDialog />
      <Route path="/employment/employeeLeaves/:id/delete">
        {({ history, match }) => (
          <EmployeeLeaveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeLeaves");
            }}
          />
        )}
      </Route>
      <EmployeeLeavesCard />
    </EmployeeLeavesUIProvider>
  );
}