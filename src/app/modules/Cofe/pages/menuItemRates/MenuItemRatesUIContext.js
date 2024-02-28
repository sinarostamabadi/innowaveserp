import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuItemRateModel } from "../../../../../core/_models/Cofe/MenuItemRateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuItemRatesUIContext = createContext();

export function useMenuItemRatesUIContext() {
  return useContext(MenuItemRatesUIContext);
}

export const MenuItemRatesUIConsumer = MenuItemRatesUIContext.Consumer;

export function MenuItemRatesUIProvider({ menuItemRatesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuItemRateModel).initialFilter
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
    dataModel: MenuItemRateModel,
    newMenuItemRateButtonClick:
      menuItemRatesUIEvents.newMenuItemRateButtonClick,
    openEditMenuItemRatePage: menuItemRatesUIEvents.openEditMenuItemRatePage,
    openDeleteMenuItemRateDialog:
      menuItemRatesUIEvents.openDeleteMenuItemRateDialog,
    openDeleteMenuItemRatesDialog:
      menuItemRatesUIEvents.openDeleteMenuItemRatesDialog,
    openFetchMenuItemRatesDialog:
      menuItemRatesUIEvents.openFetchMenuItemRatesDialog,
    openUpdateMenuItemRatesStatusDialog:
      menuItemRatesUIEvents.openUpdateMenuItemRatesStatusDialog,
  };
  return (
    <MenuItemRatesUIContext.Provider value={value}>
      {children}
    </MenuItemRatesUIContext.Provider>
  );
}
