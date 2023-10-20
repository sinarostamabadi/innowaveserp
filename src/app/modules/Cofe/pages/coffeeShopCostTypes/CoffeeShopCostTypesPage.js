import React from "react";
import { Route } from "react-router-dom";
import { CoffeeShopCostTypesLoadingDialog } from "./coffeeShopCostTypes-loading-dialog/CoffeeShopCostTypesLoadingDialog";
import { CoffeeShopCostTypeDeleteDialog } from "./coffeeShopCostType-delete-dialog/CoffeeShopCostTypeDeleteDialog";
import { CoffeeShopCostTypesCard } from "./CoffeeShopCostTypesCard";
import { CoffeeShopCostTypesUIProvider } from "./CoffeeShopCostTypesUIContext";

export function CoffeeShopCostTypesPage({ history }) {
  const coffeeShopCostTypesUIEvents = {
    newCoffeeShopCostTypeButtonClick: () => {
      history.push("/cofe/coffeeShopCostTypes/new");
    },
    openEditCoffeeShopCostTypePage: (id) => {
      history.push(`/cofe/coffeeShopCostTypes/${id}/edit`);
    },
    openDeleteCoffeeShopCostTypeDialog: (id) => {
      history.push(`/cofe/coffeeShopCostTypes/${id}/delete`);
    },
    openDeleteCoffeeShopCostTypesDialog: () => {
      history.push(`/cofe/coffeeShopCostTypes/deleteCoffeeShopCostTypes`);
    },
    openFetchCoffeeShopCostTypesDialog: () => {
      history.push(`/cofe/coffeeShopCostTypes/fetch`);
    },
    openUpdateCoffeeShopCostTypesStatusDialog: () => {
      history.push("/cofe/coffeeShopCostTypes/updateStatus");
    },
  };
  
  return (
    <CoffeeShopCostTypesUIProvider coffeeShopCostTypesUIEvents={coffeeShopCostTypesUIEvents}>
      <CoffeeShopCostTypesLoadingDialog />
      <Route path="/cofe/coffeeShopCostTypes/:id/delete">
        {({ history, match }) => (
          <CoffeeShopCostTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeShopCostTypes");
            }}
          />
        )}
      </Route>
      <CoffeeShopCostTypesCard />
    </CoffeeShopCostTypesUIProvider>
  );
}