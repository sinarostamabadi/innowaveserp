import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuGroupsLoadingDialog } from "./restaurantMenuGroups-loading-dialog/RestaurantMenuGroupsLoadingDialog";
import { RestaurantMenuGroupDeleteDialog } from "./restaurantMenuGroup-delete-dialog/RestaurantMenuGroupDeleteDialog";
import { RestaurantMenuGroupsCard } from "./RestaurantMenuGroupsCard";
import { RestaurantMenuGroupsUIProvider } from "./RestaurantMenuGroupsUIContext";

export function RestaurantMenuGroupsPage({ history }) {
  const restaurantMenuGroupsUIEvents = {
    newRestaurantMenuGroupButtonClick: () => {
      history.push("/restaurant/restaurantMenuGroups/new");
    },
    openEditRestaurantMenuGroupPage: (id) => {
      history.push(`/restaurant/restaurantMenuGroups/${id}/edit`);
    },
    openDeleteRestaurantMenuGroupDialog: (id) => {
      history.push(`/restaurant/restaurantMenuGroups/${id}/delete`);
    },
    openDeleteRestaurantMenuGroupsDialog: () => {
      history.push(
        `/restaurant/restaurantMenuGroups/deleteRestaurantMenuGroups`
      );
    },
    openFetchRestaurantMenuGroupsDialog: () => {
      history.push(`/restaurant/restaurantMenuGroups/fetch`);
    },
    openUpdateRestaurantMenuGroupsStatusDialog: () => {
      history.push("/restaurant/restaurantMenuGroups/updateStatus");
    },
  };

  return (
    <RestaurantMenuGroupsUIProvider
      restaurantMenuGroupsUIEvents={restaurantMenuGroupsUIEvents}
    >
      <RestaurantMenuGroupsLoadingDialog />
      <Route path="/restaurant/restaurantMenuGroups/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuGroupDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantMenuGroups");
            }}
          />
        )}
      </Route>
      <RestaurantMenuGroupsCard />
    </RestaurantMenuGroupsUIProvider>
  );
}
