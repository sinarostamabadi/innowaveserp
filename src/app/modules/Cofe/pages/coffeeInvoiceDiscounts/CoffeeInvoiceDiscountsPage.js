import React from "react";
import { Route } from "react-router-dom";
import { CoffeeInvoiceDiscountsLoadingDialog } from "./coffeeInvoiceDiscounts-loading-dialog/CoffeeInvoiceDiscountsLoadingDialog";
import { CoffeeInvoiceDiscountDeleteDialog } from "./coffeeInvoiceDiscount-delete-dialog/CoffeeInvoiceDiscountDeleteDialog";
import { CoffeeInvoiceDiscountsCard } from "./CoffeeInvoiceDiscountsCard";
import { CoffeeInvoiceDiscountsUIProvider } from "./CoffeeInvoiceDiscountsUIContext";

export function CoffeeInvoiceDiscountsPage({ history }) {
  const coffeeInvoiceDiscountsUIEvents = {
    newCoffeeInvoiceDiscountButtonClick: () => {
      history.push("/cofe/coffeeInvoiceDiscounts/new");
    },
    openEditCoffeeInvoiceDiscountPage: (id) => {
      history.push(`/cofe/coffeeInvoiceDiscounts/${id}/edit`);
    },
    openDeleteCoffeeInvoiceDiscountDialog: (id) => {
      history.push(`/cofe/coffeeInvoiceDiscounts/${id}/delete`);
    },
    openDeleteCoffeeInvoiceDiscountsDialog: () => {
      history.push(`/cofe/coffeeInvoiceDiscounts/deleteCoffeeInvoiceDiscounts`);
    },
    openFetchCoffeeInvoiceDiscountsDialog: () => {
      history.push(`/cofe/coffeeInvoiceDiscounts/fetch`);
    },
    openUpdateCoffeeInvoiceDiscountsStatusDialog: () => {
      history.push("/cofe/coffeeInvoiceDiscounts/updateStatus");
    },
  };

  return (
    <CoffeeInvoiceDiscountsUIProvider
      coffeeInvoiceDiscountsUIEvents={coffeeInvoiceDiscountsUIEvents}
    >
      <CoffeeInvoiceDiscountsLoadingDialog />
      <Route path="/cofe/coffeeInvoiceDiscounts/:id/delete">
        {({ history, match }) => (
          <CoffeeInvoiceDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeInvoiceDiscounts");
            }}
          />
        )}
      </Route>
      <CoffeeInvoiceDiscountsCard />
    </CoffeeInvoiceDiscountsUIProvider>
  );
}
