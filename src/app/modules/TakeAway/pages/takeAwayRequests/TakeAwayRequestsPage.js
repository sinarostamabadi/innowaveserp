import React from "react";
import { Route } from "react-router-dom";
import { TakeAwayRequestsLoadingDialog } from "./takeAwayRequests-loading-dialog/TakeAwayRequestsLoadingDialog";
import { TakeAwayRequestDeleteDialog } from "./takeAwayRequest-delete-dialog/TakeAwayRequestDeleteDialog";
import { TakeAwayRequestsCard } from "./TakeAwayRequestsCard";
import { TakeAwayRequestsUIProvider } from "./TakeAwayRequestsUIContext";

export function TakeAwayRequestsPage({ history }) {
  const takeAwayRequestsUIEvents = {
    newTakeAwayRequestButtonClick: (mode) => {
      switch (mode) {
        case 1:
          history.push("/TakeAway/takeAwayRequests/hyper/new");
          break;
        case 2:
          history.push("/TakeAway/takeAwayRequests/restaurant/new");
          break;
      }
    },
    openEditTakeAwayRequestPage: (id, mode) => {
      switch (mode) {
        case 1:
          history.push(`/TakeAway/takeAwayRequests/hyper/${id}/edit`);
          break;
        case 2:
          history.push(`/TakeAway/takeAwayRequests/restaurant/${id}/edit`);
          break;
      }
      history.push(`/TakeAway/takeAwayRequests/${id}/edit`);
    },
    openDeleteTakeAwayRequestDialog: (id) => {
      history.push(`/TakeAway/takeAwayRequests/${id}/delete`);
    },
    openDeleteTakeAwayRequestsDialog: () => {
      history.push(`/TakeAway/takeAwayRequests/deleteTakeAwayRequests`);
    },
    openFetchTakeAwayRequestsDialog: () => {
      history.push(`/TakeAway/takeAwayRequests/fetch`);
    },
    openUpdateTakeAwayRequestsStatusDialog: () => {
      history.push("/TakeAway/takeAwayRequests/updateStatus");
    },
  };
  
  return (
    <TakeAwayRequestsUIProvider takeAwayRequestsUIEvents={takeAwayRequestsUIEvents}>
      <TakeAwayRequestsLoadingDialog />
      <Route path="/TakeAway/takeAwayRequests/:id/delete">
        {({ history, match }) => (
          <TakeAwayRequestDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/TakeAway/takeAwayRequests");
            }}
          />
        )}
      </Route>
      <TakeAwayRequestsCard />
    </TakeAwayRequestsUIProvider>
  );
}