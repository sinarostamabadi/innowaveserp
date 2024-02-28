import React from "react";
import { Route } from "react-router-dom";
import { MenuItemAlbumsLoadingDialog } from "./menuItemAlbums-loading-dialog/MenuItemAlbumsLoadingDialog";
import { MenuItemAlbumDeleteDialog } from "./menuItemAlbum-delete-dialog/MenuItemAlbumDeleteDialog";
import { MenuItemAlbumsCard } from "./MenuItemAlbumsCard";
import { MenuItemAlbumsUIProvider } from "./MenuItemAlbumsUIContext";

export function MenuItemAlbumsPage({ history }) {
  const menuItemAlbumsUIEvents = {
    newMenuItemAlbumButtonClick: () => {
      history.push("/cofe/menuItemAlbums/new");
    },
    openEditMenuItemAlbumPage: (id) => {
      history.push(`/cofe/menuItemAlbums/${id}/edit`);
    },
    openDeleteMenuItemAlbumDialog: (id) => {
      history.push(`/cofe/menuItemAlbums/${id}/delete`);
    },
    openDeleteMenuItemAlbumsDialog: () => {
      history.push(`/cofe/menuItemAlbums/deleteMenuItemAlbums`);
    },
    openFetchMenuItemAlbumsDialog: () => {
      history.push(`/cofe/menuItemAlbums/fetch`);
    },
    openUpdateMenuItemAlbumsStatusDialog: () => {
      history.push("/cofe/menuItemAlbums/updateStatus");
    },
  };

  return (
    <MenuItemAlbumsUIProvider menuItemAlbumsUIEvents={menuItemAlbumsUIEvents}>
      <MenuItemAlbumsLoadingDialog />
      <Route path="/cofe/menuItemAlbums/:id/delete">
        {({ history, match }) => (
          <MenuItemAlbumDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuItemAlbums");
            }}
          />
        )}
      </Route>
      <MenuItemAlbumsCard />
    </MenuItemAlbumsUIProvider>
  );
}
