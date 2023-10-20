import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuItemRatesLoadingDialog } from "./restaurantMenuItemRates-loading-dialog/RestaurantMenuItemRatesLoadingDialog";
import { RestaurantMenuItemRateDeleteDialog } from "./restaurantMenuItemRate-delete-dialog/RestaurantMenuItemRateDeleteDialog";
import { RestaurantMenuItemRatesCard } from "./RestaurantMenuItemRatesCard";
import { RestaurantMenuItemRatesUIProvider } from "./RestaurantMenuItemRatesUIContext";

export function RestaurantMenuItemRatesPage({ history }) {
  const restaurantMenuItemRatesUIEvents = {
    newRestaurantMenuItemRateButtonClick: () => {
      history.push("/restaurant/restaurantMenuItemRates/new");
    },
    openEditRestaurantMenuItemRatePage: (id) => {
      history.push(`/restaurant/restaurantMenuItemRates/${id}/edit`);
    },
    openDeleteRestaurantMenuItemRateDialog: (id) => {
      history.push(`/restaurant/restaurantMenuItemRates/${id}/delete`);
    },
    openDeleteRestaurantMenuItemRatesDialog: () => {
      history.push(`/restaurant/restaurantMenuItemRates/deleteRestaurantMenuItemRates`);
    },
    openFetchRestaurantMenuItemRatesDialog: () => {
      history.push(`/restaurant/restaurantMenuItemRates/fetch`);
    },
    openUpdateRestaurantMenuItemRatesStatusDialog: () => {
      history.push("/restaurant/restaurantMenuItemRates/updateStatus");
    },
  };
  
  return (
    <RestaurantMenuItemRatesUIProvider restaurantMenuItemRatesUIEvents={restaurantMenuItemRatesUIEvents}>
      <RestaurantMenuItemRatesLoadingDialog />
      <Route path="/restaurant/restaurantMenuItemRates/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuItemRateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantMenuItemRates");
            }}
          />
        )}
      </Route>
      <RestaurantMenuItemRatesCard />
    </RestaurantMenuItemRatesUIProvider>
  );
}