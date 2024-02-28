import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { UnitMeasureGroupModel } from "../../../../../core/_models/General/UnitMeasureGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const UnitMeasureGroupsUIContext = createContext();

export function useUnitMeasureGroupsUIContext() {
  return useContext(UnitMeasureGroupsUIContext);
}

export const UnitMeasureGroupsUIConsumer = UnitMeasureGroupsUIContext.Consumer;

export function UnitMeasureGroupsUIProvider({
  unitMeasureGroupsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(UnitMeasureGroupModel).initialFilter
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
    dataModel: UnitMeasureGroupModel,
    newUnitMeasureGroupButtonClick:
      unitMeasureGroupsUIEvents.newUnitMeasureGroupButtonClick,
    openEditUnitMeasureGroupPage:
      unitMeasureGroupsUIEvents.openEditUnitMeasureGroupPage,
    openDeleteUnitMeasureGroupDialog:
      unitMeasureGroupsUIEvents.openDeleteUnitMeasureGroupDialog,
    openDeleteUnitMeasureGroupsDialog:
      unitMeasureGroupsUIEvents.openDeleteUnitMeasureGroupsDialog,
    openFetchUnitMeasureGroupsDialog:
      unitMeasureGroupsUIEvents.openFetchUnitMeasureGroupsDialog,
    openUpdateUnitMeasureGroupsStatusDialog:
      unitMeasureGroupsUIEvents.openUpdateUnitMeasureGroupsStatusDialog,
  };
  return (
    <UnitMeasureGroupsUIContext.Provider value={value}>
      {children}
    </UnitMeasureGroupsUIContext.Provider>
  );
}
