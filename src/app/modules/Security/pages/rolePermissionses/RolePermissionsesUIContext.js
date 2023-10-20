
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RolePermissionsModel } from "../../../../../core/_models/Security/RolePermissionsModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RolePermissionsesUIContext = createContext();

export function useRolePermissionsesUIContext() {
  return useContext(RolePermissionsesUIContext);
}

export const RolePermissionsesUIConsumer = RolePermissionsesUIContext.Consumer;

export function RolePermissionsesUIProvider({ rolePermissionsesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RolePermissionsModel).initialFilter
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
    dataModel: RolePermissionsModel,
    newRolePermissionsButtonClick: rolePermissionsesUIEvents.newRolePermissionsButtonClick,
    openEditRolePermissionsPage: rolePermissionsesUIEvents.openEditRolePermissionsPage,
    openDeleteRolePermissionsDialog: rolePermissionsesUIEvents.openDeleteRolePermissionsDialog,
    openDeleteRolePermissionsesDialog: rolePermissionsesUIEvents.openDeleteRolePermissionsesDialog,
    openFetchRolePermissionsesDialog: rolePermissionsesUIEvents.openFetchRolePermissionsesDialog,
    openUpdateRolePermissionsesStatusDialog: rolePermissionsesUIEvents.openUpdateRolePermissionsesStatusDialog,
  };
  return (
    <RolePermissionsesUIContext.Provider value={value}>{children}</RolePermissionsesUIContext.Provider>
  );
}