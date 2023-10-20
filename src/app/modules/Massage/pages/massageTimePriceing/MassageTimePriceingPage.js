import React from "react";
import { Route } from "react-router-dom";
import { MassageTimePriceingLoadingDialog } from "./massageTimePriceing-loading-dialog/MassageTimePriceingLoadingDialog";
import { MassageTimePriceingDeleteDialog } from "./massageTimePriceing-delete-dialog/MassageTimePriceingDeleteDialog";
import { MassageTimePriceingCard } from "./MassageTimePriceingCard";
import { MassageTimePriceingUIProvider } from "./MassageTimePriceingUIContext";

export function MassageTimePriceingPage({ history }) {
  const massageTimePriceingUIEvents = {
    newMassageTimePriceingButtonClick: () => {
      history.push("/massage/massageTimePriceing/new");
    },
    openEditMassageTimePriceingPage: (id) => {
      history.push(`/massage/massageTimePriceing/${id}/edit`);
    },
    openDeleteMassageTimePriceingDialog: (id) => {
      history.push(`/massage/massageTimePriceing/${id}/delete`);
    },
    openDeleteMassageTimePriceingDialog: () => {
      history.push(`/massage/massageTimePriceing/deleteMassageTimePriceing`);
    },
    openFetchMassageTimePriceingDialog: () => {
      history.push(`/massage/massageTimePriceing/fetch`);
    },
    openUpdateMassageTimePriceingStatusDialog: () => {
      history.push("/massage/massageTimePriceing/updateStatus");
    },
  };
  
  return (
    <MassageTimePriceingUIProvider massageTimePriceingUIEvents={massageTimePriceingUIEvents}>
      <MassageTimePriceingLoadingDialog />
      <Route path="/massage/massageTimePriceing/:id/delete">
        {({ history, match }) => (
          <MassageTimePriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageTimePriceing");
            }}
          />
        )}
      </Route>
      <MassageTimePriceingCard />
    </MassageTimePriceingUIProvider>
  );
}