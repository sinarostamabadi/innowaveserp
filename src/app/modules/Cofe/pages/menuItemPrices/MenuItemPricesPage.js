import React from "react";
import { Route } from "react-router-dom";
import { MenuItemPricesLoadingDialog } from "./menuItemPrices-loading-dialog/MenuItemPricesLoadingDialog";
import { MenuItemPriceDeleteDialog } from "./menuItemPrice-delete-dialog/MenuItemPriceDeleteDialog";
import { MenuItemPricesCard } from "./MenuItemPricesCard";
import { MenuItemPricesUIProvider } from "./MenuItemPricesUIContext";

export function MenuItemPricesPage({ history }) {
  const menuItemPricesUIEvents = {
    newMenuItemPriceButtonClick: () => {
      history.push("/cofe/menuItemPrices/new");
    },
    openEditMenuItemPricePage: (id) => {
      history.push(`/cofe/menuItemPrices/${id}/edit`);
    },
    openDeleteMenuItemPriceDialog: (id) => {
      history.push(`/cofe/menuItemPrices/${id}/delete`);
    },
    openDeleteMenuItemPricesDialog: () => {
      history.push(`/cofe/menuItemPrices/deleteMenuItemPrices`);
    },
    openFetchMenuItemPricesDialog: () => {
      history.push(`/cofe/menuItemPrices/fetch`);
    },
    openUpdateMenuItemPricesStatusDialog: () => {
      history.push("/cofe/menuItemPrices/updateStatus");
    },
  };

  return (
    <MenuItemPricesUIProvider menuItemPricesUIEvents={menuItemPricesUIEvents}>
      <MenuItemPricesLoadingDialog />
      <Route path="/cofe/menuItemPrices/:id/delete">
        {({ history, match }) => (
          <MenuItemPriceDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuItemPrices");
            }}
          />
        )}
      </Route>
      <MenuItemPricesCard />
    </MenuItemPricesUIProvider>
  );
}
