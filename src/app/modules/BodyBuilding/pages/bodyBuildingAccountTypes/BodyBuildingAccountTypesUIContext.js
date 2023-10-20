
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingAccountTypeModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingAccountTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingAccountTypesUIContext = createContext();

export function useBodyBuildingAccountTypesUIContext() {
  return useContext(BodyBuildingAccountTypesUIContext);
}

export const BodyBuildingAccountTypesUIConsumer = BodyBuildingAccountTypesUIContext.Consumer;

export function BodyBuildingAccountTypesUIProvider({ bodyBuildingAccountTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingAccountTypeModel).initialFilter
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
    dataModel: BodyBuildingAccountTypeModel,
    newBodyBuildingAccountTypeButtonClick: bodyBuildingAccountTypesUIEvents.newBodyBuildingAccountTypeButtonClick,
    openEditBodyBuildingAccountTypePage: bodyBuildingAccountTypesUIEvents.openEditBodyBuildingAccountTypePage,
    openDeleteBodyBuildingAccountTypeDialog: bodyBuildingAccountTypesUIEvents.openDeleteBodyBuildingAccountTypeDialog,
    openDeleteBodyBuildingAccountTypesDialog: bodyBuildingAccountTypesUIEvents.openDeleteBodyBuildingAccountTypesDialog,
    openFetchBodyBuildingAccountTypesDialog: bodyBuildingAccountTypesUIEvents.openFetchBodyBuildingAccountTypesDialog,
    openUpdateBodyBuildingAccountTypesStatusDialog: bodyBuildingAccountTypesUIEvents.openUpdateBodyBuildingAccountTypesStatusDialog,
  };
  return (
    <BodyBuildingAccountTypesUIContext.Provider value={value}>{children}</BodyBuildingAccountTypesUIContext.Provider>
  );
}