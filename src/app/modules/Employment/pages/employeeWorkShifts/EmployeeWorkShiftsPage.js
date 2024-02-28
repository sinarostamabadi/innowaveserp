import React from "react";
import { Route } from "react-router-dom";
import { EmployeeWorkShiftsLoadingDialog } from "./employeeWorkShifts-loading-dialog/EmployeeWorkShiftsLoadingDialog";
import { EmployeeWorkShiftDeleteDialog } from "./employeeWorkShift-delete-dialog/EmployeeWorkShiftDeleteDialog";
import { EmployeeWorkShiftsCard } from "./EmployeeWorkShiftsCard";
import { EmployeeWorkShiftsUIProvider } from "./EmployeeWorkShiftsUIContext";

export function EmployeeWorkShiftsPage({ history }) {
  const employeeWorkShiftsUIEvents = {
    newEmployeeWorkShiftButtonClick: () => {
      history.push("/employment/employeeWorkShifts/new");
    },
    openEditEmployeeWorkShiftPage: (id) => {
      history.push(`/employment/employeeWorkShifts/${id}/edit`);
    },
    openDeleteEmployeeWorkShiftDialog: (id) => {
      history.push(`/employment/employeeWorkShifts/${id}/delete`);
    },
    openDeleteEmployeeWorkShiftsDialog: () => {
      history.push(`/employment/employeeWorkShifts/deleteEmployeeWorkShifts`);
    },
    openFetchEmployeeWorkShiftsDialog: () => {
      history.push(`/employment/employeeWorkShifts/fetch`);
    },
    openUpdateEmployeeWorkShiftsStatusDialog: () => {
      history.push("/employment/employeeWorkShifts/updateStatus");
    },
  };

  return (
    <EmployeeWorkShiftsUIProvider
      employeeWorkShiftsUIEvents={employeeWorkShiftsUIEvents}
    >
      <EmployeeWorkShiftsLoadingDialog />
      <Route path="/employment/employeeWorkShifts/:id/delete">
        {({ history, match }) => (
          <EmployeeWorkShiftDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeWorkShifts");
            }}
          />
        )}
      </Route>
      <EmployeeWorkShiftsCard />
    </EmployeeWorkShiftsUIProvider>
  );
}
