
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuItemModel } from "../../../../../core/_models/Restaurant/RestaurantMenuItemModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { getStorage } from "../../../../../core/_helpers";

const RestaurantMenuItemsUIContext = createContext();

export function useRestaurantMenuItemsUIContext() {
  return useContext(RestaurantMenuItemsUIContext);
}

export const RestaurantMenuItemsUIConsumer = RestaurantMenuItemsUIContext.Consumer;

export function RestaurantMenuItemsUIProvider({ restaurantMenuItemsUIEvents, children }) {
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
        ...getConfig(RestaurantMenuItemModel).initialFilter,
        Filters: [defaultFilter],
      }
    : getConfig(RestaurantMenuItemModel).initialFilter
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
    dataModel: RestaurantMenuItemModel,
    newRestaurantMenuItemButtonClick: restaurantMenuItemsUIEvents.newRestaurantMenuItemButtonClick,
    openEditRestaurantMenuItemPage: restaurantMenuItemsUIEvents.openEditRestaurantMenuItemPage,
    openDeleteRestaurantMenuItemDialog: restaurantMenuItemsUIEvents.openDeleteRestaurantMenuItemDialog,
    openDeleteRestaurantMenuItemsDialog: restaurantMenuItemsUIEvents.openDeleteRestaurantMenuItemsDialog,
    openFetchRestaurantMenuItemsDialog: restaurantMenuItemsUIEvents.openFetchRestaurantMenuItemsDialog,
    openUpdateRestaurantMenuItemsStatusDialog: restaurantMenuItemsUIEvents.openUpdateRestaurantMenuItemsStatusDialog,
  };
  return (
    <RestaurantMenuItemsUIContext.Provider value={value}>{children}</RestaurantMenuItemsUIContext.Provider>
  );
}