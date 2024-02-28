import React from "react";
import { Route } from "react-router-dom";
import { RestaurantCostTypesLoadingDialog } from "./restaurantCostTypes-loading-dialog/RestaurantCostTypesLoadingDialog";
import { RestaurantCostTypeDeleteDialog } from "./restaurantCostType-delete-dialog/RestaurantCostTypeDeleteDialog";
import { RestaurantCostTypesCard } from "./RestaurantCostTypesCard";
import { RestaurantCostTypesUIProvider } from "./RestaurantCostTypesUIContext";

export function RestaurantCostTypesPage({ history }) {
  const restaurantCostTypesUIEvents = {
    newRestaurantCostTypeButtonClick: () => {
      history.push("/restaurant/restaurantCostTypes/new");
    },
    openEditRestaurantCostTypePage: (id) => {
      history.push(`/restaurant/restaurantCostTypes/${id}/edit`);
    },
    openDeleteRestaurantCostTypeDialog: (id) => {
      history.push(`/restaurant/restaurantCostTypes/${id}/delete`);
    },
    openDeleteRestaurantCostTypesDialog: () => {
      history.push(`/restaurant/restaurantCostTypes/deleteRestaurantCostTypes`);
    },
    openFetchRestaurantCostTypesDialog: () => {
      history.push(`/restaurant/restaurantCostTypes/fetch`);
    },
    openUpdateRestaurantCostTypesStatusDialog: () => {
      history.push("/restaurant/restaurantCostTypes/updateStatus");
    },
  };

  return (
    <RestaurantCostTypesUIProvider
      restaurantCostTypesUIEvents={restaurantCostTypesUIEvents}
    >
      <RestaurantCostTypesLoadingDialog />
      <Route path="/restaurant/restaurantCostTypes/:id/delete">
        {({ history, match }) => (
          <RestaurantCostTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantCostTypes");
            }}
          />
        )}
      </Route>
      <RestaurantCostTypesCard />
    </RestaurantCostTypesUIProvider>
  );
}
