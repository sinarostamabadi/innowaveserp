
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EntityPointModel } from "../../../../../core/_models/Crm";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EntityPointsUIContext = createContext();

export function useEntityPointsUIContext() {
  return useContext(EntityPointsUIContext);
}

export const EntityPointsUIConsumer = EntityPointsUIContext.Consumer;

export function EntityPointsUIProvider({ entityPointsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EntityPointModel).initialFilter
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
    dataModel: EntityPointModel,
    newEntityPointButtonClick: entityPointsUIEvents.newEntityPointButtonClick,
    openEditEntityPointPage: entityPointsUIEvents.openEditEntityPointPage,
    openDeleteEntityPointDialog: entityPointsUIEvents.openDeleteEntityPointDialog,
    openDeleteEntityPointsDialog: entityPointsUIEvents.openDeleteEntityPointsDialog,
    openFetchEntityPointsDialog: entityPointsUIEvents.openFetchEntityPointsDialog,
    openUpdateEntityPointsStatusDialog: entityPointsUIEvents.openUpdateEntityPointsStatusDialog,
  };
  return (
    <EntityPointsUIContext.Provider value={value}>{children}</EntityPointsUIContext.Provider>
  );
}