import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuItemPricesLoadingDialog } from "./restaurantMenuItemPrices-loading-dialog/RestaurantMenuItemPricesLoadingDialog";
import { RestaurantMenuItemPriceDeleteDialog } from "./restaurantMenuItemPrice-delete-dialog/RestaurantMenuItemPriceDeleteDialog";
import { RestaurantMenuItemPricesCard } from "./RestaurantMenuItemPricesCard";
import { RestaurantMenuItemPricesUIProvider } from "./RestaurantMenuItemPricesUIContext";

export function RestaurantMenuItemPricesPage({ history }) {
  const restaurantMenuItemPricesUIEvents = {
    newRestaurantMenuItemPriceButtonClick: () => {
      history.push("/restaurant/restaurantMenuItemPrices/new");
    },
    openEditRestaurantMenuItemPricePage: (id) => {
      history.push(`/restaurant/restaurantMenuItemPrices/${id}/edit`);
    },
    openDeleteRestaurantMenuItemPriceDialog: (id) => {
      history.push(`/restaurant/restaurantMenuItemPrices/${id}/delete`);
    },
    openDeleteRestaurantMenuItemPricesDialog: () => {
      history.push(`/restaurant/restaurantMenuItemPrices/deleteRestaurantMenuItemPrices`);
    },
    openFetchRestaurantMenuItemPricesDialog: () => {
      history.push(`/restaurant/restaurantMenuItemPrices/fetch`);
    },
    openUpdateRestaurantMenuItemPricesStatusDialog: () => {
      history.push("/restaurant/restaurantMenuItemPrices/updateStatus");
    },
  };
  
  return (
    <RestaurantMenuItemPricesUIProvider restaurantMenuItemPricesUIEvents={restaurantMenuItemPricesUIEvents}>
      <RestaurantMenuItemPricesLoadingDialog />
      <Route path="/restaurant/restaurantMenuItemPrices/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuItemPriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantMenuItemPrices");
            }}
          />
        )}
      </Route>
      <RestaurantMenuItemPricesCard />
    </RestaurantMenuItemPricesUIProvider>
  );
}