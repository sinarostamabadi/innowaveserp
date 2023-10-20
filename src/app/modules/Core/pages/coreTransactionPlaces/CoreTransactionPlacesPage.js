import React from "react";
import { Route } from "react-router-dom";
import { CoreTransactionPlacesLoadingDialog } from "./coreTransactionPlaces-loading-dialog/CoreTransactionPlacesLoadingDialog";
import { CoreTransactionPlaceDeleteDialog } from "./coreTransactionPlace-delete-dialog/CoreTransactionPlaceDeleteDialog";
import { CoreTransactionPlacesCard } from "./CoreTransactionPlacesCard";
import { CoreTransactionPlacesUIProvider } from "./CoreTransactionPlacesUIContext";
export function CoreTransactionPlacesPage({ history }) {
  const coreTransactionPlacesUIEvents = {
    newCoreTransactionPlaceButtonClick: () => {
      history.push("/Core/coreTransactionPlaces/new");
    },
    openEditCoreTransactionPlacePage: (id) => {
      history.push(`/Core/coreTransactionPlaces/${id}/edit`);
    },
    openDeleteCoreTransactionPlaceDialog: (id) => {
      history.push(`/Core/coreTransactionPlaces/${id}/delete`);
    },
    openDeleteCoreTransactionPlacesDialog: () => {
      history.push(`/Core/coreTransactionPlaces/deleteCoreTransactionPlaces`);
    },
    openFetchCoreTransactionPlacesDialog: () => {
      history.push(`/Core/coreTransactionPlaces/fetch`);
    },
    openUpdateCoreTransactionPlacesStatusDialog: () => {
      history.push("/Core/coreTransactionPlaces/updateStatus");
    },
  };
  return (
    <CoreTransactionPlacesUIProvider coreTransactionPlacesUIEvents={coreTransactionPlacesUIEvents}>
      <CoreTransactionPlacesLoadingDialog />
      <Route path="/Core/coreTransactionPlaces/:id/delete">
        {({ history, match }) => (
          <CoreTransactionPlaceDeleteDialog  
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/Core/coreTransactionPlaces");
            }}
          />
        )}
      </Route>
      <CoreTransactionPlacesCard />
    </CoreTransactionPlacesUIProvider>
  );
}
