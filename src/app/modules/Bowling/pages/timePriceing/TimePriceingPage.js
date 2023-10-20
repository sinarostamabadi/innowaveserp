import React from "react";
import { Route } from "react-router-dom";
import { TimePriceingLoadingDialog } from "./timePriceing-loading-dialog/TimePriceingLoadingDialog";
import { TimePriceingDeleteDialog } from "./timePriceing-delete-dialog/TimePriceingDeleteDialog";
import { TimePriceingCard } from "./TimePriceingCard";
import { TimePriceingUIProvider } from "./TimePriceingUIContext";

export function TimePriceingPage({ history }) {
  const timePriceingUIEvents = {
    newTimePriceingButtonClick: () => {
      history.push("/bowling/timePriceing/new");
    },
    openEditTimePriceingPage: (id) => {
      history.push(`/bowling/timePriceing/${id}/edit`);
    },
    openDeleteTimePriceingDialog: (id) => {
      history.push(`/bowling/timePriceing/${id}/delete`);
    },
    openDeleteTimePriceingDialog: () => {
      history.push(`/bowling/timePriceing/deleteTimePriceing`);
    },
    openFetchTimePriceingDialog: () => {
      history.push(`/bowling/timePriceing/fetch`);
    },
    openUpdateTimePriceingStatusDialog: () => {
      history.push("/bowling/timePriceing/updateStatus");
    },
  };
  
  return (
    <TimePriceingUIProvider timePriceingUIEvents={timePriceingUIEvents}>
      <TimePriceingLoadingDialog />
      <Route path="/bowling/timePriceing/:id/delete">
        {({ history, match }) => (
          <TimePriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/bowling/timePriceing");
            }}
          />
        )}
      </Route>
      <TimePriceingCard />
    </TimePriceingUIProvider>
  );
}