import React from "react";
import { Route } from "react-router-dom";
import { EmployeeSoldiershipsLoadingDialog } from "./employeeSoldierships-loading-dialog/EmployeeSoldiershipsLoadingDialog";
import { EmployeeSoldiershipDeleteDialog } from "./employeeSoldiership-delete-dialog/EmployeeSoldiershipDeleteDialog";
import { EmployeeSoldiershipsCard } from "./EmployeeSoldiershipsCard";
import { EmployeeSoldiershipsUIProvider } from "./EmployeeSoldiershipsUIContext";

export function EmployeeSoldiershipsPage({ history }) {
  const employeeSoldiershipsUIEvents = {
    newEmployeeSoldiershipButtonClick: () => {
      history.push("/employment/employeeSoldierships/new");
    },
    openEditEmployeeSoldiershipPage: (id) => {
      history.push(`/employment/employeeSoldierships/${id}/edit`);
    },
    openDeleteEmployeeSoldiershipDialog: (id) => {
      history.push(`/employment/employeeSoldierships/${id}/delete`);
    },
    openDeleteEmployeeSoldiershipsDialog: () => {
      history.push(`/employment/employeeSoldierships/deleteEmployeeSoldierships`);
    },
    openFetchEmployeeSoldiershipsDialog: () => {
      history.push(`/employment/employeeSoldierships/fetch`);
    },
    openUpdateEmployeeSoldiershipsStatusDialog: () => {
      history.push("/employment/employeeSoldierships/updateStatus");
    },
  };
  
  return (
    <EmployeeSoldiershipsUIProvider employeeSoldiershipsUIEvents={employeeSoldiershipsUIEvents}>
      <EmployeeSoldiershipsLoadingDialog />
      <Route path="/employment/employeeSoldierships/:id/delete">
        {({ history, match }) => (
          <EmployeeSoldiershipDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeSoldierships");
            }}
          />
        )}
      </Route>
      <EmployeeSoldiershipsCard />
    </EmployeeSoldiershipsUIProvider>
  );
}