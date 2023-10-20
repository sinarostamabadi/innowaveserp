import React from "react";
import { Route } from "react-router-dom";
import { RestaurantInvoiceDiscountsLoadingDialog } from "./restaurantInvoiceDiscounts-loading-dialog/RestaurantInvoiceDiscountsLoadingDialog";
import { RestaurantInvoiceDiscountDeleteDialog } from "./restaurantInvoiceDiscount-delete-dialog/RestaurantInvoiceDiscountDeleteDialog";
import { RestaurantInvoiceDiscountsCard } from "./RestaurantInvoiceDiscountsCard";
import { RestaurantInvoiceDiscountsUIProvider } from "./RestaurantInvoiceDiscountsUIContext";

export function RestaurantInvoiceDiscountsPage({ history }) {
  const restaurantInvoiceDiscountsUIEvents = {
    newRestaurantInvoiceDiscountButtonClick: () => {
      history.push("/restaurant/restaurantInvoiceDiscounts/new");
    },
    openEditRestaurantInvoiceDiscountPage: (id) => {
      history.push(`/restaurant/restaurantInvoiceDiscounts/${id}/edit`);
    },
    openDeleteRestaurantInvoiceDiscountDialog: (id) => {
      history.push(`/restaurant/restaurantInvoiceDiscounts/${id}/delete`);
    },
    openDeleteRestaurantInvoiceDiscountsDialog: () => {
      history.push(`/restaurant/restaurantInvoiceDiscounts/deleteRestaurantInvoiceDiscounts`);
    },
    openFetchRestaurantInvoiceDiscountsDialog: () => {
      history.push(`/restaurant/restaurantInvoiceDiscounts/fetch`);
    },
    openUpdateRestaurantInvoiceDiscountsStatusDialog: () => {
      history.push("/restaurant/restaurantInvoiceDiscounts/updateStatus");
    },
  };
  
  return (
    <RestaurantInvoiceDiscountsUIProvider restaurantInvoiceDiscountsUIEvents={restaurantInvoiceDiscountsUIEvents}>
      <RestaurantInvoiceDiscountsLoadingDialog />
      <Route path="/restaurant/restaurantInvoiceDiscounts/:id/delete">
        {({ history, match }) => (
          <RestaurantInvoiceDiscountDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantInvoiceDiscounts");
            }}
          />
        )}
      </Route>
      <RestaurantInvoiceDiscountsCard />
    </RestaurantInvoiceDiscountsUIProvider>
  );
}