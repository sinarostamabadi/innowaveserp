
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MarridationTypeModel } from "../../../../../core/_models/Employment/MarridationTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MarridationTypesUIContext = createContext();

export function useMarridationTypesUIContext() {
  return useContext(MarridationTypesUIContext);
}

export const MarridationTypesUIConsumer = MarridationTypesUIContext.Consumer;

export function MarridationTypesUIProvider({ marridationTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MarridationTypeModel).initialFilter
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
    dataModel: MarridationTypeModel,
    newMarridationTypeButtonClick: marridationTypesUIEvents.newMarridationTypeButtonClick,
    openEditMarridationTypePage: marridationTypesUIEvents.openEditMarridationTypePage,
    openDeleteMarridationTypeDialog: marridationTypesUIEvents.openDeleteMarridationTypeDialog,
    openDeleteMarridationTypesDialog: marridationTypesUIEvents.openDeleteMarridationTypesDialog,
    openFetchMarridationTypesDialog: marridationTypesUIEvents.openFetchMarridationTypesDialog,
    openUpdateMarridationTypesStatusDialog: marridationTypesUIEvents.openUpdateMarridationTypesStatusDialog,
  };
  return (
    <MarridationTypesUIContext.Provider value={value}>{children}</MarridationTypesUIContext.Provider>
  );
}