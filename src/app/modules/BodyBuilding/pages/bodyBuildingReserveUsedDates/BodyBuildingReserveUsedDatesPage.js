import React from "react";
import { Route } from "react-router-dom";
import { BodyBuildingReserveUsedDatesLoadingDialog } from "./bodyBuildingReserveUsedDates-loading-dialog/BodyBuildingReserveUsedDatesLoadingDialog";
import { BodyBuildingReserveUsedDateDeleteDialog } from "./bodyBuildingReserveUsedDate-delete-dialog/BodyBuildingReserveUsedDateDeleteDialog";
import { BodyBuildingReserveUsedDatesCard } from "./BodyBuildingReserveUsedDatesCard";
import { BodyBuildingReserveUsedDatesUIProvider } from "./BodyBuildingReserveUsedDatesUIContext";

export function BodyBuildingReserveUsedDatesPage({ history }) {
  const bodyBuildingReserveUsedDatesUIEvents = {
    newBodyBuildingReserveUsedDateButtonClick: () => {
      history.push("/bodyBuilding/bodyBuildingReserveUsedDates/new");
    },
    openEditBodyBuildingReserveUsedDatePage: (id) => {
      history.push(`/bodyBuilding/bodyBuildingReserveUsedDates/${id}/edit`);
    },
    openDeleteBodyBuildingReserveUsedDateDialog: (id) => {
      history.push(`/bodyBuilding/bodyBuildingReserveUsedDates/${id}/delete`);
    },
    openDeleteBodyBuildingReserveUsedDatesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingReserveUsedDates/deleteBodyBuildingReserveUsedDates`);
    },
    openFetchBodyBuildingReserveUsedDatesDialog: () => {
      history.push(`/bodyBuilding/bodyBuildingReserveUsedDates/fetch`);
    },
    openUpdateBodyBuildingReserveUsedDatesStatusDialog: () => {
      history.push("/bodyBuilding/bodyBuildingReserveUsedDates/updateStatus");
    },
  };
  
  return (
    <BodyBuildingReserveUsedDatesUIProvider bodyBuildingReserveUsedDatesUIEvents={bodyBuildingReserveUsedDatesUIEvents}>
      <BodyBuildingReserveUsedDatesLoadingDialog />
      <Route path="/bodyBuilding/bodyBuildingReserveUsedDates/:id/delete">
        {({ history, match }) => (
          <BodyBuildingReserveUsedDateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bodyBuilding/bodyBuildingReserveUsedDates");
            }}
          />
        )}
      </Route>
      <BodyBuildingReserveUsedDatesCard />
    </BodyBuildingReserveUsedDatesUIProvider>
  );
}