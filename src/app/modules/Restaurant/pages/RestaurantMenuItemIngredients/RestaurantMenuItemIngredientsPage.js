import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuItemIngredientsLoadingDialog } from "./restaurantMenuItemIngredients-loading-dialog/RestaurantMenuItemIngredientsLoadingDialog";
import { RestaurantMenuItemIngredientDeleteDialog } from "./restaurantMenuItemIngredient-delete-dialog/RestaurantMenuItemIngredientDeleteDialog";
import { RestaurantMenuItemIngredientsCard } from "./RestaurantMenuItemIngredientsCard";
import { RestaurantMenuItemIngredientsUIProvider } from "./RestaurantMenuItemIngredientsUIContext";

export function RestaurantMenuItemIngredientsPage({ history }) {
  const restaurantMenuItemIngredientsUIEvents = {
    newRestaurantMenuItemIngredientButtonClick: () => {
      history.push("/restaurant/restaurantMenuItemIngredients/new");
    },
    openEditRestaurantMenuItemIngredientPage: (id) => {
      history.push(`/restaurant/restaurantMenuItemIngredients/${id}/edit`);
    },
    openDeleteRestaurantMenuItemIngredientDialog: (id) => {
      history.push(`/restaurant/restaurantMenuItemIngredients/${id}/delete`);
    },
    openDeleteRestaurantMenuItemIngredientsDialog: () => {
      history.push(`/restaurant/restaurantMenuItemIngredients/deleteRestaurantMenuItemIngredients`);
    },
    openFetchRestaurantMenuItemIngredientsDialog: () => {
      history.push(`/restaurant/restaurantMenuItemIngredients/fetch`);
    },
    openUpdateRestaurantMenuItemIngredientsStatusDialog: () => {
      history.push("/restaurant/restaurantMenuItemIngredients/updateStatus");
    },
  };
  
  return (
    <RestaurantMenuItemIngredientsUIProvider restaurantMenuItemIngredientsUIEvents={restaurantMenuItemIngredientsUIEvents}>
      <RestaurantMenuItemIngredientsLoadingDialog />
      <Route path="/restaurant/restaurantMenuItemIngredients/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuItemIngredientDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantMenuItemIngredients");
            }}
          />
        )}
      </Route>
      <RestaurantMenuItemIngredientsCard />
    </RestaurantMenuItemIngredientsUIProvider>
  );
}