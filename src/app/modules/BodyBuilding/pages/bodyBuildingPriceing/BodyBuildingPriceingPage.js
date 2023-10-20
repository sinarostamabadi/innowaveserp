import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingPriceingLoadingDialog } from "./bodyBuildingPriceing-loading-dialog/BodyBuildingPriceingLoadingDialog";
import { BodyBuildingPriceingDeleteDialog } from "./bodyBuildingPriceing-delete-dialog/BodyBuildingPriceingDeleteDialog";
import { BodyBuildingPriceingCard } from "./BodyBuildingPriceingCard";
import { BodyBuildingPriceingUIProvider } from "./BodyBuildingPriceingUIContext";

export function BodyBuildingPriceingPage({ history }) {
  const bodyBuildingPriceingUIEvents = {
    newBodyBuildingPriceingButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingPriceing/new");
    },
    openEditBodyBuildingPriceingPage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingPriceing/${id}/edit`);
    },
    openDeleteBodyBuildingPriceingDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingPriceing/${id}/delete`);
    },
    openDeleteBodyBuildingPriceingDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingPriceing/deleteBodyBuildingPriceing`);
    },
    openFetchBodyBuildingPriceingDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingPriceing/fetch`);
    },
    openUpdateBodyBuildingPriceingStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingPriceing/updateStatus");
    },
  };
  
  return (
    <BodyBuildingPriceingUIProvider bodyBuildingPriceingUIEvents={bodyBuildingPriceingUIEvents}>
      <BodyBuildingPriceingLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingPriceing/:id/delete">
        {({ history, match }) => (
          <BodyBuildingPriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingPriceing");
            }}
          />
        )}
      </Route>
      <BodyBuildingPriceingCard />
    </BodyBuildingPriceingUIProvider>
  );
}