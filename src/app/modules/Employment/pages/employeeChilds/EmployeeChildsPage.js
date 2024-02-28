import React from "react";
import { Route } from "react-router-dom";
import { EmployeeChildsLoadingDialog } from "./employeeChilds-loading-dialog/EmployeeChildsLoadingDialog";
import { EmployeeChildDeleteDialog } from "./employeeChild-delete-dialog/EmployeeChildDeleteDialog";
import { EmployeeChildsCard } from "./EmployeeChildsCard";
import { EmployeeChildsUIProvider } from "./EmployeeChildsUIContext";

export function EmployeeChildsPage({ history }) {
  const employeeChildsUIEvents = {
    newEmployeeChildButtonClick: () => {
      history.push("/employment/employeeChilds/new");
    },
    openEditEmployeeChildPage: (id) => {
      history.push(`/employment/employeeChilds/${id}/edit`);
    },
    openDeleteEmployeeChildDialog: (id) => {
      history.push(`/employment/employeeChilds/${id}/delete`);
    },
    openDeleteEmployeeChildsDialog: () => {
      history.push(`/employment/employeeChilds/deleteEmployeeChilds`);
    },
    openFetchEmployeeChildsDialog: () => {
      history.push(`/employment/employeeChilds/fetch`);
    },
    openUpdateEmployeeChildsStatusDialog: () => {
      history.push("/employment/employeeChilds/updateStatus");
    },
  };

  return (
    <EmployeeChildsUIProvider employeeChildsUIEvents={employeeChildsUIEvents}>
      <EmployeeChildsLoadingDialog />
      <Route path="/employment/employeeChilds/:id/delete">
        {({ history, match }) => (
          <EmployeeChildDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeChilds");
            }}
          />
        )}
      </Route>
      <EmployeeChildsCard />
    </EmployeeChildsUIProvider>
  );
}
