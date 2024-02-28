import React from "react";
import { Route } from "react-router-dom";
import { TechnicalTypesLoadingDialog } from "./technicalTypes-loading-dialog/TechnicalTypesLoadingDialog";
import { TechnicalTypeDeleteDialog } from "./technicalType-delete-dialog/TechnicalTypeDeleteDialog";
import { TechnicalTypesCard } from "./TechnicalTypesCard";
import { TechnicalTypesUIProvider } from "./TechnicalTypesUIContext";

export function TechnicalTypesPage({ history }) {
  const technicalTypesUIEvents = {
    newTechnicalTypeButtonClick: () => {
      history.push("/employment/technicalTypes/new");
    },
    openEditTechnicalTypePage: (id) => {
      history.push(`/employment/technicalTypes/${id}/edit`);
    },
    openDeleteTechnicalTypeDialog: (id) => {
      history.push(`/employment/technicalTypes/${id}/delete`);
    },
    openDeleteTechnicalTypesDialog: () => {
      history.push(`/employment/technicalTypes/deleteTechnicalTypes`);
    },
    openFetchTechnicalTypesDialog: () => {
      history.push(`/employment/technicalTypes/fetch`);
    },
    openUpdateTechnicalTypesStatusDialog: () => {
      history.push("/employment/technicalTypes/updateStatus");
    },
  };

  return (
    <TechnicalTypesUIProvider technicalTypesUIEvents={technicalTypesUIEvents}>
      <TechnicalTypesLoadingDialog />
      <Route path="/employment/technicalTypes/:id/delete">
        {({ history, match }) => (
          <TechnicalTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/technicalTypes");
            }}
          />
        )}
      </Route>
      <TechnicalTypesCard />
    </TechnicalTypesUIProvider>
  );
}
