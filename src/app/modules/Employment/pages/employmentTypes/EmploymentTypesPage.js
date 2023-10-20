import React from "react";
import { Route } from "react-router-dom";
import { EmploymentTypesLoadingDialog } from "./employmentTypes-loading-dialog/EmploymentTypesLoadingDialog";
import { EmploymentTypeDeleteDialog } from "./employmentType-delete-dialog/EmploymentTypeDeleteDialog";
import { EmploymentTypesCard } from "./EmploymentTypesCard";
import { EmploymentTypesUIProvider } from "./EmploymentTypesUIContext";

export function EmploymentTypesPage({ history }) {
  const employmentTypesUIEvents = {
    newEmploymentTypeButtonClick: () => {
      history.push("/employment/employmentTypes/new");
    },
    openEditEmploymentTypePage: (id) => {
      history.push(`/employment/employmentTypes/${id}/edit`);
    },
    openDeleteEmploymentTypeDialog: (id) => {
      history.push(`/employment/employmentTypes/${id}/delete`);
    },
    openDeleteEmploymentTypesDialog: () => {
      history.push(`/employment/employmentTypes/deleteEmploymentTypes`);
    },
    openFetchEmploymentTypesDialog: () => {
      history.push(`/employment/employmentTypes/fetch`);
    },
    openUpdateEmploymentTypesStatusDialog: () => {
      history.push("/employment/employmentTypes/updateStatus");
    },
  };
  
  return (
    <EmploymentTypesUIProvider employmentTypesUIEvents={employmentTypesUIEvents}>
      <EmploymentTypesLoadingDialog />
      <Route path="/employment/employmentTypes/:id/delete">
        {({ history, match }) => (
          <EmploymentTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employmentTypes");
            }}
          />
        )}
      </Route>
      <EmploymentTypesCard />
    </EmploymentTypesUIProvider>
  );
}