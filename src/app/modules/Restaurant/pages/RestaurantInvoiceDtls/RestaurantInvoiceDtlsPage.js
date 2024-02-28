import React from "react";
import { Route } from "react-router-dom";
import { RestaurantInvoiceDtlsLoadingDialog } from "./restaurantInvoiceDtls-loading-dialog/RestaurantInvoiceDtlsLoadingDialog";
import { RestaurantInvoiceDtlDeleteDialog } from "./restaurantInvoiceDtl-delete-dialog/RestaurantInvoiceDtlDeleteDialog";
import { RestaurantInvoiceDtlsCard } from "./RestaurantInvoiceDtlsCard";
import { RestaurantInvoiceDtlsUIProvider } from "./RestaurantInvoiceDtlsUIContext";

export function RestaurantInvoiceDtlsPage({ history }) {
  const restaurantInvoiceDtlsUIEvents = {
    newRestaurantInvoiceDtlButtonClick: () => {
      history.push("/restaurant/restaurantInvoiceDtls/new");
    },
    openEditRestaurantInvoiceDtlPage: (id) => {
      history.push(`/restaurant/restaurantInvoiceDtls/${id}/edit`);
    },
    openDeleteRestaurantInvoiceDtlDialog: (id) => {
      history.push(`/restaurant/restaurantInvoiceDtls/${id}/delete`);
    },
    openDeleteRestaurantInvoiceDtlsDialog: () => {
      history.push(
        `/restaurant/restaurantInvoiceDtls/deleteRestaurantInvoiceDtls`
      );
    },
    openFetchRestaurantInvoiceDtlsDialog: () => {
      history.push(`/restaurant/restaurantInvoiceDtls/fetch`);
    },
    openUpdateRestaurantInvoiceDtlsStatusDialog: () => {
      history.push("/restaurant/restaurantInvoiceDtls/updateStatus");
    },
  };

  return (
    <RestaurantInvoiceDtlsUIProvider
      restaurantInvoiceDtlsUIEvents={restaurantInvoiceDtlsUIEvents}
    >
      <RestaurantInvoiceDtlsLoadingDialog />
      <Route path="/restaurant/restaurantInvoiceDtls/:id/delete">
        {({ history, match }) => (
          <RestaurantInvoiceDtlDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoiceDtls");
            }}
          />
        )}
      </Route>
      <RestaurantInvoiceDtlsCard />
    </RestaurantInvoiceDtlsUIProvider>
  );
}
