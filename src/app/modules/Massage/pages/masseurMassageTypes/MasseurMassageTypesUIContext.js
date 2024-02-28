import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MasseurMassageTypeModel } from "../../../../../core/_models/Massage/MasseurMassageTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MasseurMassageTypesUIContext = createContext();

export function useMasseurMassageTypesUIContext() {
  return useContext(MasseurMassageTypesUIContext);
}

export const MasseurMassageTypesUIConsumer =
  MasseurMassageTypesUIContext.Consumer;

export function MasseurMassageTypesUIProvider({
  masseurMassageTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MasseurMassageTypeModel).initialFilter
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
    dataModel: MasseurMassageTypeModel,
    newMasseurMassageTypeButtonClick:
      masseurMassageTypesUIEvents.newMasseurMassageTypeButtonClick,
    openEditMasseurMassageTypePage:
      masseurMassageTypesUIEvents.openEditMasseurMassageTypePage,
    openDeleteMasseurMassageTypeDialog:
      masseurMassageTypesUIEvents.openDeleteMasseurMassageTypeDialog,
    openDeleteMasseurMassageTypesDialog:
      masseurMassageTypesUIEvents.openDeleteMasseurMassageTypesDialog,
    openFetchMasseurMassageTypesDialog:
      masseurMassageTypesUIEvents.openFetchMasseurMassageTypesDialog,
    openUpdateMasseurMassageTypesStatusDialog:
      masseurMassageTypesUIEvents.openUpdateMasseurMassageTypesStatusDialog,
  };
  return (
    <MasseurMassageTypesUIContext.Provider value={value}>
      {children}
    </MasseurMassageTypesUIContext.Provider>
  );
}
