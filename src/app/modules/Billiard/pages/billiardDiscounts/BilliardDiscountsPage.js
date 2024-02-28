import React from "react";
import { Route } from "react-router-dom";
import { BilliardDiscountsLoadingDialog } from "./billiardDiscounts-loading-dialog/BilliardDiscountsLoadingDialog";
import { BilliardDiscountDeleteDialog } from "./billiardDiscount-delete-dialog/BilliardDiscountDeleteDialog";
import { BilliardDiscountsCard } from "./BilliardDiscountsCard";
import { BilliardDiscountsUIProvider } from "./BilliardDiscountsUIContext";

export function BilliardDiscountsPage({ history }) {
  const billiardDiscountsUIEvents = {
    newBilliardDiscountButtonClick: () => {
      history.push("/billiard/billiardDiscounts/new");
    },
    openEditBilliardDiscountPage: (id) => {
      history.push(`/billiard/billiardDiscounts/${id}/edit`);
    },
    openDeleteBilliardDiscountDialog: (id) => {
      history.push(`/billiard/billiardDiscounts/${id}/delete`);
    },
    openDeleteBilliardDiscountsDialog: () => {
      history.push(`/billiard/billiardDiscounts/deleteBilliardDiscounts`);
    },
    openFetchBilliardDiscountsDialog: () => {
      history.push(`/billiard/billiardDiscounts/fetch`);
    },
    openUpdateBilliardDiscountsStatusDialog: () => {
      history.push("/billiard/billiardDiscounts/updateStatus");
    },
  };

  return (
    <BilliardDiscountsUIProvider
      billiardDiscountsUIEvents={billiardDiscountsUIEvents}
    >
      <BilliardDiscountsLoadingDialog />
      <Route path="/billiard/billiardDiscounts/:id/delete">
        {({ history, match }) => (
          <BilliardDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/billiard/billiardDiscounts");
            }}
          />
        )}
      </Route>
      <BilliardDiscountsCard />
    </BilliardDiscountsUIProvider>
  );
}
