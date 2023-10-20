
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantDiscountTypeModel } from "../../../../../core/_models/Restaurant/RestaurantDiscountTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { getStorage } from "../../../../../core/_helpers";

const RestaurantDiscountTypesUIContext = createContext();

export function useRestaurantDiscountTypesUIContext() {
  return useContext(RestaurantDiscountTypesUIContext);
}

export const RestaurantDiscountTypesUIConsumer = RestaurantDiscountTypesUIContext.Consumer;

export function RestaurantDiscountTypesUIProvider({ restaurantDiscountTypesUIEvents, children }) {
  const defaultRestaurant = !!getStorage("defaultRestaurant")
  ? JSON.parse(getStorage("defaultRestaurant"))
  : null;
  const defaultFilter = {
    Property: "RestaurantId",
    Operation: 5,
    Values: [!!defaultRestaurant? defaultRestaurant.RestaurantId: null],
  };

  const [queryParams, setQueryParamsBase] = useState(
    !!defaultRestaurant
    ? {
        ...getConfig(RestaurantDiscountTypeModel).initialFilter,
        Filters: [defaultFilter],
      }
    : getConfig(RestaurantDiscountTypeModel).initialFilter
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
    dataModel: RestaurantDiscountTypeModel,
    newRestaurantDiscountTypeButtonClick: restaurantDiscountTypesUIEvents.newRestaurantDiscountTypeButtonClick,
    openEditRestaurantDiscountTypePage: restaurantDiscountTypesUIEvents.openEditRestaurantDiscountTypePage,
    openDeleteRestaurantDiscountTypeDialog: restaurantDiscountTypesUIEvents.openDeleteRestaurantDiscountTypeDialog,
    openDeleteRestaurantDiscountTypesDialog: restaurantDiscountTypesUIEvents.openDeleteRestaurantDiscountTypesDialog,
    openFetchRestaurantDiscountTypesDialog: restaurantDiscountTypesUIEvents.openFetchRestaurantDiscountTypesDialog,
    openUpdateRestaurantDiscountTypesStatusDialog: restaurantDiscountTypesUIEvents.openUpdateRestaurantDiscountTypesStatusDialog,
  };
  return (
    <RestaurantDiscountTypesUIContext.Provider value={value}>{children}</RestaurantDiscountTypesUIContext.Provider>
  );
}