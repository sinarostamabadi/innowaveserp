import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuItemModel } from "../../../../../core/_models/Cofe/MenuItemModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuItemsUIContext = createContext();

export function useMenuItemsUIContext() {
  return useContext(MenuItemsUIContext);
}

export const MenuItemsUIConsumer = MenuItemsUIContext.Consumer;

export function MenuItemsUIProvider({ menuItemsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuItemModel).initialFilter
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
    dataModel: MenuItemModel,
    newMenuItemButtonClick: menuItemsUIEvents.newMenuItemButtonClick,
    openEditMenuItemPage: menuItemsUIEvents.openEditMenuItemPage,
    openDeleteMenuItemDialog: menuItemsUIEvents.openDeleteMenuItemDialog,
    openDeleteMenuItemsDialog: menuItemsUIEvents.openDeleteMenuItemsDialog,
    openFetchMenuItemsDialog: menuItemsUIEvents.openFetchMenuItemsDialog,
    openUpdateMenuItemsStatusDialog:
      menuItemsUIEvents.openUpdateMenuItemsStatusDialog,
  };
  return (
    <MenuItemsUIContext.Provider value={value}>
      {children}
    </MenuItemsUIContext.Provider>
  );
}
