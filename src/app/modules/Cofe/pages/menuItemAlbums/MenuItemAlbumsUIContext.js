
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuItemAlbumModel } from "../../../../../core/_models/Cofe/MenuItemAlbumModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuItemAlbumsUIContext = createContext();

export function useMenuItemAlbumsUIContext() {
  return useContext(MenuItemAlbumsUIContext);
}

export const MenuItemAlbumsUIConsumer = MenuItemAlbumsUIContext.Consumer;

export function MenuItemAlbumsUIProvider({ menuItemAlbumsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuItemAlbumModel).initialFilter
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
    dataModel: MenuItemAlbumModel,
    newMenuItemAlbumButtonClick: menuItemAlbumsUIEvents.newMenuItemAlbumButtonClick,
    openEditMenuItemAlbumPage: menuItemAlbumsUIEvents.openEditMenuItemAlbumPage,
    openDeleteMenuItemAlbumDialog: menuItemAlbumsUIEvents.openDeleteMenuItemAlbumDialog,
    openDeleteMenuItemAlbumsDialog: menuItemAlbumsUIEvents.openDeleteMenuItemAlbumsDialog,
    openFetchMenuItemAlbumsDialog: menuItemAlbumsUIEvents.openFetchMenuItemAlbumsDialog,
    openUpdateMenuItemAlbumsStatusDialog: menuItemAlbumsUIEvents.openUpdateMenuItemAlbumsStatusDialog,
  };
  return (
    <MenuItemAlbumsUIContext.Provider value={value}>{children}</MenuItemAlbumsUIContext.Provider>
  );
}