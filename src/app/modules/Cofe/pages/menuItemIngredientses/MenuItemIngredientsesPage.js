import React from "react";
import { Route } from "react-router-dom";
import { MenuItemIngredientsesLoadingDialog } from "./menuItemIngredientses-loading-dialog/MenuItemIngredientsesLoadingDialog";
import { MenuItemIngredientsDeleteDialog } from "./menuItemIngredients-delete-dialog/MenuItemIngredientsDeleteDialog";
import { MenuItemIngredientsesCard } from "./MenuItemIngredientsesCard";
import { MenuItemIngredientsesUIProvider } from "./MenuItemIngredientsesUIContext";

export function MenuItemIngredientsesPage({ history }) {
  const menuItemIngredientsesUIEvents = {
    newMenuItemIngredientsButtonClick: () => {
      history.push("/cofe/menuItemIngredientses/new");
    },
    openEditMenuItemIngredientsPage: (id) => {
      history.push(`/cofe/menuItemIngredientses/${id}/edit`);
    },
    openDeleteMenuItemIngredientsDialog: (id) => {
      history.push(`/cofe/menuItemIngredientses/${id}/delete`);
    },
    openDeleteMenuItemIngredientsesDialog: () => {
      history.push(`/cofe/menuItemIngredientses/deleteMenuItemIngredientses`);
    },
    openFetchMenuItemIngredientsesDialog: () => {
      history.push(`/cofe/menuItemIngredientses/fetch`);
    },
    openUpdateMenuItemIngredientsesStatusDialog: () => {
      history.push("/cofe/menuItemIngredientses/updateStatus");
    },
  };

  return (
    <MenuItemIngredientsesUIProvider
      menuItemIngredientsesUIEvents={menuItemIngredientsesUIEvents}
    >
      <MenuItemIngredientsesLoadingDialog />
      <Route path="/cofe/menuItemIngredientses/:id/delete">
        {({ history, match }) => (
          <MenuItemIngredientsDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/cofe/menuItemIngredientses");
            }}
          />
        )}
      </Route>
      <MenuItemIngredientsesCard />
    </MenuItemIngredientsesUIProvider>
  );
}
