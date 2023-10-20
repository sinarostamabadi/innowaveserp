
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MenuGroupModel } from "../../../../../core/_models/Cofe/MenuGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MenuGroupsUIContext = createContext();

export function useMenuGroupsUIContext() {
  return useContext(MenuGroupsUIContext);
}

export const MenuGroupsUIConsumer = MenuGroupsUIContext.Consumer;

export function MenuGroupsUIProvider({ menuGroupsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MenuGroupModel).initialFilter
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
    dataModel: MenuGroupModel,
    newMenuGroupButtonClick: menuGroupsUIEvents.newMenuGroupButtonClick,
    openEditMenuGroupPage: menuGroupsUIEvents.openEditMenuGroupPage,
    openDeleteMenuGroupDialog: menuGroupsUIEvents.openDeleteMenuGroupDialog,
    openDeleteMenuGroupsDialog: menuGroupsUIEvents.openDeleteMenuGroupsDialog,
    openFetchMenuGroupsDialog: menuGroupsUIEvents.openFetchMenuGroupsDialog,
    openUpdateMenuGroupsStatusDialog: menuGroupsUIEvents.openUpdateMenuGroupsStatusDialog,
  };
  return (
    <MenuGroupsUIContext.Provider value={value}>{children}</MenuGroupsUIContext.Provider>
  );
}