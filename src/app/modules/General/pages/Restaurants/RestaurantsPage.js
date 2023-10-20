import React from "react";
import { Route } from "react-router-dom";
import { RestaurantsLoadingDialog } from "./restaurants-loading-dialog/RestaurantsLoadingDialog";
import { RestaurantDeleteDialog } from "./restaurant-delete-dialog/RestaurantDeleteDialog";
import { RestaurantsCard } from "./RestaurantsCard";
import { RestaurantsUIProvider } from "./RestaurantsUIContext";

export function RestaurantsPage({ history }) {
  const restaurantsUIEvents = {
    newRestaurantButtonClick: () => {
      history.push("/restaurant/restaurants/new");
    },
    openEditRestaurantPage: (id) => {
      history.push(`/restaurant/restaurants/${id}/edit`);
    },
    openDeleteRestaurantDialog: (id) => {
      history.push(`/restaurant/restaurants/${id}/delete`);
    },
    openDeleteRestaurantsDialog: () => {
      history.push(`/restaurant/restaurants/deleteRestaurants`);
    },
    openFetchRestaurantsDialog: () => {
      history.push(`/restaurant/restaurants/fetch`);
    },
    openUpdateRestaurantsStatusDialog: () => {
      history.push("/restaurant/restaurants/updateStatus");
    },
  };
  
  return (
    <RestaurantsUIProvider restaurantsUIEvents={restaurantsUIEvents}>
      <RestaurantsLoadingDialog />
      <Route path="/restaurant/restaurants/:id/delete">
        {({ history, match }) => (
          <RestaurantDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurants");
            }}
          />
        )}
      </Route>
      <RestaurantsCard />
    </RestaurantsUIProvider>
  );
}