import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeShopModel } from "../../../../../core/_models/General/CoffeeShopModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeShopsUIContext = createContext();

export function useCoffeeShopsUIContext() {
  return useContext(CoffeeShopsUIContext);
}

export const CoffeeShopsUIConsumer = CoffeeShopsUIContext.Consumer;

export function CoffeeShopsUIProvider({ coffeeShopsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeShopModel).initialFilter
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
    dataModel: CoffeeShopModel,
    newCoffeeShopButtonClick: coffeeShopsUIEvents.newCoffeeShopButtonClick,
    openEditCoffeeShopPage: coffeeShopsUIEvents.openEditCoffeeShopPage,
    openDeleteCoffeeShopDialog: coffeeShopsUIEvents.openDeleteCoffeeShopDialog,
    openDeleteCoffeeShopsDialog: coffeeShopsUIEvents.openDeleteCoffeeShopsDialog,
    openFetchCoffeeShopsDialog: coffeeShopsUIEvents.openFetchCoffeeShopsDialog,
    openUpdateCoffeeShopsStatusDialog: coffeeShopsUIEvents.openUpdateCoffeeShopsStatusDialog,
  };
  return (
    <CoffeeShopsUIContext.Provider value={value}>{children}</CoffeeShopsUIContext.Provider>
  );
}
