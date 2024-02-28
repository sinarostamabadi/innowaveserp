import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RolesModel } from "../../../../../core/_models/Security/RolesModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RolesesUIContext = createContext();

export function useRolesesUIContext() {
  return useContext(RolesesUIContext);
}

export const RolesesUIConsumer = RolesesUIContext.Consumer;

export function RolesesUIProvider({ rolesesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RolesModel).initialFilter
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
    dataModel: RolesModel,
    newRolesButtonClick: rolesesUIEvents.newRolesButtonClick,
    openEditRolesPage: rolesesUIEvents.openEditRolesPage,
    openDeleteRolesDialog: rolesesUIEvents.openDeleteRolesDialog,
    openDeleteRolesesDialog: rolesesUIEvents.openDeleteRolesesDialog,
    openFetchRolesesDialog: rolesesUIEvents.openFetchRolesesDialog,
    openUpdateRolesesStatusDialog:
      rolesesUIEvents.openUpdateRolesesStatusDialog,
  };
  return (
    <RolesesUIContext.Provider value={value}>
      {children}
    </RolesesUIContext.Provider>
  );
}
