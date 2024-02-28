import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantModel } from "../../../../../core/_models/Restaurant/RestaurantModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantsUIContext = createContext();

export function useRestaurantsUIContext() {
  return useContext(RestaurantsUIContext);
}

export const RestaurantsUIConsumer = RestaurantsUIContext.Consumer;

export function RestaurantsUIProvider({ restaurantsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantModel).initialFilter
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
    dataModel: RestaurantModel,
    newRestaurantButtonClick: restaurantsUIEvents.newRestaurantButtonClick,
    openEditRestaurantPage: restaurantsUIEvents.openEditRestaurantPage,
    openDeleteRestaurantDialog: restaurantsUIEvents.openDeleteRestaurantDialog,
    openDeleteRestaurantsDialog:
      restaurantsUIEvents.openDeleteRestaurantsDialog,
    openFetchRestaurantsDialog: restaurantsUIEvents.openFetchRestaurantsDialog,
    openUpdateRestaurantsStatusDialog:
      restaurantsUIEvents.openUpdateRestaurantsStatusDialog,
  };
  return (
    <RestaurantsUIContext.Provider value={value}>
      {children}
    </RestaurantsUIContext.Provider>
  );
}
