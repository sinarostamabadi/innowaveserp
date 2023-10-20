import React from "react";
import { Route } from "react-router-dom";
import { CoffeeInvoicesLoadingDialog } from "./coffeeInvoices-loading-dialog/CoffeeInvoicesLoadingDialog";
import { CoffeeInvoiceDeleteDialog } from "./coffeeInvoice-delete-dialog/CoffeeInvoiceDeleteDialog";
import { CoffeeInvoicesCard } from "./CoffeeInvoicesCard";
import { CoffeeInvoicesUIProvider } from "./CoffeeInvoicesUIContext";

export function CoffeeInvoicesPage({ history }) {
  const coffeeInvoicesUIEvents = {
    newCoffeeInvoiceButtonClick: () => {
      history.push("/cofe/coffeeInvoices/new");
    },
    openEditCoffeeInvoicePage: (id) => {
      history.push(`/cofe/coffeeInvoices/${id}/edit`);
    },
    openDeleteCoffeeInvoiceDialog: (id) => {
      history.push(`/cofe/coffeeInvoices/${id}/delete`);
    },
    openDeleteCoffeeInvoicesDialog: () => {
      history.push(`/cofe/coffeeInvoices/deleteCoffeeInvoices`);
    },
    openFetchCoffeeInvoicesDialog: () => {
      history.push(`/cofe/coffeeInvoices/fetch`);
    },
    openUpdateCoffeeInvoicesStatusDialog: () => {
      history.push("/cofe/coffeeInvoices/updateStatus");
    },
  };
  
  return (
    <CoffeeInvoicesUIProvider coffeeInvoicesUIEvents={coffeeInvoicesUIEvents}>
      <CoffeeInvoicesLoadingDialog />
      <Route path="/cofe/coffeeInvoices/:id/delete">
        {({ history, match }) => (
          <CoffeeInvoiceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeInvoices");
            }}
          />
        )}
      </Route>
      <CoffeeInvoicesCard />
    </CoffeeInvoicesUIProvider>
  );
}