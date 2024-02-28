import React from "react";
import { Route } from "react-router-dom";
import { MarridationTypesLoadingDialog } from "./marridationTypes-loading-dialog/MarridationTypesLoadingDialog";
import { MarridationTypeDeleteDialog } from "./marridationType-delete-dialog/MarridationTypeDeleteDialog";
import { MarridationTypesCard } from "./MarridationTypesCard";
import { MarridationTypesUIProvider } from "./MarridationTypesUIContext";

export function MarridationTypesPage({ history }) {
  const marridationTypesUIEvents = {
    newMarridationTypeButtonClick: () => {
      history.push("/employment/marridationTypes/new");
    },
    openEditMarridationTypePage: (id) => {
      history.push(`/employment/marridationTypes/${id}/edit`);
    },
    openDeleteMarridationTypeDialog: (id) => {
      history.push(`/employment/marridationTypes/${id}/delete`);
    },
    openDeleteMarridationTypesDialog: () => {
      history.push(`/employment/marridationTypes/deleteMarridationTypes`);
    },
    openFetchMarridationTypesDialog: () => {
      history.push(`/employment/marridationTypes/fetch`);
    },
    openUpdateMarridationTypesStatusDialog: () => {
      history.push("/employment/marridationTypes/updateStatus");
    },
  };

  return (
    <MarridationTypesUIProvider
      marridationTypesUIEvents={marridationTypesUIEvents}
    >
      <MarridationTypesLoadingDialog />
      <Route path="/employment/marridationTypes/:id/delete">
        {({ history, match }) => (
          <MarridationTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/employment/marridationTypes");
            }}
          />
        )}
      </Route>
      <MarridationTypesCard />
    </MarridationTypesUIProvider>
  );
}
