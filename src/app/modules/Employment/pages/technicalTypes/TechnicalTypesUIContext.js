import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { TechnicalTypeModel } from "../../../../../core/_models/Employment/TechnicalTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TechnicalTypesUIContext = createContext();

export function useTechnicalTypesUIContext() {
  return useContext(TechnicalTypesUIContext);
}

export const TechnicalTypesUIConsumer = TechnicalTypesUIContext.Consumer;

export function TechnicalTypesUIProvider({ technicalTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(TechnicalTypeModel).initialFilter
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
    dataModel: TechnicalTypeModel,
    newTechnicalTypeButtonClick:
      technicalTypesUIEvents.newTechnicalTypeButtonClick,
    openEditTechnicalTypePage: technicalTypesUIEvents.openEditTechnicalTypePage,
    openDeleteTechnicalTypeDialog:
      technicalTypesUIEvents.openDeleteTechnicalTypeDialog,
    openDeleteTechnicalTypesDialog:
      technicalTypesUIEvents.openDeleteTechnicalTypesDialog,
    openFetchTechnicalTypesDialog:
      technicalTypesUIEvents.openFetchTechnicalTypesDialog,
    openUpdateTechnicalTypesStatusDialog:
      technicalTypesUIEvents.openUpdateTechnicalTypesStatusDialog,
  };
  return (
    <TechnicalTypesUIContext.Provider value={value}>
      {children}
    </TechnicalTypesUIContext.Provider>
  );
}
