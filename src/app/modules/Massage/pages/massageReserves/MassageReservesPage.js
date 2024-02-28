import React from "react";
import { Route } from "react-router-dom";
import { MassageReservesLoadingDialog } from "./massageReserves-loading-dialog/MassageReservesLoadingDialog";
import { MassageReserveDeleteDialog } from "./massageReserve-delete-dialog/MassageReserveDeleteDialog";
import { MassageReservesCard } from "./MassageReservesCard";
import { MassageReservesUIProvider } from "./MassageReservesUIContext";

export function MassageReservesPage({ history }) {
  const massageReservesUIEvents = {
    newMassageReserveButtonClick: () => {
      history.push("/massage/massageReserves/new");
    },
    openEditMassageReservePage: (id) => {
      history.push(`/massage/massageReserves/${id}/edit`);
    },
    openDeleteMassageReserveDialog: (id) => {
      history.push(`/massage/massageReserves/${id}/delete`);
    },
    openDeleteMassageReservesDialog: () => {
      history.push(`/massage/massageReserves/deleteMassageReserves`);
    },
    openFetchMassageReservesDialog: () => {
      history.push(`/massage/massageReserves/fetch`);
    },
    openUpdateMassageReservesStatusDialog: () => {
      history.push("/massage/massageReserves/updateStatus");
    },
  };

  return (
    <MassageReservesUIProvider
      massageReservesUIEvents={massageReservesUIEvents}
    >
      <MassageReservesLoadingDialog />
      <Route path="/massage/massageReserves/:id/delete">
        {({ history, match }) => (
          <MassageReserveDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageReserves");
            }}
          />
        )}
      </Route>
      <MassageReservesCard />
    </MassageReservesUIProvider>
  );
}
