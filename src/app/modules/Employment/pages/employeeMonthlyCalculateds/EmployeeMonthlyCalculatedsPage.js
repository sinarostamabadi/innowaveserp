import React from "react";
import { Route } from "react-router-dom";
import { EmployeeMonthlyCalculatedsLoadingDialog } from "./employeeMonthlyCalculateds-loading-dialog/EmployeeMonthlyCalculatedsLoadingDialog";
import { EmployeeMonthlyCalculatedDeleteDialog } from "./employeeMonthlyCalculated-delete-dialog/EmployeeMonthlyCalculatedDeleteDialog";
import { EmployeeMonthlyCalculatedsCard } from "./EmployeeMonthlyCalculatedsCard";
import { EmployeeMonthlyCalculatedsUIProvider } from "./EmployeeMonthlyCalculatedsUIContext";

export function EmployeeMonthlyCalculatedsPage({ history }) {
  const employeeMonthlyCalculatedsUIEvents = {
    newEmployeeMonthlyCalculatedButtonClick: () => {
      history.push("/employment/employeeMonthlyCalculateds/new");
    },
    openEditEmployeeMonthlyCalculatedPage: (id) => {
      history.push(`/employment/employeeMonthlyCalculateds/${id}/edit`);
    },
    openDeleteEmployeeMonthlyCalculatedDialog: (id) => {
      history.push(`/employment/employeeMonthlyCalculateds/${id}/delete`);
    },
    openDeleteEmployeeMonthlyCalculatedsDialog: () => {
      history.push(`/employment/employeeMonthlyCalculateds/deleteEmployeeMonthlyCalculateds`);
    },
    openFetchEmployeeMonthlyCalculatedsDialog: () => {
      history.push(`/employment/employeeMonthlyCalculateds/fetch`);
    },
    openUpdateEmployeeMonthlyCalculatedsStatusDialog: () => {
      history.push("/employment/employeeMonthlyCalculateds/updateStatus");
    },
  };
  
  return (
    <EmployeeMonthlyCalculatedsUIProvider employeeMonthlyCalculatedsUIEvents={employeeMonthlyCalculatedsUIEvents}>
      <EmployeeMonthlyCalculatedsLoadingDialog />
      <Route path="/employment/employeeMonthlyCalculateds/:id/delete">
        {({ history, match }) => (
          <EmployeeMonthlyCalculatedDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeMonthlyCalculateds");
            }}
          />
        )}
      </Route>
      <EmployeeMonthlyCalculatedsCard />
    </EmployeeMonthlyCalculatedsUIProvider>
  );
}