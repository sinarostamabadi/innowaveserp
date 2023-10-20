
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OrganizationChartEmployeeModel } from "../../../../../core/_models/Employment/OrganizationChartEmployeeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OrganizationChartEmployeesUIContext = createContext();

export function useOrganizationChartEmployeesUIContext() {
  return useContext(OrganizationChartEmployeesUIContext);
}

export const OrganizationChartEmployeesUIConsumer = OrganizationChartEmployeesUIContext.Consumer;

export function OrganizationChartEmployeesUIProvider({ organizationChartEmployeesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OrganizationChartEmployeeModel).initialFilter
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
    dataModel: OrganizationChartEmployeeModel,
    newOrganizationChartEmployeeButtonClick: organizationChartEmployeesUIEvents.newOrganizationChartEmployeeButtonClick,
    openEditOrganizationChartEmployeePage: organizationChartEmployeesUIEvents.openEditOrganizationChartEmployeePage,
    openDeleteOrganizationChartEmployeeDialog: organizationChartEmployeesUIEvents.openDeleteOrganizationChartEmployeeDialog,
    openDeleteOrganizationChartEmployeesDialog: organizationChartEmployeesUIEvents.openDeleteOrganizationChartEmployeesDialog,
    openFetchOrganizationChartEmployeesDialog: organizationChartEmployeesUIEvents.openFetchOrganizationChartEmployeesDialog,
    openUpdateOrganizationChartEmployeesStatusDialog: organizationChartEmployeesUIEvents.openUpdateOrganizationChartEmployeesStatusDialog,
  };
  return (
    <OrganizationChartEmployeesUIContext.Provider value={value}>{children}</OrganizationChartEmployeesUIContext.Provider>
  );
}