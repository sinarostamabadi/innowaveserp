
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuGroupModel } from "../../../../../core/_models/Restaurant/RestaurantMenuGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantMenuGroupsUIContext = createContext();

export function useRestaurantMenuGroupsUIContext() {
  return useContext(RestaurantMenuGroupsUIContext);
}

export const RestaurantMenuGroupsUIConsumer = RestaurantMenuGroupsUIContext.Consumer;

export function RestaurantMenuGroupsUIProvider({ restaurantMenuGroupsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantMenuGroupModel).initialFilter
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
    dataModel: RestaurantMenuGroupModel,
    newRestaurantMenuGroupButtonClick: restaurantMenuGroupsUIEvents.newRestaurantMenuGroupButtonClick,
    openEditRestaurantMenuGroupPage: restaurantMenuGroupsUIEvents.openEditRestaurantMenuGroupPage,
    openDeleteRestaurantMenuGroupDialog: restaurantMenuGroupsUIEvents.openDeleteRestaurantMenuGroupDialog,
    openDeleteRestaurantMenuGroupsDialog: restaurantMenuGroupsUIEvents.openDeleteRestaurantMenuGroupsDialog,
    openFetchRestaurantMenuGroupsDialog: restaurantMenuGroupsUIEvents.openFetchRestaurantMenuGroupsDialog,
    openUpdateRestaurantMenuGroupsStatusDialog: restaurantMenuGroupsUIEvents.openUpdateRestaurantMenuGroupsStatusDialog,
  };
  return (
    <RestaurantMenuGroupsUIContext.Provider value={value}>{children}</RestaurantMenuGroupsUIContext.Provider>
  );
}