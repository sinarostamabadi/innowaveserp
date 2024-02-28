import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SetPricingModel } from "../../../../../core/_models/Bowling/SetPricingModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SetPricingUIContext = createContext();

export function useSetPricingUIContext() {
  return useContext(SetPricingUIContext);
}

export const SetPricingUIConsumer = SetPricingUIContext.Consumer;

export function SetPricingUIProvider({ setPricingUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SetPricingModel).initialFilter
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
    dataModel: SetPricingModel,
    newSetPricingButtonClick: setPricingUIEvents.newSetPricingButtonClick,
    openEditSetPricingPage: setPricingUIEvents.openEditSetPricingPage,
    openDeleteSetPricingDialog: setPricingUIEvents.openDeleteSetPricingDialog,
    openFetchSetPricingDialog: setPricingUIEvents.openFetchSetPricingDialog,
    openUpdateSetPricingStatusDialog:
      setPricingUIEvents.openUpdateSetPricingStatusDialog,
  };
  return (
    <SetPricingUIContext.Provider value={value}>
      {children}
    </SetPricingUIContext.Provider>
  );
}
