
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingCenterModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingCentersUIContext = createContext();

export function useBodyBuildingCentersUIContext() {
  return useContext(BodyBuildingCentersUIContext);
}

export const BodyBuildingCentersUIConsumer = BodyBuildingCentersUIContext.Consumer;

export function BodyBuildingCentersUIProvider({ bodyBuildingCentersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingCenterModel).initialFilter
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
    dataModel: BodyBuildingCenterModel,
    newBodyBuildingCenterButtonClick: bodyBuildingCentersUIEvents.newBodyBuildingCenterButtonClick,
    openEditBodyBuildingCenterPage: bodyBuildingCentersUIEvents.openEditBodyBuildingCenterPage,
    openDeleteBodyBuildingCenterDialog: bodyBuildingCentersUIEvents.openDeleteBodyBuildingCenterDialog,
    openDeleteBodyBuildingCentersDialog: bodyBuildingCentersUIEvents.openDeleteBodyBuildingCentersDialog,
    openFetchBodyBuildingCentersDialog: bodyBuildingCentersUIEvents.openFetchBodyBuildingCentersDialog,
    openUpdateBodyBuildingCentersStatusDialog: bodyBuildingCentersUIEvents.openUpdateBodyBuildingCentersStatusDialog,
  };
  return (
    <BodyBuildingCentersUIContext.Provider value={value}>{children}</BodyBuildingCentersUIContext.Provider>
  );
}