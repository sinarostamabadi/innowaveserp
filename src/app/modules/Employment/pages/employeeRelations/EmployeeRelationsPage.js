import React from "react";
import { Route } from "react-router-dom";
import { EmployeeRelationsLoadingDialog } from "./employeeRelations-loading-dialog/EmployeeRelationsLoadingDialog";
import { EmployeeRelationDeleteDialog } from "./employeeRelation-delete-dialog/EmployeeRelationDeleteDialog";
import { EmployeeRelationsCard } from "./EmployeeRelationsCard";
import { EmployeeRelationsUIProvider } from "./EmployeeRelationsUIContext";

export function EmployeeRelationsPage({ history }) {
  const employeeRelationsUIEvents = {
    newEmployeeRelationButtonClick: () => {
      history.push("/employment/employeeRelations/new");
    },
    openEditEmployeeRelationPage: (id) => {
      history.push(`/employment/employeeRelations/${id}/edit`);
    },
    openDeleteEmployeeRelationDialog: (id) => {
      history.push(`/employment/employeeRelations/${id}/delete`);
    },
    openDeleteEmployeeRelationsDialog: () => {
      history.push(`/employment/employeeRelations/deleteEmployeeRelations`);
    },
    openFetchEmployeeRelationsDialog: () => {
      history.push(`/employment/employeeRelations/fetch`);
    },
    openUpdateEmployeeRelationsStatusDialog: () => {
      history.push("/employment/employeeRelations/updateStatus");
    },
  };
  
  return (
    <EmployeeRelationsUIProvider employeeRelationsUIEvents={employeeRelationsUIEvents}>
      <EmployeeRelationsLoadingDialog />
      <Route path="/employment/employeeRelations/:id/delete">
        {({ history, match }) => (
          <EmployeeRelationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeRelations");
            }}
          />
        )}
      </Route>
      <EmployeeRelationsCard />
    </EmployeeRelationsUIProvider>
  );
}