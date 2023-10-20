
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuItemIngredientsModel } from "../../../../../core/_models/Cofe/MenuItemIngredientsModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuItemIngredientsesUIContext = createContext();

export function useMenuItemIngredientsesUIContext() {
  return useContext(MenuItemIngredientsesUIContext);
}

export const MenuItemIngredientsesUIConsumer = MenuItemIngredientsesUIContext.Consumer;

export function MenuItemIngredientsesUIProvider({ menuItemIngredientsesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuItemIngredientsModel).initialFilter
  );

  const [ids, setIds] = useState([]);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }
      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }
      return nextQueryParams;
    });
  }, []);
  
  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: MenuItemIngredientsModel,
    newMenuItemIngredientsButtonClick: menuItemIngredientsesUIEvents.newMenuItemIngredientsButtonClick,
    openEditMenuItemIngredientsPage: menuItemIngredientsesUIEvents.openEditMenuItemIngredientsPage,
    openDeleteMenuItemIngredientsDialog: menuItemIngredientsesUIEvents.openDeleteMenuItemIngredientsDialog,
    openDeleteMenuItemIngredientsesDialog: menuItemIngredientsesUIEvents.openDeleteMenuItemIngredientsesDialog,
    openFetchMenuItemIngredientsesDialog: menuItemIngredientsesUIEvents.openFetchMenuItemIngredientsesDialog,
    openUpdateMenuItemIngredientsesStatusDialog: menuItemIngredientsesUIEvents.openUpdateMenuItemIngredientsesStatusDialog,
  };
  return (
    <MenuItemIngredientsesUIContext.Provider value={value}>{children}</MenuItemIngredientsesUIContext.Provider>
  );
}