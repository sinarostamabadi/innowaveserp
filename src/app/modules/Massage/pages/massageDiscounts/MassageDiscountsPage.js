import React from "react";
import { Route } from "react-router-dom";
import { MassageDiscountsLoadingDialog } from "./massageDiscounts-loading-dialog/MassageDiscountsLoadingDialog";
import { MassageDiscountDeleteDialog } from "./massageDiscount-delete-dialog/MassageDiscountDeleteDialog";
import { MassageDiscountsCard } from "./MassageDiscountsCard";
import { MassageDiscountsUIProvider } from "./MassageDiscountsUIContext";

export function MassageDiscountsPage({ history }) {
  const massageDiscountsUIEvents = {
    newMassageDiscountButtonClick: () => {
      history.push("/massage/massageDiscounts/new");
    },
    openEditMassageDiscountPage: (id) => {
      history.push(`/massage/massageDiscounts/${id}/edit`);
    },
    openDeleteMassageDiscountDialog: (id) => {
      history.push(`/massage/massageDiscounts/${id}/delete`);
    },
    openDeleteMassageDiscountsDialog: () => {
      history.push(`/massage/massageDiscounts/deleteMassageDiscounts`);
    },
    openFetchMassageDiscountsDialog: () => {
      history.push(`/massage/massageDiscounts/fetch`);
    },
    openUpdateMassageDiscountsStatusDialog: () => {
      history.push("/massage/massageDiscounts/updateStatus");
    },
  };
  
  return (
    <MassageDiscountsUIProvider massageDiscountsUIEvents={massageDiscountsUIEvents}>
      <MassageDiscountsLoadingDialog />
      <Route path="/massage/massageDiscounts/:id/delete">
        {({ history, match }) => (
          <MassageDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/massage/massageDiscounts");
            }}
          />
        )}
      </Route>
      <MassageDiscountsCard />
    </MassageDiscountsUIProvider>
  );
}