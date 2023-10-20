import React from "react";
import { Route } from "react-router-dom";
import { EmployeesLoadingDialog } from "./employees-loading-dialog/EmployeesLoadingDialog";
import { EmployeeDeleteDialog } from "./employee-delete-dialog/EmployeeDeleteDialog";
import { EmployeesCard } from "./EmployeesCard";
import { EmployeesUIProvider } from "./EmployeesUIContext";

export function EmployeesPage({ history }) {
  const employeesUIEvents = {
    newEmployeeButtonClick: () => {
      history.push("/employment/employees/new");
    },
    openEditEmployeePage: (id) => {
      history.push(`/employment/employees/${id}/edit`);
    },
    openDeleteEmployeeDialog: (id) => {
      history.push(`/employment/employees/${id}/delete`);
    },
    openDeleteEmployeesDialog: () => {
      history.push(`/employment/employees/deleteEmployees`);
    },
    openFetchEmployeesDialog: () => {
      history.push(`/employment/employees/fetch`);
    },
    openUpdateEmployeesStatusDialog: () => {
      history.push("/employment/employees/updateStatus");
    },
  };
  
  return (
    <EmployeesUIProvider employeesUIEvents={employeesUIEvents}>
      <EmployeesLoadingDialog />
      <Route path="/employment/employees/:id/delete">
        {({ history, match }) => (
          <EmployeeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employees");
            }}
          />
        )}
      </Route>
      <EmployeesCard />
    </EmployeesUIProvider>
  );
}