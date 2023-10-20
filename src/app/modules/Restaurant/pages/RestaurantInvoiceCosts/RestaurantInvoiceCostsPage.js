import React from "react";
import { Route } from "react-router-dom";
import { RestaurantInvoiceCostsLoadingDialog } from "./restaurantInvoiceCosts-loading-dialog/RestaurantInvoiceCostsLoadingDialog";
import { RestaurantInvoiceCostDeleteDialog } from "./restaurantInvoiceCost-delete-dialog/RestaurantInvoiceCostDeleteDialog";
import { RestaurantInvoiceCostsCard } from "./RestaurantInvoiceCostsCard";
import { RestaurantInvoiceCostsUIProvider } from "./RestaurantInvoiceCostsUIContext";

export function RestaurantInvoiceCostsPage({ history }) {
  const restaurantInvoiceCostsUIEvents = {
    newRestaurantInvoiceCostButtonClick: () => {
      history.push("/restaurant/restaurantInvoiceCosts/new");
    },
    openEditRestaurantInvoiceCostPage: (id) => {
      history.push(`/restaurant/restaurantInvoiceCosts/${id}/edit`);
    },
    openDeleteRestaurantInvoiceCostDialog: (id) => {
      history.push(`/restaurant/restaurantInvoiceCosts/${id}/delete`);
    },
    openDeleteRestaurantInvoiceCostsDialog: () => {
      history.push(`/restaurant/restaurantInvoiceCosts/deleteRestaurantInvoiceCosts`);
    },
    openFetchRestaurantInvoiceCostsDialog: () => {
      history.push(`/restaurant/restaurantInvoiceCosts/fetch`);
    },
    openUpdateRestaurantInvoiceCostsStatusDialog: () => {
      history.push("/restaurant/restaurantInvoiceCosts/updateStatus");
    },
  };
  
  return (
    <RestaurantInvoiceCostsUIProvider restaurantInvoiceCostsUIEvents={restaurantInvoiceCostsUIEvents}>
      <RestaurantInvoiceCostsLoadingDialog />
      <Route path="/restaurant/restaurantInvoiceCosts/:id/delete">
        {({ history, match }) => (
          <RestaurantInvoiceCostDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoiceCosts");
            }}
          />
        )}
      </Route>
      <RestaurantInvoiceCostsCard />
    </RestaurantInvoiceCostsUIProvider>
  );
}