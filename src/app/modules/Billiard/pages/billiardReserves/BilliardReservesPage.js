import React from "react";
import { Route } from "react-router-dom";
import { BilliardReservesLoadingDialog } from "./billiardReserves-loading-dialog/BilliardReservesLoadingDialog";
import { BilliardReserveDeleteDialog } from "./billiardReserve-delete-dialog/BilliardReserveDeleteDialog";
import { BilliardReservesCard } from "./BilliardReservesCard";
import { BilliardReservesUIProvider } from "./BilliardReservesUIContext";

export function BilliardReservesPage({ history }) {
  const billiardReservesUIEvents = {
    newBilliardReserveButtonClick: () => {
      history.push("/billiard/billiardReserves/new");
    },
    openEditBilliardReservePage: (id) => {
      history.push(`/billiard/billiardReserves/${id}/edit`);
    },
    openDeleteBilliardReserveDialog: (id) => {
      history.push(`/billiard/billiardReserves/${id}/delete`);
    },
    openDeleteBilliardReservesDialog: () => {
      history.push(`/billiard/billiardReserves/deleteBilliardReserves`);
    },
    openFetchBilliardReservesDialog: () => {
      history.push(`/billiard/billiardReserves/fetch`);
    },
    openUpdateBilliardReservesStatusDialog: () => {
      history.push("/billiard/billiardReserves/updateStatus");
    },
  };

  return (
    <BilliardReservesUIProvider
      billiardReservesUIEvents={billiardReservesUIEvents}
    >
      <BilliardReservesLoadingDialog />
      <Route path="/billiard/billiardReserves/:id/delete">
        {({ history, match }) => (
          <BilliardReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/billiard/billiardReserves");
            }}
          />
        )}
      </Route>
      <BilliardReservesCard />
    </BilliardReservesUIProvider>
  );
}
