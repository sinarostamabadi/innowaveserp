import React from "react";
import { Route } from "react-router-dom";
import { EmploymentStatusesLoadingDialog } from "./employmentStatuses-loading-dialog/EmploymentStatusesLoadingDialog";
import { EmploymentStatusDeleteDialog } from "./employmentStatus-delete-dialog/EmploymentStatusDeleteDialog";
import { EmploymentStatusesCard } from "./EmploymentStatusesCard";
import { EmploymentStatusesUIProvider } from "./EmploymentStatusesUIContext";

export function EmploymentStatusesPage({ history }) {
  const employmentStatusesUIEvents = {
    newEmploymentStatusButtonClick: () => {
      history.push("/employment/employmentStatuses/new");
    },
    openEditEmploymentStatusPage: (id) => {
      history.push(`/employment/employmentStatuses/${id}/edit`);
    },
    openDeleteEmploymentStatusDialog: (id) => {
      history.push(`/employment/employmentStatuses/${id}/delete`);
    },
    openDeleteEmploymentStatusesDialog: () => {
      history.push(`/employment/employmentStatuses/deleteEmploymentStatuses`);
    },
    openFetchEmploymentStatusesDialog: () => {
      history.push(`/employment/employmentStatuses/fetch`);
    },
    openUpdateEmploymentStatusesStatusDialog: () => {
      history.push("/employment/employmentStatuses/updateStatus");
    },
  };

  return (
    <EmploymentStatusesUIProvider
      employmentStatusesUIEvents={employmentStatusesUIEvents}
    >
      <EmploymentStatusesLoadingDialog />
      <Route path="/employment/employmentStatuses/:id/delete">
        {({ history, match }) => (
          <EmploymentStatusDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/employmentStatuses");
            }}
          />
        )}
      </Route>
      <EmploymentStatusesCard />
    </EmploymentStatusesUIProvider>
  );
}
