import React from "react";
import { Route } from "react-router-dom";
import { MenuItemsLoadingDialog } from "./menuItems-loading-dialog/MenuItemsLoadingDialog";
import { MenuItemDeleteDialog } from "./menuItem-delete-dialog/MenuItemDeleteDialog";
import { MenuItemsCard } from "./MenuItemsCard";
import { MenuItemsUIProvider } from "./MenuItemsUIContext";

export function MenuItemsPage({ history }) {
  const menuItemsUIEvents = {
    newMenuItemButtonClick: () => {
      history.push("/cofe/menuItems/new");
    },
    openEditMenuItemPage: (id) => {
      history.push(`/cofe/menuItems/${id}/edit`);
    },
    openDeleteMenuItemDialog: (id) => {
      history.push(`/cofe/menuItems/${id}/delete`);
    },
    openDeleteMenuItemsDialog: () => {
      history.push(`/cofe/menuItems/deleteMenuItems`);
    },
    openFetchMenuItemsDialog: () => {
      history.push(`/cofe/menuItems/fetch`);
    },
    openUpdateMenuItemsStatusDialog: () => {
      history.push("/cofe/menuItems/updateStatus");
    },
  };

  return (
    <MenuItemsUIProvider menuItemsUIEvents={menuItemsUIEvents}>
      <MenuItemsLoadingDialog />
      <Route path="/cofe/menuItems/:id/delete">
        {({ history, match }) => (
          <MenuItemDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuItems");
            }}
          />
        )}
      </Route>
      <MenuItemsCard />
    </MenuItemsUIProvider>
  );
}
