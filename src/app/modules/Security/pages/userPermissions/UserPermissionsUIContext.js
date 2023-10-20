
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UserPermissionModel } from "../../../../../core/_models/Security/UserPermissionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UserPermissionsUIContext = createContext();

export function useUserPermissionsUIContext() {
  return useContext(UserPermissionsUIContext);
}

export const UserPermissionsUIConsumer = UserPermissionsUIContext.Consumer;

export function UserPermissionsUIProvider({ userPermissionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UserPermissionModel).initialFilter
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
    dataModel: UserPermissionModel,
    newUserPermissionButtonClick: userPermissionsUIEvents.newUserPermissionButtonClick,
    openEditUserPermissionPage: userPermissionsUIEvents.openEditUserPermissionPage,
    openDeleteUserPermissionDialog: userPermissionsUIEvents.openDeleteUserPermissionDialog,
    openDeleteUserPermissionsDialog: userPermissionsUIEvents.openDeleteUserPermissionsDialog,
    openFetchUserPermissionsDialog: userPermissionsUIEvents.openFetchUserPermissionsDialog,
    openUpdateUserPermissionsStatusDialog: userPermissionsUIEvents.openUpdateUserPermissionsStatusDialog,
  };
  return (
    <UserPermissionsUIContext.Provider value={value}>{children}</UserPermissionsUIContext.Provider>
  );
}