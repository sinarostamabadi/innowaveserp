import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageTypeModel } from "../../../../../core/_models/Massage/MassageTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageTypesUIContext = createContext();

export function useMassageTypesUIContext() {
  return useContext(MassageTypesUIContext);
}

export const MassageTypesUIConsumer = MassageTypesUIContext.Consumer;

export function MassageTypesUIProvider({ massageTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageTypeModel).initialFilter
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
    dataModel: MassageTypeModel,
    newMassageTypeButtonClick: massageTypesUIEvents.newMassageTypeButtonClick,
    openEditMassageTypePage: massageTypesUIEvents.openEditMassageTypePage,
    openDeleteMassageTypeDialog:
      massageTypesUIEvents.openDeleteMassageTypeDialog,
    openDeleteMassageTypesDialog:
      massageTypesUIEvents.openDeleteMassageTypesDialog,
    openFetchMassageTypesDialog:
      massageTypesUIEvents.openFetchMassageTypesDialog,
    openUpdateMassageTypesStatusDialog:
      massageTypesUIEvents.openUpdateMassageTypesStatusDialog,
  };
  return (
    <MassageTypesUIContext.Provider value={value}>
      {children}
    </MassageTypesUIContext.Provider>
  );
}
