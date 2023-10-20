import React from "react";
import { Route } from "react-router-dom";
import { PoolTimePriceingLoadingDialog } from "./poolTimePriceing-loading-dialog/PoolTimePriceingLoadingDialog";
import { PoolTimePriceingDeleteDialog } from "./poolTimePriceing-delete-dialog/PoolTimePriceingDeleteDialog";
import { PoolTimePriceingCard } from "./PoolTimePriceingCard";
import { PoolTimePriceingUIProvider } from "./PoolTimePriceingUIContext";

export function PoolTimePriceingPage({ history }) {
  const poolTimePriceingUIEvents = {
    newPoolTimePriceingButtonClick: () => {
      history.push("/pool/poolTimePriceing/new");
    },
    openEditPoolTimePriceingPage: (id) => {
      history.push(`/pool/poolTimePriceing/${id}/edit`);
    },
    openDeletePoolTimePriceingDialog: (id) => {
      history.push(`/pool/poolTimePriceing/${id}/delete`);
    },
    openDeletePoolTimePriceingDialog: () => {
      history.push(`/pool/poolTimePriceing/deletePoolTimePriceing`);
    },
    openFetchPoolTimePriceingDialog: () => {
      history.push(`/pool/poolTimePriceing/fetch`);
    },
    openUpdatePoolTimePriceingStatusDialog: () => {
      history.push("/pool/poolTimePriceing/updateStatus");
    },
  };
  
  return (
    <PoolTimePriceingUIProvider poolTimePriceingUIEvents={poolTimePriceingUIEvents}>
      <PoolTimePriceingLoadingDialog />
      <Route path="/pool/poolTimePriceing/:id/delete">
        {({ history, match }) => (
          <PoolTimePriceingDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/pool/poolTimePriceing");
            }}
          />
        )}
      </Route>
      <PoolTimePriceingCard />
    </PoolTimePriceingUIProvider>
  );
}