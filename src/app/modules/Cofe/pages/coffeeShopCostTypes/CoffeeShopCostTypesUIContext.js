import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeShopCostTypeModel } from "../../../../../core/_models/Cofe/CoffeeShopCostTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeShopCostTypesUIContext = createContext();

export function useCoffeeShopCostTypesUIContext() {
  return useContext(CoffeeShopCostTypesUIContext);
}

export const CoffeeShopCostTypesUIConsumer =
  CoffeeShopCostTypesUIContext.Consumer;

export function CoffeeShopCostTypesUIProvider({
  coffeeShopCostTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeShopCostTypeModel).initialFilter
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
    dataModel: CoffeeShopCostTypeModel,
    newCoffeeShopCostTypeButtonClick:
      coffeeShopCostTypesUIEvents.newCoffeeShopCostTypeButtonClick,
    openEditCoffeeShopCostTypePage:
      coffeeShopCostTypesUIEvents.openEditCoffeeShopCostTypePage,
    openDeleteCoffeeShopCostTypeDialog:
      coffeeShopCostTypesUIEvents.openDeleteCoffeeShopCostTypeDialog,
    openDeleteCoffeeShopCostTypesDialog:
      coffeeShopCostTypesUIEvents.openDeleteCoffeeShopCostTypesDialog,
    openFetchCoffeeShopCostTypesDialog:
      coffeeShopCostTypesUIEvents.openFetchCoffeeShopCostTypesDialog,
    openUpdateCoffeeShopCostTypesStatusDialog:
      coffeeShopCostTypesUIEvents.openUpdateCoffeeShopCostTypesStatusDialog,
  };
  return (
    <CoffeeShopCostTypesUIContext.Provider value={value}>
      {children}
    </CoffeeShopCostTypesUIContext.Provider>
  );
}
