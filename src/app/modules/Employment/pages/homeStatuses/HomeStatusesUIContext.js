
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { HomeStatusModel } from "../../../../../core/_models/Employment/HomeStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const HomeStatusesUIContext = createContext();

export function useHomeStatusesUIContext() {
  return useContext(HomeStatusesUIContext);
}

export const HomeStatusesUIConsumer = HomeStatusesUIContext.Consumer;

export function HomeStatusesUIProvider({ homeStatusesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(HomeStatusModel).initialFilter
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
    dataModel: HomeStatusModel,
    newHomeStatusButtonClick: homeStatusesUIEvents.newHomeStatusButtonClick,
    openEditHomeStatusPage: homeStatusesUIEvents.openEditHomeStatusPage,
    openDeleteHomeStatusDialog: homeStatusesUIEvents.openDeleteHomeStatusDialog,
    openDeleteHomeStatusesDialog: homeStatusesUIEvents.openDeleteHomeStatusesDialog,
    openFetchHomeStatusesDialog: homeStatusesUIEvents.openFetchHomeStatusesDialog,
    openUpdateHomeStatusesStatusDialog: homeStatusesUIEvents.openUpdateHomeStatusesStatusDialog,
  };
  return (
    <HomeStatusesUIContext.Provider value={value}>{children}</HomeStatusesUIContext.Provider>
  );
}