import React from "react";
import { Route } from "react-router-dom";
import { EmployeeInsurancesLoadingDialog } from "./employeeInsurances-loading-dialog/EmployeeInsurancesLoadingDialog";
import { EmployeeInsuranceDeleteDialog } from "./employeeInsurance-delete-dialog/EmployeeInsuranceDeleteDialog";
import { EmployeeInsurancesCard } from "./EmployeeInsurancesCard";
import { EmployeeInsurancesUIProvider } from "./EmployeeInsurancesUIContext";

export function EmployeeInsurancesPage({ history }) {
  const employeeInsurancesUIEvents = {
    newEmployeeInsuranceButtonClick: () => {
      history.push("/employment/employeeInsurances/new");
    },
    openEditEmployeeInsurancePage: (id) => {
      history.push(`/employment/employeeInsurances/${id}/edit`);
    },
    openDeleteEmployeeInsuranceDialog: (id) => {
      history.push(`/employment/employeeInsurances/${id}/delete`);
    },
    openDeleteEmployeeInsurancesDialog: () => {
      history.push(`/employment/employeeInsurances/deleteEmployeeInsurances`);
    },
    openFetchEmployeeInsurancesDialog: () => {
      history.push(`/employment/employeeInsurances/fetch`);
    },
    openUpdateEmployeeInsurancesStatusDialog: () => {
      history.push("/employment/employeeInsurances/updateStatus");
    },
  };
  
  return (
    <EmployeeInsurancesUIProvider employeeInsurancesUIEvents={employeeInsurancesUIEvents}>
      <EmployeeInsurancesLoadingDialog />
      <Route path="/employment/employeeInsurances/:id/delete">
        {({ history, match }) => (
          <EmployeeInsuranceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeInsurances");
            }}
          />
        )}
      </Route>
      <EmployeeInsurancesCard />
    </EmployeeInsurancesUIProvider>
  );
}