
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RelationTypeModel } from "../../../../../core/_models/Employment/RelationTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RelationTypesUIContext = createContext();

export function useRelationTypesUIContext() {
  return useContext(RelationTypesUIContext);
}

export const RelationTypesUIConsumer = RelationTypesUIContext.Consumer;

export function RelationTypesUIProvider({ relationTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RelationTypeModel).initialFilter
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
    dataModel: RelationTypeModel,
    newRelationTypeButtonClick: relationTypesUIEvents.newRelationTypeButtonClick,
    openEditRelationTypePage: relationTypesUIEvents.openEditRelationTypePage,
    openDeleteRelationTypeDialog: relationTypesUIEvents.openDeleteRelationTypeDialog,
    openDeleteRelationTypesDialog: relationTypesUIEvents.openDeleteRelationTypesDialog,
    openFetchRelationTypesDialog: relationTypesUIEvents.openFetchRelationTypesDialog,
    openUpdateRelationTypesStatusDialog: relationTypesUIEvents.openUpdateRelationTypesStatusDialog,
  };
  return (
    <RelationTypesUIContext.Provider value={value}>{children}</RelationTypesUIContext.Provider>
  );
}