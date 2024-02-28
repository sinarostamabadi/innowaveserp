import React from "react";
import { Route } from "react-router-dom";
import { EmployeePhysicalConditionsLoadingDialog } from "./employeePhysicalConditions-loading-dialog/EmployeePhysicalConditionsLoadingDialog";
import { EmployeePhysicalConditionDeleteDialog } from "./employeePhysicalCondition-delete-dialog/EmployeePhysicalConditionDeleteDialog";
import { EmployeePhysicalConditionsCard } from "./EmployeePhysicalConditionsCard";
import { EmployeePhysicalConditionsUIProvider } from "./EmployeePhysicalConditionsUIContext";

export function EmployeePhysicalConditionsPage({ history }) {
  const employeePhysicalConditionsUIEvents = {
    newEmployeePhysicalConditionButtonClick: () => {
      history.push("/employment/employeePhysicalConditions/new");
    },
    openEditEmployeePhysicalConditionPage: (id) => {
      history.push(`/employment/employeePhysicalConditions/${id}/edit`);
    },
    openDeleteEmployeePhysicalConditionDialog: (id) => {
      history.push(`/employment/employeePhysicalConditions/${id}/delete`);
    },
    openDeleteEmployeePhysicalConditionsDialog: () => {
      history.push(
        `/employment/employeePhysicalConditions/deleteEmployeePhysicalConditions`
      );
    },
    openFetchEmployeePhysicalConditionsDialog: () => {
      history.push(`/employment/employeePhysicalConditions/fetch`);
    },
    openUpdateEmployeePhysicalConditionsStatusDialog: () => {
      history.push("/employment/employeePhysicalConditions/updateStatus");
    },
  };

  return (
    <EmployeePhysicalConditionsUIProvider
      employeePhysicalConditionsUIEvents={employeePhysicalConditionsUIEvents}
    >
      <EmployeePhysicalConditionsLoadingDialog />
      <Route path="/employment/employeePhysicalConditions/:id/delete">
        {({ history, match }) => (
          <EmployeePhysicalConditionDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeePhysicalConditions");
            }}
          />
        )}
      </Route>
      <EmployeePhysicalConditionsCard />
    </EmployeePhysicalConditionsUIProvider>
  );
}
