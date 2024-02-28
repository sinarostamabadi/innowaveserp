import React from "react";
import { Route } from "react-router-dom";
import { PlaceOfPreparationsLoadingDialog } from "./placeOfPreparations-loading-dialog/PlaceOfPreparationsLoadingDialog";
import { PlaceOfPreparationDeleteDialog } from "./placeOfPreparation-delete-dialog/PlaceOfPreparationDeleteDialog";
import { PlaceOfPreparationsCard } from "./PlaceOfPreparationsCard";
import { PlaceOfPreparationsUIProvider } from "./PlaceOfPreparationsUIContext";

export function PlaceOfPreparationsPage({ history }) {
  const placeOfPreparationsUIEvents = {
    newPlaceOfPreparationButtonClick: () => {
      history.push("//placeOfPreparations/new");
    },
    openEditPlaceOfPreparationPage: (id) => {
      history.push(`//placeOfPreparations/${id}/edit`);
    },
    openDeletePlaceOfPreparationDialog: (id) => {
      history.push(`//placeOfPreparations/${id}/delete`);
    },
    openDeletePlaceOfPreparationsDialog: () => {
      history.push(`//placeOfPreparations/deletePlaceOfPreparations`);
    },
    openFetchPlaceOfPreparationsDialog: () => {
      history.push(`//placeOfPreparations/fetch`);
    },
    openUpdatePlaceOfPreparationsStatusDialog: () => {
      history.push("//placeOfPreparations/updateStatus");
    },
  };

  return (
    <PlaceOfPreparationsUIProvider
      placeOfPreparationsUIEvents={placeOfPreparationsUIEvents}
    >
      <PlaceOfPreparationsLoadingDialog />
      <Route path="//placeOfPreparations/:id/delete">
        {({ history, match }) => (
          <PlaceOfPreparationDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("//placeOfPreparations");
            }}
          />
        )}
      </Route>
      <PlaceOfPreparationsCard />
    </PlaceOfPreparationsUIProvider>
  );
}
