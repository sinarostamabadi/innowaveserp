
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UnitModel } from "../../../../../core/_models/General/UnitModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UnitsUIContext = createContext();

export function useUnitsUIContext() {
  return useContext(UnitsUIContext);
}

export const UnitsUIConsumer = UnitsUIContext.Consumer;

export function UnitsUIProvider({ unitsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UnitModel).initialFilter
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
    dataModel: UnitModel,
    newUnitButtonClick: unitsUIEvents.newUnitButtonClick,
    openEditUnitPage: unitsUIEvents.openEditUnitPage,
    openDeleteUnitDialog: unitsUIEvents.openDeleteUnitDialog,
    openDeleteUnitsDialog: unitsUIEvents.openDeleteUnitsDialog,
    openFetchUnitsDialog: unitsUIEvents.openFetchUnitsDialog,
    openUpdateUnitsStatusDialog: unitsUIEvents.openUpdateUnitsStatusDialog,
  };
  return (
    <UnitsUIContext.Provider value={value}>{children}</UnitsUIContext.Provider>
  );
}