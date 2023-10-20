
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SpecialDayTypeModel } from "../../../../../core/_models/General/SpecialDayTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SpecialDayTypesUIContext = createContext();

export function useSpecialDayTypesUIContext() {
  return useContext(SpecialDayTypesUIContext);
}

export const SpecialDayTypesUIConsumer = SpecialDayTypesUIContext.Consumer;

export function SpecialDayTypesUIProvider({ specialDayTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SpecialDayTypeModel).initialFilter
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
    dataModel: SpecialDayTypeModel,
    newSpecialDayTypeButtonClick: specialDayTypesUIEvents.newSpecialDayTypeButtonClick,
    openEditSpecialDayTypePage: specialDayTypesUIEvents.openEditSpecialDayTypePage,
    openDeleteSpecialDayTypeDialog: specialDayTypesUIEvents.openDeleteSpecialDayTypeDialog,
    openDeleteSpecialDayTypesDialog: specialDayTypesUIEvents.openDeleteSpecialDayTypesDialog,
    openFetchSpecialDayTypesDialog: specialDayTypesUIEvents.openFetchSpecialDayTypesDialog,
    openUpdateSpecialDayTypesStatusDialog: specialDayTypesUIEvents.openUpdateSpecialDayTypesStatusDialog,
  };
  return (
    <SpecialDayTypesUIContext.Provider value={value}>{children}</SpecialDayTypesUIContext.Provider>
  );
}