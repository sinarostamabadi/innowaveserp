import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingTimeSetModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingTimeSetModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TimeSetsUIContext = createContext();

export function useTimeSetsUIContext() {
  return useContext(TimeSetsUIContext);
}

export const TimeSetsUIConsumer = TimeSetsUIContext.Consumer;

export function TimeSetsUIProvider({ timeSetsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingTimeSetModel).initialFilter
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
    dataModel: BodyBuildingTimeSetModel,
    newTimeSetButtonClick: timeSetsUIEvents.newTimeSetButtonClick,
    openEditTimeSetPage: timeSetsUIEvents.openEditTimeSetPage,
    openDeleteTimeSetDialog: timeSetsUIEvents.openDeleteTimeSetDialog,
    openDeleteTimeSetsDialog: timeSetsUIEvents.openDeleteTimeSetsDialog,
    openFetchTimeSetsDialog: timeSetsUIEvents.openFetchTimeSetsDialog,
    openUpdateTimeSetsStatusDialog:
      timeSetsUIEvents.openUpdateTimeSetsStatusDialog,
  };
  return (
    <TimeSetsUIContext.Provider value={value}>
      {children}
    </TimeSetsUIContext.Provider>
  );
}
