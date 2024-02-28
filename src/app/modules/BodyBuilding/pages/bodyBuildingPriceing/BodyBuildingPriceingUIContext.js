import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingPriceingModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingPriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingPriceingUIContext = createContext();

export function useBodyBuildingPriceingUIContext() {
  return useContext(BodyBuildingPriceingUIContext);
}

export const BodyBuildingPriceingUIConsumer =
  BodyBuildingPriceingUIContext.Consumer;

export function BodyBuildingPriceingUIProvider({
  bodyBuildingPriceingUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingPriceingModel).initialFilter
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
    dataModel: BodyBuildingPriceingModel,
    newBodyBuildingPriceingButtonClick:
      bodyBuildingPriceingUIEvents.newBodyBuildingPriceingButtonClick,
    openEditBodyBuildingPriceingPage:
      bodyBuildingPriceingUIEvents.openEditBodyBuildingPriceingPage,
    openDeleteBodyBuildingPriceingDialog:
      bodyBuildingPriceingUIEvents.openDeleteBodyBuildingPriceingDialog,
    openDeleteBodyBuildingPriceingDialog:
      bodyBuildingPriceingUIEvents.openDeleteBodyBuildingPriceingDialog,
    openFetchBodyBuildingPriceingDialog:
      bodyBuildingPriceingUIEvents.openFetchBodyBuildingPriceingDialog,
    openUpdateBodyBuildingPriceingStatusDialog:
      bodyBuildingPriceingUIEvents.openUpdateBodyBuildingPriceingStatusDialog,
  };
  return (
    <BodyBuildingPriceingUIContext.Provider value={value}>
      {children}
    </BodyBuildingPriceingUIContext.Provider>
  );
}
