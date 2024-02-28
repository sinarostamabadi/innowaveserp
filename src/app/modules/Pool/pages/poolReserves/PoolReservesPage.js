import React from "react";
import { Route } from "react-router-dom";
import { PoolReservesLoadingDialog } from "./poolReserves-loading-dialog/PoolReservesLoadingDialog";
import { PoolReserveDeleteDialog } from "./poolReserve-delete-dialog/PoolReserveDeleteDialog";
import { PoolReservesCard } from "./PoolReservesCard";
import { PoolReservesUIProvider } from "./PoolReservesUIContext";

export function PoolReservesPage({ history }) {
  const poolReservesUIEvents = {
    newPoolReserveButtonClick: () => {
      history.push("/pool/poolReserves/new");
    },
    openEditPoolReservePage: (id) => {
      history.push(`/pool/poolReserves/${id}/edit`);
    },
    openDeletePoolReserveDialog: (id) => {
      history.push(`/pool/poolReserves/${id}/delete`);
    },
    openDeletePoolReservesDialog: () => {
      history.push(`/pool/poolReserves/deletePoolReserves`);
    },
    openFetchPoolReservesDialog: () => {
      history.push(`/pool/poolReserves/fetch`);
    },
    openUpdatePoolReservesStatusDialog: () => {
      history.push("/pool/poolReserves/updateStatus");
    },
  };

  return (
    <PoolReservesUIProvider poolReservesUIEvents={poolReservesUIEvents}>
      <PoolReservesLoadingDialog />
      <Route path="/pool/poolReserves/:id/delete">
        {({ history, match }) => (
          <PoolReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/pool/poolReserves");
            }}
          />
        )}
      </Route>
      <PoolReservesCard />
    </PoolReservesUIProvider>
  );
}
