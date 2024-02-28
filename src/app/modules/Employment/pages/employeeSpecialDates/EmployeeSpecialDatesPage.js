import React from "react";
import { Route } from "react-router-dom";
import { EmployeeSpecialDatesLoadingDialog } from "./employeeSpecialDates-loading-dialog/EmployeeSpecialDatesLoadingDialog";
import { EmployeeSpecialDateDeleteDialog } from "./employeeSpecialDate-delete-dialog/EmployeeSpecialDateDeleteDialog";
import { EmployeeSpecialDatesCard } from "./EmployeeSpecialDatesCard";
import { EmployeeSpecialDatesUIProvider } from "./EmployeeSpecialDatesUIContext";

export function EmployeeSpecialDatesPage({ history }) {
  const employeeSpecialDatesUIEvents = {
    newEmployeeSpecialDateButtonClick: () => {
      history.push("/employment/employeeSpecialDates/new");
    },
    openEditEmployeeSpecialDatePage: (id) => {
      history.push(`/employment/employeeSpecialDates/${id}/edit`);
    },
    openDeleteEmployeeSpecialDateDialog: (id) => {
      history.push(`/employment/employeeSpecialDates/${id}/delete`);
    },
    openDeleteEmployeeSpecialDatesDialog: () => {
      history.push(
        `/employment/employeeSpecialDates/deleteEmployeeSpecialDates`
      );
    },
    openFetchEmployeeSpecialDatesDialog: () => {
      history.push(`/employment/employeeSpecialDates/fetch`);
    },
    openUpdateEmployeeSpecialDatesStatusDialog: () => {
      history.push("/employment/employeeSpecialDates/updateStatus");
    },
  };

  return (
    <EmployeeSpecialDatesUIProvider
      employeeSpecialDatesUIEvents={employeeSpecialDatesUIEvents}
    >
      <EmployeeSpecialDatesLoadingDialog />
      <Route path="/employment/employeeSpecialDates/:id/delete">
        {({ history, match }) => (
          <EmployeeSpecialDateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeSpecialDates");
            }}
          />
        )}
      </Route>
      <EmployeeSpecialDatesCard />
    </EmployeeSpecialDatesUIProvider>
  );
}
