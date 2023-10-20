import React from "react";
import { Route } from "react-router-dom";
import { FutsalReserveTypesLoadingDialog } from "./futsalReserveTypes-loading-dialog/FutsalReserveTypesLoadingDialog";
import { FutsalReserveTypeDeleteDialog } from "./futsalReserveType-delete-dialog/FutsalReserveTypeDeleteDialog";
import { FutsalReserveTypesCard } from "./FutsalReserveTypesCard";
import { FutsalReserveTypesUIProvider } from "./FutsalReserveTypesUIContext";

export function FutsalReserveTypesPage({ history }) {
  const futsalReserveTypesUIEvents = {
    newFutsalReserveTypeButtonClick: () => {
      history.push("/futsal/futsalReserveTypes/new");
    },
    openEditFutsalReserveTypePage: (id) => {
      history.push(`/futsal/futsalReserveTypes/${id}/edit`);
    },
    openDeleteFutsalReserveTypeDialog: (id) => {
      history.push(`/futsal/futsalReserveTypes/${id}/delete`);
    },
    openDeleteFutsalReserveTypesDialog: () => {
      history.push(`/futsal/futsalReserveTypes/deleteFutsalReserveTypes`);
    },
    openFetchFutsalReserveTypesDialog: () => {
      history.push(`/futsal/futsalReserveTypes/fetch`);
    },
    openUpdateFutsalReserveTypesStatusDialog: () => {
      history.push("/futsal/futsalReserveTypes/updateStatus");
    },
  };
  
  return (
    <FutsalReserveTypesUIProvider futsalReserveTypesUIEvents={futsalReserveTypesUIEvents}>
      <FutsalReserveTypesLoadingDialog />
      <Route path="/futsal/futsalReserveTypes/:id/delete">
        {({ history, match }) => (
          <FutsalReserveTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalReserveTypes");
            }}
          />
        )}
      </Route>
      <FutsalReserveTypesCard />
    </FutsalReserveTypesUIProvider>
  );
}