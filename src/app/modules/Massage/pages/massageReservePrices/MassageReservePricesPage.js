import React from "react";
import { Route } from "react-router-dom";
import { MassageReservePricesLoadingDialog } from "./massageReservePrices-loading-dialog/MassageReservePricesLoadingDialog";
import { MassageReservePriceDeleteDialog } from "./massageReservePrice-delete-dialog/MassageReservePriceDeleteDialog";
import { MassageReservePricesCard } from "./MassageReservePricesCard";
import { MassageReservePricesUIProvider } from "./MassageReservePricesUIContext";

export function MassageReservePricesPage({ history }) {
  const massageReservePricesUIEvents = {
    newMassageReservePriceButtonClick: () => {
      history.push("/massage/massageReservePrices/new");
    },
    openEditMassageReservePricePage: (id) => {
      history.push(`/massage/massageReservePrices/${id}/edit`);
    },
    openDeleteMassageReservePriceDialog: (id) => {
      history.push(`/massage/massageReservePrices/${id}/delete`);
    },
    openDeleteMassageReservePricesDialog: () => {
      history.push(`/massage/massageReservePrices/deleteMassageReservePrices`);
    },
    openFetchMassageReservePricesDialog: () => {
      history.push(`/massage/massageReservePrices/fetch`);
    },
    openUpdateMassageReservePricesStatusDialog: () => {
      history.push("/massage/massageReservePrices/updateStatus");
    },
  };

  return (
    <MassageReservePricesUIProvider
      massageReservePricesUIEvents={massageReservePricesUIEvents}
    >
      <MassageReservePricesLoadingDialog />
      <Route path="/massage/massageReservePrices/:id/delete">
        {({ history, match }) => (
          <MassageReservePriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageReservePrices");
            }}
          />
        )}
      </Route>
      <MassageReservePricesCard />
    </MassageReservePricesUIProvider>
  );
}
