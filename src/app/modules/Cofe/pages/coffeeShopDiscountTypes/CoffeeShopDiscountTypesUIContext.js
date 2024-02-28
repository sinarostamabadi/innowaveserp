import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CoffeeShopDiscountTypeModel } from "../../../../../core/_models/Cofe/CoffeeShopDiscountTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const CoffeeShopDiscountTypesUIContext = createContext();

export function useCoffeeShopDiscountTypesUIContext() {
  return useContext(CoffeeShopDiscountTypesUIContext);
}

export const CoffeeShopDiscountTypesUIConsumer =
  CoffeeShopDiscountTypesUIContext.Consumer;

export function CoffeeShopDiscountTypesUIProvider({
  coffeeShopDiscountTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CoffeeShopDiscountTypeModel).initialFilter
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
    dataModel: CoffeeShopDiscountTypeModel,
    newCoffeeShopDiscountTypeButtonClick:
      coffeeShopDiscountTypesUIEvents.newCoffeeShopDiscountTypeButtonClick,
    openEditCoffeeShopDiscountTypePage:
      coffeeShopDiscountTypesUIEvents.openEditCoffeeShopDiscountTypePage,
    openDeleteCoffeeShopDiscountTypeDialog:
      coffeeShopDiscountTypesUIEvents.openDeleteCoffeeShopDiscountTypeDialog,
    openDeleteCoffeeShopDiscountTypesDialog:
      coffeeShopDiscountTypesUIEvents.openDeleteCoffeeShopDiscountTypesDialog,
    openFetchCoffeeShopDiscountTypesDialog:
      coffeeShopDiscountTypesUIEvents.openFetchCoffeeShopDiscountTypesDialog,
    openUpdateCoffeeShopDiscountTypesStatusDialog:
      coffeeShopDiscountTypesUIEvents.openUpdateCoffeeShopDiscountTypesStatusDialog,
  };
  return (
    <CoffeeShopDiscountTypesUIContext.Provider value={value}>
      {children}
    </CoffeeShopDiscountTypesUIContext.Provider>
  );
}
