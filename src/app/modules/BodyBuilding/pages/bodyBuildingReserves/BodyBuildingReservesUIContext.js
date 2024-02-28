import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingReserveModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingReservesUIContext = createContext();

export function useBodyBuildingReservesUIContext() {
  return useContext(BodyBuildingReservesUIContext);
}

export const BodyBuildingReservesUIConsumer =
  BodyBuildingReservesUIContext.Consumer;

export function BodyBuildingReservesUIProvider({
  bodyBuildingReservesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingReserveModel).initialFilter
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
    dataModel: BodyBuildingReserveModel,
    newBodyBuildingReserveButtonClick:
      bodyBuildingReservesUIEvents.newBodyBuildingReserveButtonClick,
    openEditBodyBuildingReservePage:
      bodyBuildingReservesUIEvents.openEditBodyBuildingReservePage,
    openDeleteBodyBuildingReserveDialog:
      bodyBuildingReservesUIEvents.openDeleteBodyBuildingReserveDialog,
    openDeleteBodyBuildingReservesDialog:
      bodyBuildingReservesUIEvents.openDeleteBodyBuildingReservesDialog,
    openFetchBodyBuildingReservesDialog:
      bodyBuildingReservesUIEvents.openFetchBodyBuildingReservesDialog,
    openUpdateBodyBuildingReservesStatusDialog:
      bodyBuildingReservesUIEvents.openUpdateBodyBuildingReservesStatusDialog,
  };
  return (
    <BodyBuildingReservesUIContext.Provider value={value}>
      {children}
    </BodyBuildingReservesUIContext.Provider>
  );
}
