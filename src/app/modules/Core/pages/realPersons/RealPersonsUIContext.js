import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RealPersonModel } from "../../../../../core/_models/Core/RealPersonModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const RealPersonsUIContext = createContext();
export function useRealPersonsUIContext() {
  return useContext(RealPersonsUIContext);
}
export const RealPersonsUIConsumer = RealPersonsUIContext.Consumer;
export function RealPersonsUIProvider({ realPersonsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RealPersonModel).initialFilter
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
    dataModel: RealPersonModel,
    newRealPersonButtonClick: realPersonsUIEvents.newRealPersonButtonClick,
    openEditRealPersonPage: realPersonsUIEvents.openEditRealPersonPage,
    openDeleteRealPersonDialog: realPersonsUIEvents.openDeleteRealPersonDialog,
    openDeleteRealPersonsDialog:
      realPersonsUIEvents.openDeleteRealPersonsDialog,
    openFetchRealPersonsDialog: realPersonsUIEvents.openFetchRealPersonsDialog,
    openUpdateRealPersonsStatusDialog:
      realPersonsUIEvents.openUpdateRealPersonsStatusDialog,
  };
  return (
    <RealPersonsUIContext.Provider value={value}>
      {children}
    </RealPersonsUIContext.Provider>
  );
}
