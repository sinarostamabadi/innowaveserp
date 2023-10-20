
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UnitConversionModel } from "../../../../../core/_models/General/UnitConversionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UnitConversionsUIContext = createContext();

export function useUnitConversionsUIContext() {
  return useContext(UnitConversionsUIContext);
}

export const UnitConversionsUIConsumer = UnitConversionsUIContext.Consumer;

export function UnitConversionsUIProvider({ unitConversionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UnitConversionModel).initialFilter
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
    dataModel: UnitConversionModel,
    newUnitConversionButtonClick: unitConversionsUIEvents.newUnitConversionButtonClick,
    openEditUnitConversionPage: unitConversionsUIEvents.openEditUnitConversionPage,
    openDeleteUnitConversionDialog: unitConversionsUIEvents.openDeleteUnitConversionDialog,
    openDeleteUnitConversionsDialog: unitConversionsUIEvents.openDeleteUnitConversionsDialog,
    openFetchUnitConversionsDialog: unitConversionsUIEvents.openFetchUnitConversionsDialog,
    openUpdateUnitConversionsStatusDialog: unitConversionsUIEvents.openUpdateUnitConversionsStatusDialog,
  };
  return (
    <UnitConversionsUIContext.Provider value={value}>{children}</UnitConversionsUIContext.Provider>
  );
}