import React from "react";
import { Route } from "react-router-dom";
import { EmployeeWorkExperiencesLoadingDialog } from "./employeeWorkExperiences-loading-dialog/EmployeeWorkExperiencesLoadingDialog";
import { EmployeeWorkExperienceDeleteDialog } from "./employeeWorkExperience-delete-dialog/EmployeeWorkExperienceDeleteDialog";
import { EmployeeWorkExperiencesCard } from "./EmployeeWorkExperiencesCard";
import { EmployeeWorkExperiencesUIProvider } from "./EmployeeWorkExperiencesUIContext";

export function EmployeeWorkExperiencesPage({ history }) {
  const employeeWorkExperiencesUIEvents = {
    newEmployeeWorkExperienceButtonClick: () => {
      history.push("/employment/employeeWorkExperiences/new");
    },
    openEditEmployeeWorkExperiencePage: (id) => {
      history.push(`/employment/employeeWorkExperiences/${id}/edit`);
    },
    openDeleteEmployeeWorkExperienceDialog: (id) => {
      history.push(`/employment/employeeWorkExperiences/${id}/delete`);
    },
    openDeleteEmployeeWorkExperiencesDialog: () => {
      history.push(`/employment/employeeWorkExperiences/deleteEmployeeWorkExperiences`);
    },
    openFetchEmployeeWorkExperiencesDialog: () => {
      history.push(`/employment/employeeWorkExperiences/fetch`);
    },
    openUpdateEmployeeWorkExperiencesStatusDialog: () => {
      history.push("/employment/employeeWorkExperiences/updateStatus");
    },
  };
  
  return (
    <EmployeeWorkExperiencesUIProvider employeeWorkExperiencesUIEvents={employeeWorkExperiencesUIEvents}>
      <EmployeeWorkExperiencesLoadingDialog />
      <Route path="/employment/employeeWorkExperiences/:id/delete">
        {({ history, match }) => (
          <EmployeeWorkExperienceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employeeWorkExperiences");
            }}
          />
        )}
      </Route>
      <EmployeeWorkExperiencesCard />
    </EmployeeWorkExperiencesUIProvider>
  );
}