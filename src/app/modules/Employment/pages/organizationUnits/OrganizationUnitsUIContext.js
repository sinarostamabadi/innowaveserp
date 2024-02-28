import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { OrganizationUnitModel } from "../../../../../core/_models/Employment/OrganizationUnitModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const OrganizationUnitsUIContext = createContext();

export function useOrganizationUnitsUIContext() {
  return useContext(OrganizationUnitsUIContext);
}

export const OrganizationUnitsUIConsumer = OrganizationUnitsUIContext.Consumer;

export function OrganizationUnitsUIProvider({
  organizationUnitsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(OrganizationUnitModel).initialFilter
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
    dataModel: OrganizationUnitModel,
    newOrganizationUnitButtonClick:
      organizationUnitsUIEvents.newOrganizationUnitButtonClick,
    openEditOrganizationUnitPage:
      organizationUnitsUIEvents.openEditOrganizationUnitPage,
    openDeleteOrganizationUnitDialog:
      organizationUnitsUIEvents.openDeleteOrganizationUnitDialog,
    openDeleteOrganizationUnitsDialog:
      organizationUnitsUIEvents.openDeleteOrganizationUnitsDialog,
    openFetchOrganizationUnitsDialog:
      organizationUnitsUIEvents.openFetchOrganizationUnitsDialog,
    openUpdateOrganizationUnitsStatusDialog:
      organizationUnitsUIEvents.openUpdateOrganizationUnitsStatusDialog,
  };
  return (
    <OrganizationUnitsUIContext.Provider value={value}>
      {children}
    </OrganizationUnitsUIContext.Provider>
  );
}
