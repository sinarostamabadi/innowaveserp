import React from "react";
import { Route } from "react-router-dom";
import { RestaurantDiscountTypesLoadingDialog } from "./RestaurantDiscountTypes-loading-dialog/RestaurantDiscountTypesLoadingDialog";
import { RestaurantDiscountTypeDeleteDialog } from "./RestaurantDiscountType-delete-dialog/RestaurantDiscountTypeDeleteDialog";
import { RestaurantDiscountTypesCard } from "./RestaurantDiscountTypesCard";
import { RestaurantDiscountTypesUIProvider } from "./RestaurantDiscountTypesUIContext";

export function RestaurantDiscountTypesPage({ history }) {
  const restaurantDiscountTypesUIEvents = {
    newRestaurantDiscountTypeButtonClick: () => {
      history.push("/restaurant/restaurantDiscountTypes/new");
    },
    openEditRestaurantDiscountTypePage: (id) => {
      history.push(`/restaurant/restaurantDiscountTypes/${id}/edit`);
    },
    openDeleteRestaurantDiscountTypeDialog: (id) => {
      history.push(`/restaurant/restaurantDiscountTypes/${id}/delete`);
    },
    openDeleteRestaurantDiscountTypesDialog: () => {
      history.push(
        `/restaurant/restaurantDiscountTypes/deleteRestaurantDiscountTypes`
      );
    },
    openFetchRestaurantDiscountTypesDialog: () => {
      history.push(`/restaurant/restaurantDiscountTypes/fetch`);
    },
    openUpdateRestaurantDiscountTypesStatusDialog: () => {
      history.push("/restaurant/restaurantDiscountTypes/updateStatus");
    },
  };

  return (
    <RestaurantDiscountTypesUIProvider
      restaurantDiscountTypesUIEvents={restaurantDiscountTypesUIEvents}
    >
      <RestaurantDiscountTypesLoadingDialog />
      <Route path="/restaurant/restaurantDiscountTypes/:id/delete">
        {({ history, match }) => (
          <RestaurantDiscountTypeDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantDiscountTypes");
            }}
          />
        )}
      </Route>
      <RestaurantDiscountTypesCard />
    </RestaurantDiscountTypesUIProvider>
  );
}
