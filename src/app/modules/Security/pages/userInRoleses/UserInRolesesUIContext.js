
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UserInRolesModel } from "../../../../../core/_models/Security/UserInRolesModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UserInRolesesUIContext = createContext();

export function useUserInRolesesUIContext() {
  return useContext(UserInRolesesUIContext);
}

export const UserInRolesesUIConsumer = UserInRolesesUIContext.Consumer;

export function UserInRolesesUIProvider({ userInRolesesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UserInRolesModel).initialFilter
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
    dataModel: UserInRolesModel,
    newUserInRolesButtonClick: userInRolesesUIEvents.newUserInRolesButtonClick,
    openEditUserInRolesPage: userInRolesesUIEvents.openEditUserInRolesPage,
    openDeleteUserInRolesDialog: userInRolesesUIEvents.openDeleteUserInRolesDialog,
    openDeleteUserInRolesesDialog: userInRolesesUIEvents.openDeleteUserInRolesesDialog,
    openFetchUserInRolesesDialog: userInRolesesUIEvents.openFetchUserInRolesesDialog,
    openUpdateUserInRolesesStatusDialog: userInRolesesUIEvents.openUpdateUserInRolesesStatusDialog,
  };
  return (
    <UserInRolesesUIContext.Provider value={value}>{children}</UserInRolesesUIContext.Provider>
  );
}