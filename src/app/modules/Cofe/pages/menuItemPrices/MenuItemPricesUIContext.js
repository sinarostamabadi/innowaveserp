import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuItemPriceModel } from "../../../../../core/_models/Cofe/MenuItemPriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuItemPricesUIContext = createContext();

export function useMenuItemPricesUIContext() {
  return useContext(MenuItemPricesUIContext);
}

export const MenuItemPricesUIConsumer = MenuItemPricesUIContext.Consumer;

export function MenuItemPricesUIProvider({ menuItemPricesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuItemPriceModel).initialFilter
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
    dataModel: MenuItemPriceModel,
    newMenuItemPriceButtonClick:
      menuItemPricesUIEvents.newMenuItemPriceButtonClick,
    openEditMenuItemPricePage: menuItemPricesUIEvents.openEditMenuItemPricePage,
    openDeleteMenuItemPriceDialog:
      menuItemPricesUIEvents.openDeleteMenuItemPriceDialog,
    openDeleteMenuItemPricesDialog:
      menuItemPricesUIEvents.openDeleteMenuItemPricesDialog,
    openFetchMenuItemPricesDialog:
      menuItemPricesUIEvents.openFetchMenuItemPricesDialog,
    openUpdateMenuItemPricesStatusDialog:
      menuItemPricesUIEvents.openUpdateMenuItemPricesStatusDialog,
  };
  return (
    <MenuItemPricesUIContext.Provider value={value}>
      {children}
    </MenuItemPricesUIContext.Provider>
  );
}
