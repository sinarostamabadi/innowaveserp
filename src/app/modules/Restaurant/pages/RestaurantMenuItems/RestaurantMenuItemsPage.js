import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuItemsLoadingDialog } from "./RrestaurantMenuItems-loading-dialog/RestaurantMenuItemsLoadingDialog";
import { RestaurantMenuItemDeleteDialog } from "./RestaurantMenuItem-delete-dialog/RestaurantMenuItemDeleteDialog";
import { RestaurantMenuItemsCard } from "./RestaurantMenuItemsCard";
import { RestaurantMenuItemsUIProvider } from "./RestaurantMenuItemsUIContext";

export function RestaurantMenuItemsPage({ history }) {
  const restaurantMenuItemsUIEvents = {
    newRestaurantMenuItemButtonClick: () => {
      history.push("/restaurant/RestaurantMenuItems/new");
    },
    openEditRestaurantMenuItemPage: (id) => {
      history.push(`/restaurant/RestaurantMenuItems/${id}/edit`);
    },
    openDeleteRestaurantMenuItemDialog: (id) => {
      history.push(`/restaurant/RestaurantMenuItems/${id}/delete`);
    },
    openDeleteRestaurantMenuItemsDialog: () => {
      history.push(`/restaurant/RestaurantMenuItems/deleteRestaurantMenuItems`);
    },
    openFetchRestaurantMenuItemsDialog: () => {
      history.push(`/restaurant/RestaurantMenuItems/fetch`);
    },
    openUpdateRestaurantMenuItemsStatusDialog: () => {
      history.push("/restaurant/RestaurantMenuItems/updateStatus");
    },
  };

  return (
    <RestaurantMenuItemsUIProvider
      restaurantMenuItemsUIEvents={restaurantMenuItemsUIEvents}
    >
      <RestaurantMenuItemsLoadingDialog />
      <Route path="/restaurant/RestaurantMenuItems/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/RestaurantMenuItems");
            }}
          />
        )}
      </Route>
      <RestaurantMenuItemsCard />
    </RestaurantMenuItemsUIProvider>
  );
}
