import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OrganizationChartLevelModel } from "../../../../../core/_models/Employment/OrganizationChartLevelModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OrganizationChartLevelsUIContext = createContext();

export function useOrganizationChartLevelsUIContext() {
  return useContext(OrganizationChartLevelsUIContext);
}

export const OrganizationChartLevelsUIConsumer =
  OrganizationChartLevelsUIContext.Consumer;

export function OrganizationChartLevelsUIProvider({
  organizationChartLevelsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OrganizationChartLevelModel).initialFilter
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
    dataModel: OrganizationChartLevelModel,
    newOrganizationChartLevelButtonClick:
      organizationChartLevelsUIEvents.newOrganizationChartLevelButtonClick,
    openEditOrganizationChartLevelPage:
      organizationChartLevelsUIEvents.openEditOrganizationChartLevelPage,
    openDeleteOrganizationChartLevelDialog:
      organizationChartLevelsUIEvents.openDeleteOrganizationChartLevelDialog,
    openDeleteOrganizationChartLevelsDialog:
      organizationChartLevelsUIEvents.openDeleteOrganizationChartLevelsDialog,
    openFetchOrganizationChartLevelsDialog:
      organizationChartLevelsUIEvents.openFetchOrganizationChartLevelsDialog,
    openUpdateOrganizationChartLevelsStatusDialog:
      organizationChartLevelsUIEvents.openUpdateOrganizationChartLevelsStatusDialog,
  };
  return (
    <OrganizationChartLevelsUIContext.Provider value={value}>
      {children}
    </OrganizationChartLevelsUIContext.Provider>
  );
}
