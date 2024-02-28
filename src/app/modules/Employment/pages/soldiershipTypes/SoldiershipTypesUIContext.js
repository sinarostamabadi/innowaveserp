import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SoldiershipTypeModel } from "../../../../../core/_models/Employment/SoldiershipTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SoldiershipTypesUIContext = createContext();

export function useSoldiershipTypesUIContext() {
  return useContext(SoldiershipTypesUIContext);
}

export const SoldiershipTypesUIConsumer = SoldiershipTypesUIContext.Consumer;

export function SoldiershipTypesUIProvider({
  soldiershipTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SoldiershipTypeModel).initialFilter
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
    dataModel: SoldiershipTypeModel,
    newSoldiershipTypeButtonClick:
      soldiershipTypesUIEvents.newSoldiershipTypeButtonClick,
    openEditSoldiershipTypePage:
      soldiershipTypesUIEvents.openEditSoldiershipTypePage,
    openDeleteSoldiershipTypeDialog:
      soldiershipTypesUIEvents.openDeleteSoldiershipTypeDialog,
    openDeleteSoldiershipTypesDialog:
      soldiershipTypesUIEvents.openDeleteSoldiershipTypesDialog,
    openFetchSoldiershipTypesDialog:
      soldiershipTypesUIEvents.openFetchSoldiershipTypesDialog,
    openUpdateSoldiershipTypesStatusDialog:
      soldiershipTypesUIEvents.openUpdateSoldiershipTypesStatusDialog,
  };
  return (
    <SoldiershipTypesUIContext.Provider value={value}>
      {children}
    </SoldiershipTypesUIContext.Provider>
  );
}
