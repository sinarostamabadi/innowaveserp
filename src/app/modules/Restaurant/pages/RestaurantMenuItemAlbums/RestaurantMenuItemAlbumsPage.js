import React from "react";
import { Route } from "react-router-dom";
import { RestaurantMenuItemAlbumsLoadingDialog } from "./restaurantMenuItemAlbums-loading-dialog/RestaurantMenuItemAlbumsLoadingDialog";
import { RestaurantMenuItemAlbumDeleteDialog } from "./restaurantMenuItemAlbum-delete-dialog/RestaurantMenuItemAlbumDeleteDialog";
import { RestaurantMenuItemAlbumsCard } from "./RestaurantMenuItemAlbumsCard";
import { RestaurantMenuItemAlbumsUIProvider } from "./RestaurantMenuItemAlbumsUIContext";

export function RestaurantMenuItemAlbumsPage({ history }) {
  const restaurantMenuItemAlbumsUIEvents = {
    newRestaurantMenuItemAlbumButtonClick: () => {
      history.push("/restaurant/restaurantMenuItemAlbums/new");
    },
    openEditRestaurantMenuItemAlbumPage: (id) => {
      history.push(`/restaurant/restaurantMenuItemAlbums/${id}/edit`);
    },
    openDeleteRestaurantMenuItemAlbumDialog: (id) => {
      history.push(`/restaurant/restaurantMenuItemAlbums/${id}/delete`);
    },
    openDeleteRestaurantMenuItemAlbumsDialog: () => {
      history.push(
        `/restaurant/restaurantMenuItemAlbums/deleteRestaurantMenuItemAlbums`
      );
    },
    openFetchRestaurantMenuItemAlbumsDialog: () => {
      history.push(`/restaurant/restaurantMenuItemAlbums/fetch`);
    },
    openUpdateRestaurantMenuItemAlbumsStatusDialog: () => {
      history.push("/restaurant/restaurantMenuItemAlbums/updateStatus");
    },
  };

  return (
    <RestaurantMenuItemAlbumsUIProvider
      restaurantMenuItemAlbumsUIEvents={restaurantMenuItemAlbumsUIEvents}
    >
      <RestaurantMenuItemAlbumsLoadingDialog />
      <Route path="/restaurant/restaurantMenuItemAlbums/:id/delete">
        {({ history, match }) => (
          <RestaurantMenuItemAlbumDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/restaurant/restaurantMenuItemAlbums");
            }}
          />
        )}
      </Route>
      <RestaurantMenuItemAlbumsCard />
    </RestaurantMenuItemAlbumsUIProvider>
  );
}
