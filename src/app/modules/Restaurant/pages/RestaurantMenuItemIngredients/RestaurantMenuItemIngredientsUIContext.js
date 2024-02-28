import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuItemIngredientModel } from "../../../../../core/_models/Restaurant/RestaurantMenuItemIngredientModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantMenuItemIngredientsUIContext = createContext();

export function useRestaurantMenuItemIngredientsUIContext() {
  return useContext(RestaurantMenuItemIngredientsUIContext);
}

export const RestaurantMenuItemIngredientsUIConsumer =
  RestaurantMenuItemIngredientsUIContext.Consumer;

export function RestaurantMenuItemIngredientsUIProvider({
  restaurantMenuItemIngredientsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantMenuItemIngredientModel).initialFilter
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
    dataModel: RestaurantMenuItemIngredientModel,
    newRestaurantMenuItemIngredientButtonClick:
      restaurantMenuItemIngredientsUIEvents.newRestaurantMenuItemIngredientButtonClick,
    openEditRestaurantMenuItemIngredientPage:
      restaurantMenuItemIngredientsUIEvents.openEditRestaurantMenuItemIngredientPage,
    openDeleteRestaurantMenuItemIngredientDialog:
      restaurantMenuItemIngredientsUIEvents.openDeleteRestaurantMenuItemIngredientDialog,
    openDeleteRestaurantMenuItemIngredientsDialog:
      restaurantMenuItemIngredientsUIEvents.openDeleteRestaurantMenuItemIngredientsDialog,
    openFetchRestaurantMenuItemIngredientsDialog:
      restaurantMenuItemIngredientsUIEvents.openFetchRestaurantMenuItemIngredientsDialog,
    openUpdateRestaurantMenuItemIngredientsStatusDialog:
      restaurantMenuItemIngredientsUIEvents.openUpdateRestaurantMenuItemIngredientsStatusDialog,
  };
  return (
    <RestaurantMenuItemIngredientsUIContext.Provider value={value}>
      {children}
    </RestaurantMenuItemIngredientsUIContext.Provider>
  );
}
