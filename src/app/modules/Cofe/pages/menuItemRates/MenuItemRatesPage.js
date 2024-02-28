import React from "react";
import { Route } from "react-router-dom";
import { MenuItemRatesLoadingDialog } from "./menuItemRates-loading-dialog/MenuItemRatesLoadingDialog";
import { MenuItemRateDeleteDialog } from "./menuItemRate-delete-dialog/MenuItemRateDeleteDialog";
import { MenuItemRatesCard } from "./MenuItemRatesCard";
import { MenuItemRatesUIProvider } from "./MenuItemRatesUIContext";

export function MenuItemRatesPage({ history }) {
  const menuItemRatesUIEvents = {
    newMenuItemRateButtonClick: () => {
      history.push("/cofe/menuItemRates/new");
    },
    openEditMenuItemRatePage: (id) => {
      history.push(`/cofe/menuItemRates/${id}/edit`);
    },
    openDeleteMenuItemRateDialog: (id) => {
      history.push(`/cofe/menuItemRates/${id}/delete`);
    },
    openDeleteMenuItemRatesDialog: () => {
      history.push(`/cofe/menuItemRates/deleteMenuItemRates`);
    },
    openFetchMenuItemRatesDialog: () => {
      history.push(`/cofe/menuItemRates/fetch`);
    },
    openUpdateMenuItemRatesStatusDialog: () => {
      history.push("/cofe/menuItemRates/updateStatus");
    },
  };

  return (
    <MenuItemRatesUIProvider menuItemRatesUIEvents={menuItemRatesUIEvents}>
      <MenuItemRatesLoadingDialog />
      <Route path="/cofe/menuItemRates/:id/delete">
        {({ history, match }) => (
          <MenuItemRateDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuItemRates");
            }}
          />
        )}
      </Route>
      <MenuItemRatesCard />
    </MenuItemRatesUIProvider>
  );
}
