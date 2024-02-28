import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MasseurModel } from "../../../../../core/_models/Massage/MasseurModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MasseursUIContext = createContext();

export function useMasseursUIContext() {
  return useContext(MasseursUIContext);
}

export const MasseursUIConsumer = MasseursUIContext.Consumer;

export function MasseursUIProvider({ masseursUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MasseurModel).initialFilter
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
    dataModel: MasseurModel,
    newMasseurButtonClick: masseursUIEvents.newMasseurButtonClick,
    openEditMasseurPage: masseursUIEvents.openEditMasseurPage,
    openDeleteMasseurDialog: masseursUIEvents.openDeleteMasseurDialog,
    openDeleteMasseursDialog: masseursUIEvents.openDeleteMasseursDialog,
    openFetchMasseursDialog: masseursUIEvents.openFetchMasseursDialog,
    openUpdateMasseursStatusDialog:
      masseursUIEvents.openUpdateMasseursStatusDialog,
  };
  return (
    <MasseursUIContext.Provider value={value}>
      {children}
    </MasseursUIContext.Provider>
  );
}
