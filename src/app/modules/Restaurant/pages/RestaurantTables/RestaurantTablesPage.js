import React from "react";
import { Route } from "react-router-dom";
import { RestaurantTablesLoadingDialog } from "./restaurantTables-loading-dialog/RestaurantTablesLoadingDialog";
import { RestaurantTableDeleteDialog } from "./restaurantTable-delete-dialog/RestaurantTableDeleteDialog";
import { RestaurantTablesCard } from "./RestaurantTablesCard";
import { RestaurantTablesUIProvider } from "./RestaurantTablesUIContext";

export function RestaurantTablesPage({ history }) {
  const restaurantTablesUIEvents = {
    newRestaurantTableButtonClick: () => {
      history.push("/restaurant/restaurantTables/new");
    },
    openEditRestaurantTablePage: (id) => {
      history.push(`/restaurant/restaurantTables/${id}/edit`);
    },
    openDeleteRestaurantTableDialog: (id) => {
      history.push(`/restaurant/restaurantTables/${id}/delete`);
    },
    openDeleteRestaurantTablesDialog: () => {
      history.push(`/restaurant/restaurantTables/deleteRestaurantTables`);
    },
    openFetchRestaurantTablesDialog: () => {
      history.push(`/restaurant/restaurantTables/fetch`);
    },
    openUpdateRestaurantTablesStatusDialog: () => {
      history.push("/restaurant/restaurantTables/updateStatus");
    },
  };

  return (
    <RestaurantTablesUIProvider
      restaurantTablesUIEvents={restaurantTablesUIEvents}
    >
      <RestaurantTablesLoadingDialog />
      <Route path="/restaurant/restaurantTables/:id/delete">
        {({ history, match }) => (
          <RestaurantTableDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantTables");
            }}
          />
        )}
      </Route>
      <RestaurantTablesCard />
    </RestaurantTablesUIProvider>
  );
}
