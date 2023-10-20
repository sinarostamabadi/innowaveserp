
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageTimePriceingModel } from "../../../../../core/_models/Massage/MassageTimePriceingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageTimePriceingUIContext = createContext();

export function useMassageTimePriceingUIContext() {
  return useContext(MassageTimePriceingUIContext);
}

export const MassageTimePriceingUIConsumer = MassageTimePriceingUIContext.Consumer;

export function MassageTimePriceingUIProvider({ massageTimePriceingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageTimePriceingModel).initialFilter
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
    dataModel: MassageTimePriceingModel,
    newMassageTimePriceingButtonClick: massageTimePriceingUIEvents.newMassageTimePriceingButtonClick,
    openEditMassageTimePriceingPage: massageTimePriceingUIEvents.openEditMassageTimePriceingPage,
    openDeleteMassageTimePriceingDialog: massageTimePriceingUIEvents.openDeleteMassageTimePriceingDialog,
    openDeleteMassageTimePriceingDialog: massageTimePriceingUIEvents.openDeleteMassageTimePriceingDialog,
    openFetchMassageTimePriceingDialog: massageTimePriceingUIEvents.openFetchMassageTimePriceingDialog,
    openUpdateMassageTimePriceingStatusDialog: massageTimePriceingUIEvents.openUpdateMassageTimePriceingStatusDialog,
  };
  return (
    <MassageTimePriceingUIContext.Provider value={value}>{children}</MassageTimePriceingUIContext.Provider>
  );
}