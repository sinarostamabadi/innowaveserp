
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OrganizationChartModel } from "../../../../../core/_models/Employment/OrganizationChartModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OrganizationChartsUIContext = createContext();

export function useOrganizationChartsUIContext() {
  return useContext(OrganizationChartsUIContext);
}

export const OrganizationChartsUIConsumer = OrganizationChartsUIContext.Consumer;

export function OrganizationChartsUIProvider({ organizationChartsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OrganizationChartModel).initialFilter
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
    dataModel: OrganizationChartModel,
    newOrganizationChartButtonClick: organizationChartsUIEvents.newOrganizationChartButtonClick,
    openEditOrganizationChartPage: organizationChartsUIEvents.openEditOrganizationChartPage,
    openDeleteOrganizationChartDialog: organizationChartsUIEvents.openDeleteOrganizationChartDialog,
    openDeleteOrganizationChartsDialog: organizationChartsUIEvents.openDeleteOrganizationChartsDialog,
    openFetchOrganizationChartsDialog: organizationChartsUIEvents.openFetchOrganizationChartsDialog,
    openUpdateOrganizationChartsStatusDialog: organizationChartsUIEvents.openUpdateOrganizationChartsStatusDialog,
  };
  return (
    <OrganizationChartsUIContext.Provider value={value}>{children}</OrganizationChartsUIContext.Provider>
  );
}