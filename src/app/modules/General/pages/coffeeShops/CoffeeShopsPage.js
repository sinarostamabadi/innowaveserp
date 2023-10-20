import React from "react";
import { Route } from "react-router-dom";
import { CoffeeShopsLoadingDialog } from "./coffeeShops-loading-dialog/CoffeeShopsLoadingDialog";
import { CoffeeShopDeleteDialog } from "./coffeeShop-delete-dialog/CoffeeShopDeleteDialog";
import { CoffeeShopsCard } from "./CoffeeShopsCard";
import { CoffeeShopsUIProvider } from "./CoffeeShopsUIContext";

export function CoffeeShopsPage({ history }) {
  const coffeeShopsUIEvents = {
    newCoffeeShopButtonClick: () => {
      history.push("/general/coffeeShops/new");
    },
    openEditCoffeeShopPage: (id) => {
      history.push(`/general/coffeeShops/${id}/edit`);
    },
    openDeleteCoffeeShopDialog: (id) => {
      history.push(`/general/coffeeShops/${id}/delete`);
    },
    openDeleteCoffeeShopsDialog: () => {
      history.push(`/general/coffeeShops/deleteCoffeeShops`);
    },
    openFetchCoffeeShopsDialog: () => {
      history.push(`/general/coffeeShops/fetch`);
    },
    openUpdateCoffeeShopsStatusDialog: () => {
      history.push("/general/coffeeShops/updateStatus");
    },
  };
  
  return (
    <CoffeeShopsUIProvider coffeeShopsUIEvents={coffeeShopsUIEvents}>
      <CoffeeShopsLoadingDialog />
      <Route path="/general/coffeeShops/:id/delete">
        {({ history, match }) => (
          <CoffeeShopDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/general/coffeeShops");
            }}
          />
        )}
      </Route>
      <CoffeeShopsCard />
    </CoffeeShopsUIProvider>
  );
}
