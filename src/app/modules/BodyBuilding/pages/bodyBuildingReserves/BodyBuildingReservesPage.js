import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingReservesLoadingDialog } from "./bodyBuildingReserves-loading-dialog/BodyBuildingReservesLoadingDialog";
import { BodyBuildingReserveDeleteDialog } from "./bodyBuildingReserve-delete-dialog/BodyBuildingReserveDeleteDialog";
import { BodyBuildingReservesCard } from "./BodyBuildingReservesCard";
import { BodyBuildingReservesUIProvider } from "./BodyBuildingReservesUIContext";

export function BodyBuildingReservesPage({ history }) {
  const bodyBuildingReservesUIEvents = {
    newBodyBuildingReserveButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingReserves/new");
    },
    openEditBodyBuildingReservePage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingReserves/${id}/edit`);
    },
    openDeleteBodyBuildingReserveDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingReserves/${id}/delete`);
    },
    openDeleteBodyBuildingReservesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingReserves/deleteBodyBuildingReserves`);
    },
    openFetchBodyBuildingReservesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingReserves/fetch`);
    },
    openUpdateBodyBuildingReservesStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingReserves/updateStatus");
    },
  };
  
  return (
    <BodyBuildingReservesUIProvider bodyBuildingReservesUIEvents={bodyBuildingReservesUIEvents}>
      <BodyBuildingReservesLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingReserves/:id/delete">
        {({ history, match }) => (
          <BodyBuildingReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingReserves");
            }}
          />
        )}
      </Route>
      <BodyBuildingReservesCard />
    </BodyBuildingReservesUIProvider>
  );
}