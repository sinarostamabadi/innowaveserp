import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PosUserModel } from "../../../../../core/_models/General/PosUserModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PosUsersUIContext = createContext();

export function usePosUsersUIContext() {
  return useContext(PosUsersUIContext);
}

export const PosUsersUIConsumer = PosUsersUIContext.Consumer;

export function PosUsersUIProvider({ posUsersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PosUserModel).initialFilter
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
    dataModel: PosUserModel,
    newPosUserButtonClick: posUsersUIEvents.newPosUserButtonClick,
    openEditPosUserPage: posUsersUIEvents.openEditPosUserPage,
    openDeletePosUserDialog: posUsersUIEvents.openDeletePosUserDialog,
    openDeletePosUsersDialog: posUsersUIEvents.openDeletePosUsersDialog,
    openFetchPosUsersDialog: posUsersUIEvents.openFetchPosUsersDialog,
    openUpdatePosUsersStatusDialog:
      posUsersUIEvents.openUpdatePosUsersStatusDialog,
  };
  return (
    <PosUsersUIContext.Provider value={value}>
      {children}
    </PosUsersUIContext.Provider>
  );
}
