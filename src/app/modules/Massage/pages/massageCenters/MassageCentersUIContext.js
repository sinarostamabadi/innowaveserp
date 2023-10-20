
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageCenterModel } from "../../../../../core/_models/Massage/MassageCenterModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageCentersUIContext = createContext();

export function useMassageCentersUIContext() {
  return useContext(MassageCentersUIContext);
}

export const MassageCentersUIConsumer = MassageCentersUIContext.Consumer;

export function MassageCentersUIProvider({ massageCentersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageCenterModel).initialFilter
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
    dataModel: MassageCenterModel,
    newMassageCenterButtonClick: massageCentersUIEvents.newMassageCenterButtonClick,
    openEditMassageCenterPage: massageCentersUIEvents.openEditMassageCenterPage,
    openDeleteMassageCenterDialog: massageCentersUIEvents.openDeleteMassageCenterDialog,
    openDeleteMassageCentersDialog: massageCentersUIEvents.openDeleteMassageCentersDialog,
    openFetchMassageCentersDialog: massageCentersUIEvents.openFetchMassageCentersDialog,
    openUpdateMassageCentersStatusDialog: massageCentersUIEvents.openUpdateMassageCentersStatusDialog,
  };
  return (
    <MassageCentersUIContext.Provider value={value}>{children}</MassageCentersUIContext.Provider>
  );
}