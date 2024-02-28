import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RestaurantMenuItemAlbumModel } from "../../../../../core/_models/Restaurant/RestaurantMenuItemAlbumModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RestaurantMenuItemAlbumsUIContext = createContext();

export function useRestaurantMenuItemAlbumsUIContext() {
  return useContext(RestaurantMenuItemAlbumsUIContext);
}

export const RestaurantMenuItemAlbumsUIConsumer =
  RestaurantMenuItemAlbumsUIContext.Consumer;

export function RestaurantMenuItemAlbumsUIProvider({
  restaurantMenuItemAlbumsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RestaurantMenuItemAlbumModel).initialFilter
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
    dataModel: RestaurantMenuItemAlbumModel,
    newRestaurantMenuItemAlbumButtonClick:
      restaurantMenuItemAlbumsUIEvents.newRestaurantMenuItemAlbumButtonClick,
    openEditRestaurantMenuItemAlbumPage:
      restaurantMenuItemAlbumsUIEvents.openEditRestaurantMenuItemAlbumPage,
    openDeleteRestaurantMenuItemAlbumDialog:
      restaurantMenuItemAlbumsUIEvents.openDeleteRestaurantMenuItemAlbumDialog,
    openDeleteRestaurantMenuItemAlbumsDialog:
      restaurantMenuItemAlbumsUIEvents.openDeleteRestaurantMenuItemAlbumsDialog,
    openFetchRestaurantMenuItemAlbumsDialog:
      restaurantMenuItemAlbumsUIEvents.openFetchRestaurantMenuItemAlbumsDialog,
    openUpdateRestaurantMenuItemAlbumsStatusDialog:
      restaurantMenuItemAlbumsUIEvents.openUpdateRestaurantMenuItemAlbumsStatusDialog,
  };
  return (
    <RestaurantMenuItemAlbumsUIContext.Provider value={value}>
      {children}
    </RestaurantMenuItemAlbumsUIContext.Provider>
  );
}
