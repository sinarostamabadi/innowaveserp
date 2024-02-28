import React from "react";
import { Route } from "react-router-dom";
import { CoffeeShopDiscountTypesLoadingDialog } from "./coffeeShopDiscountTypes-loading-dialog/CoffeeShopDiscountTypesLoadingDialog";
import { CoffeeShopDiscountTypeDeleteDialog } from "./coffeeShopDiscountType-delete-dialog/CoffeeShopDiscountTypeDeleteDialog";
import { CoffeeShopDiscountTypesCard } from "./CoffeeShopDiscountTypesCard";
import { CoffeeShopDiscountTypesUIProvider } from "./CoffeeShopDiscountTypesUIContext";

export function CoffeeShopDiscountTypesPage({ history }) {
  const coffeeShopDiscountTypesUIEvents = {
    newCoffeeShopDiscountTypeButtonClick: () => {
      history.push("/cofe/coffeeShopDiscountTypes/new");
    },
    openEditCoffeeShopDiscountTypePage: (id) => {
      history.push(`/cofe/coffeeShopDiscountTypes/${id}/edit`);
    },
    openDeleteCoffeeShopDiscountTypeDialog: (id) => {
      history.push(`/cofe/coffeeShopDiscountTypes/${id}/delete`);
    },
    openDeleteCoffeeShopDiscountTypesDialog: () => {
      history.push(
        `/cofe/coffeeShopDiscountTypes/deleteCoffeeShopDiscountTypes`
      );
    },
    openFetchCoffeeShopDiscountTypesDialog: () => {
      history.push(`/cofe/coffeeShopDiscountTypes/fetch`);
    },
    openUpdateCoffeeShopDiscountTypesStatusDialog: () => {
      history.push("/cofe/coffeeShopDiscountTypes/updateStatus");
    },
  };

  return (
    <CoffeeShopDiscountTypesUIProvider
      coffeeShopDiscountTypesUIEvents={coffeeShopDiscountTypesUIEvents}
    >
      <CoffeeShopDiscountTypesLoadingDialog />
      <Route path="/cofe/coffeeShopDiscountTypes/:id/delete">
        {({ history, match }) => (
          <CoffeeShopDiscountTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeShopDiscountTypes");
            }}
          />
        )}
      </Route>
      <CoffeeShopDiscountTypesCard />
    </CoffeeShopDiscountTypesUIProvider>
  );
}
