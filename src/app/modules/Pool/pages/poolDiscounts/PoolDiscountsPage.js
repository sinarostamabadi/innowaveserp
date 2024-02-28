import React from "react";
import { Route } from "react-router-dom";
import { PoolDiscountsLoadingDialog } from "./poolDiscounts-loading-dialog/PoolDiscountsLoadingDialog";
import { PoolDiscountDeleteDialog } from "./poolDiscount-delete-dialog/PoolDiscountDeleteDialog";
import { PoolDiscountsCard } from "./PoolDiscountsCard";
import { PoolDiscountsUIProvider } from "./PoolDiscountsUIContext";

export function PoolDiscountsPage({ history }) {
  const poolDiscountsUIEvents = {
    newPoolDiscountButtonClick: () => {
      history.push("/pool/poolDiscounts/new");
    },
    openEditPoolDiscountPage: (id) => {
      history.push(`/pool/poolDiscounts/${id}/edit`);
    },
    openDeletePoolDiscountDialog: (id) => {
      history.push(`/pool/poolDiscounts/${id}/delete`);
    },
    openDeletePoolDiscountsDialog: () => {
      history.push(`/pool/poolDiscounts/deletePoolDiscounts`);
    },
    openFetchPoolDiscountsDialog: () => {
      history.push(`/pool/poolDiscounts/fetch`);
    },
    openUpdatePoolDiscountsStatusDialog: () => {
      history.push("/pool/poolDiscounts/updateStatus");
    },
  };

  return (
    <PoolDiscountsUIProvider poolDiscountsUIEvents={poolDiscountsUIEvents}>
      <PoolDiscountsLoadingDialog />
      <Route path="/pool/poolDiscounts/:id/delete">
        {({ history, match }) => (
          <PoolDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/pool/poolDiscounts");
            }}
          />
        )}
      </Route>
      <PoolDiscountsCard />
    </PoolDiscountsUIProvider>
  );
}
