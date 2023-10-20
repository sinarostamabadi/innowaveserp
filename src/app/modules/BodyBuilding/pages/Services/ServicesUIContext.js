
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingServiceModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingServiceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ServicesUIContext = createContext();

export function useServicesUIContext() {
  return useContext(ServicesUIContext);
}

export const ServicesUIConsumer = ServicesUIContext.Consumer;

export function ServicesUIProvider({ servicesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingServiceModel).initialFilter
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
    dataModel: BodyBuildingServiceModel,
    newServiceButtonClick: servicesUIEvents.newServiceButtonClick,
    openEditServicePage: servicesUIEvents.openEditServicePage,
    openDeleteServiceDialog: servicesUIEvents.openDeleteServiceDialog,
    openDeleteServicesDialog: servicesUIEvents.openDeleteServicesDialog,
    openFetchServicesDialog: servicesUIEvents.openFetchServicesDialog,
    openUpdateServicesStatusDialog: servicesUIEvents.openUpdateServicesStatusDialog,
  };
  return (
    <ServicesUIContext.Provider value={value}>{children}</ServicesUIContext.Provider>
  );
}