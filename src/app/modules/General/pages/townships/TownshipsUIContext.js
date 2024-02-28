import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { TownshipModel } from "../../../../../core/_models/General/TownshipModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TownshipsUIContext = createContext();

export function useTownshipsUIContext() {
  return useContext(TownshipsUIContext);
}

export const TownshipsUIConsumer = TownshipsUIContext.Consumer;

export function TownshipsUIProvider({ townshipsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(TownshipModel).initialFilter
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
    dataModel: TownshipModel,
    newTownshipButtonClick: townshipsUIEvents.newTownshipButtonClick,
    openEditTownshipPage: townshipsUIEvents.openEditTownshipPage,
    openDeleteTownshipDialog: townshipsUIEvents.openDeleteTownshipDialog,
    openDeleteTownshipsDialog: townshipsUIEvents.openDeleteTownshipsDialog,
    openFetchTownshipsDialog: townshipsUIEvents.openFetchTownshipsDialog,
    openUpdateTownshipsStatusDialog:
      townshipsUIEvents.openUpdateTownshipsStatusDialog,
  };
  return (
    <TownshipsUIContext.Provider value={value}>
      {children}
    </TownshipsUIContext.Provider>
  );
}
