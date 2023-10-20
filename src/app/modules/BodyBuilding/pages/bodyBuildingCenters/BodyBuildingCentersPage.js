import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingCentersLoadingDialog } from "./bodyBuildingCenters-loading-dialog/BodyBuildingCentersLoadingDialog";
import { BodyBuildingCenterDeleteDialog } from "./bodyBuildingCenter-delete-dialog/BodyBuildingCenterDeleteDialog";
import { BodyBuildingCentersCard } from "./BodyBuildingCentersCard";
import { BodyBuildingCentersUIProvider } from "./BodyBuildingCentersUIContext";

export function BodyBuildingCentersPage({ history }) {
  const bodyBuildingCentersUIEvents = {
    newBodyBuildingCenterButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingCenters/new");
    },
    openEditBodyBuildingCenterPage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingCenters/${id}/edit`);
    },
    openDeleteBodyBuildingCenterDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingCenters/${id}/delete`);
    },
    openDeleteBodyBuildingCentersDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingCenters/deleteBodyBuildingCenters`);
    },
    openFetchBodyBuildingCentersDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingCenters/fetch`);
    },
    openUpdateBodyBuildingCentersStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingCenters/updateStatus");
    },
  };
  
  return (
    <BodyBuildingCentersUIProvider bodyBuildingCentersUIEvents={bodyBuildingCentersUIEvents}>
      <BodyBuildingCentersLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingCenters/:id/delete">
        {({ history, match }) => (
          <BodyBuildingCenterDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingCenters");
            }}
          />
        )}
      </Route>
      <BodyBuildingCentersCard />
    </BodyBuildingCentersUIProvider>
  );
}