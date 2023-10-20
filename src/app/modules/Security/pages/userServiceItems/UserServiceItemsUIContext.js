
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UserServiceItemModel } from "../../../../../core/_models/Security/UserServiceItemModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UserServiceItemsUIContext = createContext();

export function useUserServiceItemsUIContext() {
  return useContext(UserServiceItemsUIContext);
}

export const UserServiceItemsUIConsumer = UserServiceItemsUIContext.Consumer;

export function UserServiceItemsUIProvider({ userServiceItemsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UserServiceItemModel).initialFilter
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
    dataModel: UserServiceItemModel,
    newUserServiceItemButtonClick: userServiceItemsUIEvents.newUserServiceItemButtonClick,
    openEditUserServiceItemPage: userServiceItemsUIEvents.openEditUserServiceItemPage,
    openDeleteUserServiceItemDialog: userServiceItemsUIEvents.openDeleteUserServiceItemDialog,
    openDeleteUserServiceItemsDialog: userServiceItemsUIEvents.openDeleteUserServiceItemsDialog,
    openFetchUserServiceItemsDialog: userServiceItemsUIEvents.openFetchUserServiceItemsDialog,
    openUpdateUserServiceItemsStatusDialog: userServiceItemsUIEvents.openUpdateUserServiceItemsStatusDialog,
  };
  return (
    <UserServiceItemsUIContext.Provider value={value}>{children}</UserServiceItemsUIContext.Provider>
  );
}