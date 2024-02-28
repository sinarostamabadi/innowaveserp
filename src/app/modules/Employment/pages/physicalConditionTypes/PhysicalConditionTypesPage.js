import React from "react";
import { Route } from "react-router-dom";
import { PhysicalConditionTypesLoadingDialog } from "./physicalConditionTypes-loading-dialog/PhysicalConditionTypesLoadingDialog";
import { PhysicalConditionTypeDeleteDialog } from "./physicalConditionType-delete-dialog/PhysicalConditionTypeDeleteDialog";
import { PhysicalConditionTypesCard } from "./PhysicalConditionTypesCard";
import { PhysicalConditionTypesUIProvider } from "./PhysicalConditionTypesUIContext";

export function PhysicalConditionTypesPage({ history }) {
  const physicalConditionTypesUIEvents = {
    newPhysicalConditionTypeButtonClick: () => {
      history.push("/employment/physicalConditionTypes/new");
    },
    openEditPhysicalConditionTypePage: (id) => {
      history.push(`/employment/physicalConditionTypes/${id}/edit`);
    },
    openDeletePhysicalConditionTypeDialog: (id) => {
      history.push(`/employment/physicalConditionTypes/${id}/delete`);
    },
    openDeletePhysicalConditionTypesDialog: () => {
      history.push(
        `/employment/physicalConditionTypes/deletePhysicalConditionTypes`
      );
    },
    openFetchPhysicalConditionTypesDialog: () => {
      history.push(`/employment/physicalConditionTypes/fetch`);
    },
    openUpdatePhysicalConditionTypesStatusDialog: () => {
      history.push("/employment/physicalConditionTypes/updateStatus");
    },
  };

  return (
    <PhysicalConditionTypesUIProvider
      physicalConditionTypesUIEvents={physicalConditionTypesUIEvents}
    >
      <PhysicalConditionTypesLoadingDialog />
      <Route path="/employment/physicalConditionTypes/:id/delete">
        {({ history, match }) => (
          <PhysicalConditionTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/physicalConditionTypes");
            }}
          />
        )}
      </Route>
      <PhysicalConditionTypesCard />
    </PhysicalConditionTypesUIProvider>
  );
}
