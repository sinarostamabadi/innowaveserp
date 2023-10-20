import React from "react";
import { Route } from "react-router-dom";
import { FutsalDiscountsLoadingDialog } from "./futsalDiscounts-loading-dialog/FutsalDiscountsLoadingDialog";
import { FutsalDiscountDeleteDialog } from "./futsalDiscount-delete-dialog/FutsalDiscountDeleteDialog";
import { FutsalDiscountsCard } from "./FutsalDiscountsCard";
import { FutsalDiscountsUIProvider } from "./FutsalDiscountsUIContext";

export function FutsalDiscountsPage({ history }) {
  const futsalDiscountsUIEvents = {
    newFutsalDiscountButtonClick: () => {
      history.push("/futsal/futsalDiscounts/new");
    },
    openEditFutsalDiscountPage: (id) => {
      history.push(`/futsal/futsalDiscounts/${id}/edit`);
    },
    openDeleteFutsalDiscountDialog: (id) => {
      history.push(`/futsal/futsalDiscounts/${id}/delete`);
    },
    openDeleteFutsalDiscountsDialog: () => {
      history.push(`/futsal/futsalDiscounts/deleteFutsalDiscounts`);
    },
    openFetchFutsalDiscountsDialog: () => {
      history.push(`/futsal/futsalDiscounts/fetch`);
    },
    openUpdateFutsalDiscountsStatusDialog: () => {
      history.push("/futsal/futsalDiscounts/updateStatus");
    },
  };
  
  return (
    <FutsalDiscountsUIProvider futsalDiscountsUIEvents={futsalDiscountsUIEvents}>
      <FutsalDiscountsLoadingDialog />
      <Route path="/futsal/futsalDiscounts/:id/delete">
        {({ history, match }) => (
          <FutsalDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/futsal/futsalDiscounts");
            }}
          />
        )}
      </Route>
      <FutsalDiscountsCard />
    </FutsalDiscountsUIProvider>
  );
}