import React from "react";
import { Route } from "react-router-dom";
import { CoffeeInvoiceCostsLoadingDialog } from "./coffeeInvoiceCosts-loading-dialog/CoffeeInvoiceCostsLoadingDialog";
import { CoffeeInvoiceCostDeleteDialog } from "./coffeeInvoiceCost-delete-dialog/CoffeeInvoiceCostDeleteDialog";
import { CoffeeInvoiceCostsCard } from "./CoffeeInvoiceCostsCard";
import { CoffeeInvoiceCostsUIProvider } from "./CoffeeInvoiceCostsUIContext";

export function CoffeeInvoiceCostsPage({ history }) {
  const coffeeInvoiceCostsUIEvents = {
    newCoffeeInvoiceCostButtonClick: () => {
      history.push("/cofe/coffeeInvoiceCosts/new");
    },
    openEditCoffeeInvoiceCostPage: (id) => {
      history.push(`/cofe/coffeeInvoiceCosts/${id}/edit`);
    },
    openDeleteCoffeeInvoiceCostDialog: (id) => {
      history.push(`/cofe/coffeeInvoiceCosts/${id}/delete`);
    },
    openDeleteCoffeeInvoiceCostsDialog: () => {
      history.push(`/cofe/coffeeInvoiceCosts/deleteCoffeeInvoiceCosts`);
    },
    openFetchCoffeeInvoiceCostsDialog: () => {
      history.push(`/cofe/coffeeInvoiceCosts/fetch`);
    },
    openUpdateCoffeeInvoiceCostsStatusDialog: () => {
      history.push("/cofe/coffeeInvoiceCosts/updateStatus");
    },
  };
  
  return (
    <CoffeeInvoiceCostsUIProvider coffeeInvoiceCostsUIEvents={coffeeInvoiceCostsUIEvents}>
      <CoffeeInvoiceCostsLoadingDialog />
      <Route path="/cofe/coffeeInvoiceCosts/:id/delete">
        {({ history, match }) => (
          <CoffeeInvoiceCostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeInvoiceCosts");
            }}
          />
        )}
      </Route>
      <CoffeeInvoiceCostsCard />
    </CoffeeInvoiceCostsUIProvider>
  );
}