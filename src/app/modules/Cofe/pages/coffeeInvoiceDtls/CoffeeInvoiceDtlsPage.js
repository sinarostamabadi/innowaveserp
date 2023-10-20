import React from "react";
import { Route } from "react-router-dom";
import { CoffeeInvoiceDtlsLoadingDialog } from "./coffeeInvoiceDtls-loading-dialog/CoffeeInvoiceDtlsLoadingDialog";
import { CoffeeInvoiceDtlDeleteDialog } from "./coffeeInvoiceDtl-delete-dialog/CoffeeInvoiceDtlDeleteDialog";
import { CoffeeInvoiceDtlsCard } from "./CoffeeInvoiceDtlsCard";
import { CoffeeInvoiceDtlsUIProvider } from "./CoffeeInvoiceDtlsUIContext";

export function CoffeeInvoiceDtlsPage({ history }) {
  const coffeeInvoiceDtlsUIEvents = {
    newCoffeeInvoiceDtlButtonClick: () => {
      history.push("/cofe/coffeeInvoiceDtls/new");
    },
    openEditCoffeeInvoiceDtlPage: (id) => {
      history.push(`/cofe/coffeeInvoiceDtls/${id}/edit`);
    },
    openDeleteCoffeeInvoiceDtlDialog: (id) => {
      history.push(`/cofe/coffeeInvoiceDtls/${id}/delete`);
    },
    openDeleteCoffeeInvoiceDtlsDialog: () => {
      history.push(`/cofe/coffeeInvoiceDtls/deleteCoffeeInvoiceDtls`);
    },
    openFetchCoffeeInvoiceDtlsDialog: () => {
      history.push(`/cofe/coffeeInvoiceDtls/fetch`);
    },
    openUpdateCoffeeInvoiceDtlsStatusDialog: () => {
      history.push("/cofe/coffeeInvoiceDtls/updateStatus");
    },
  };
  
  return (
    <CoffeeInvoiceDtlsUIProvider coffeeInvoiceDtlsUIEvents={coffeeInvoiceDtlsUIEvents}>
      <CoffeeInvoiceDtlsLoadingDialog />
      <Route path="/cofe/coffeeInvoiceDtls/:id/delete">
        {({ history, match }) => (
          <CoffeeInvoiceDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/coffeeInvoiceDtls");
            }}
          />
        )}
      </Route>
      <CoffeeInvoiceDtlsCard />
    </CoffeeInvoiceDtlsUIProvider>
  );
}