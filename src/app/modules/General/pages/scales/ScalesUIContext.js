import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ScaleModel } from "../../../../../core/_models/General/ScaleModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ScalesUIContext = createContext();

export function useScalesUIContext() {
  return useContext(ScalesUIContext);
}

export const ScalesUIConsumer = ScalesUIContext.Consumer;

export function ScalesUIProvider({ scalesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ScaleModel).initialFilter
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
    dataModel: ScaleModel,
    newScaleButtonClick: scalesUIEvents.newScaleButtonClick,
    openEditScalePage: scalesUIEvents.openEditScalePage,
    openDeleteScaleDialog: scalesUIEvents.openDeleteScaleDialog,
    openDeleteScalesDialog: scalesUIEvents.openDeleteScalesDialog,
    openFetchScalesDialog: scalesUIEvents.openFetchScalesDialog,
    openUpdateScalesStatusDialog: scalesUIEvents.openUpdateScalesStatusDialog,
  };
  return (
    <ScalesUIContext.Provider value={value}>{children}</ScalesUIContext.Provider>
  );
}
