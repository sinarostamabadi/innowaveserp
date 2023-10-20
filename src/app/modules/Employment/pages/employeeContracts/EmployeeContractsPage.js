import React from "react";
import { Route } from "react-router-dom";
import { EmployeeContractsLoadingDialog } from "./employeeContracts-loading-dialog/EmployeeContractsLoadingDialog";
import { EmployeeContractDeleteDialog } from "./employeeContract-delete-dialog/EmployeeContractDeleteDialog";
import { EmployeeContractsCard } from "./EmployeeContractsCard";
import { EmployeeContractsUIProvider } from "./EmployeeContractsUIContext";

export function EmployeeContractsPage({ history }) {
  const employeeContractsUIEvents = {
    newEmployeeContractButtonClick: () => {
      history.push("/employment/employeeContracts/new");
    },
    openEditEmployeeContractPage: (id) => {
      history.push(`/employment/employeeContracts/${id}/edit`);
    },
    openDeleteEmployeeContractDialog: (id) => {
      history.push(`/employment/employeeContracts/${id}/delete`);
    },
    openDeleteEmployeeContractsDialog: () => {
      history.push(`/employment/employeeContracts/deleteEmployeeContracts`);
    },
    openFetchEmployeeContractsDialog: () => {
      history.push(`/employment/employeeContracts/fetch`);
    },
    openUpdateEmployeeContractsStatusDialog: () => {
      history.push("/employment/employeeContracts/updateStatus");
    },
  };
  
  return (
    <EmployeeContractsUIProvider employeeContractsUIEvents={employeeContractsUIEvents}>
      <EmployeeContractsLoadingDialog />
      <Route path="/employment/employeeContracts/:id/delete">
        {({ history, match }) => (
          <EmployeeContractDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeContracts");
            }}
          />
        )}
      </Route>
      <EmployeeContractsCard />
    </EmployeeContractsUIProvider>
  );
}