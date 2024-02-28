import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingReserveUsedDateModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingReserveUsedDateModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingReserveUsedDatesUIContext = createContext();

export function useBodyBuildingReserveUsedDatesUIContext() {
  return useContext(BodyBuildingReserveUsedDatesUIContext);
}

export const BodyBuildingReserveUsedDatesUIConsumer =
  BodyBuildingReserveUsedDatesUIContext.Consumer;

export function BodyBuildingReserveUsedDatesUIProvider({
  bodyBuildingReserveUsedDatesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingReserveUsedDateModel).initialFilter
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
    dataModel: BodyBuildingReserveUsedDateModel,
    newBodyBuildingReserveUsedDateButtonClick:
      bodyBuildingReserveUsedDatesUIEvents.newBodyBuildingReserveUsedDateButtonClick,
    openEditBodyBuildingReserveUsedDatePage:
      bodyBuildingReserveUsedDatesUIEvents.openEditBodyBuildingReserveUsedDatePage,
    openDeleteBodyBuildingReserveUsedDateDialog:
      bodyBuildingReserveUsedDatesUIEvents.openDeleteBodyBuildingReserveUsedDateDialog,
    openDeleteBodyBuildingReserveUsedDatesDialog:
      bodyBuildingReserveUsedDatesUIEvents.openDeleteBodyBuildingReserveUsedDatesDialog,
    openFetchBodyBuildingReserveUsedDatesDialog:
      bodyBuildingReserveUsedDatesUIEvents.openFetchBodyBuildingReserveUsedDatesDialog,
    openUpdateBodyBuildingReserveUsedDatesStatusDialog:
      bodyBuildingReserveUsedDatesUIEvents.openUpdateBodyBuildingReserveUsedDatesStatusDialog,
  };
  return (
    <BodyBuildingReserveUsedDatesUIContext.Provider value={value}>
      {children}
    </BodyBuildingReserveUsedDatesUIContext.Provider>
  );
}
