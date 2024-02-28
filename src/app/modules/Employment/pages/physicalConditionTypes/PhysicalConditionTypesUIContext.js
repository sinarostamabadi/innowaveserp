import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PhysicalConditionTypeModel } from "../../../../../core/_models/Employment/PhysicalConditionTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PhysicalConditionTypesUIContext = createContext();

export function usePhysicalConditionTypesUIContext() {
  return useContext(PhysicalConditionTypesUIContext);
}

export const PhysicalConditionTypesUIConsumer =
  PhysicalConditionTypesUIContext.Consumer;

export function PhysicalConditionTypesUIProvider({
  physicalConditionTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PhysicalConditionTypeModel).initialFilter
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
    dataModel: PhysicalConditionTypeModel,
    newPhysicalConditionTypeButtonClick:
      physicalConditionTypesUIEvents.newPhysicalConditionTypeButtonClick,
    openEditPhysicalConditionTypePage:
      physicalConditionTypesUIEvents.openEditPhysicalConditionTypePage,
    openDeletePhysicalConditionTypeDialog:
      physicalConditionTypesUIEvents.openDeletePhysicalConditionTypeDialog,
    openDeletePhysicalConditionTypesDialog:
      physicalConditionTypesUIEvents.openDeletePhysicalConditionTypesDialog,
    openFetchPhysicalConditionTypesDialog:
      physicalConditionTypesUIEvents.openFetchPhysicalConditionTypesDialog,
    openUpdatePhysicalConditionTypesStatusDialog:
      physicalConditionTypesUIEvents.openUpdatePhysicalConditionTypesStatusDialog,
  };
  return (
    <PhysicalConditionTypesUIContext.Provider value={value}>
      {children}
    </PhysicalConditionTypesUIContext.Provider>
  );
}
