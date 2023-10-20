import React from "react";
import { Route } from "react-router-dom";
import { EducationsLoadingDialog } from "./educations-loading-dialog/EducationsLoadingDialog";
import { EducationDeleteDialog } from "./education-delete-dialog/EducationDeleteDialog";
import { EducationsCard } from "./EducationsCard";
import { EducationsUIProvider } from "./EducationsUIContext";

export function EducationsPage({ history }) {
  const educationsUIEvents = {
    newEducationButtonClick: () => {
      history.push("/general/educations/new");
    },
    openEditEducationPage: (id) => {
      history.push(`/general/educations/${id}/edit`);
    },
    openDeleteEducationDialog: (id) => {
      history.push(`/general/educations/${id}/delete`);
    },
    openDeleteEducationsDialog: () => {
      history.push(`/general/educations/deleteEducations`);
    },
    openFetchEducationsDialog: () => {
      history.push(`/general/educations/fetch`);
    },
    openUpdateEducationsStatusDialog: () => {
      history.push("/general/educations/updateStatus");
    },
  };
  
  return (
    <EducationsUIProvider educationsUIEvents={educationsUIEvents}>
      <EducationsLoadingDialog />
      <Route path="/general/educations/:id/delete">
        {({ history, match }) => (
          <EducationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/educations");
            }}
          />
        )}
      </Route>
      <EducationsCard />
    </EducationsUIProvider>
  );
}