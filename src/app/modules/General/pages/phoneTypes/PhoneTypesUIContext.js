
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PhoneTypeModel } from "../../../../../core/_models/General/PhoneTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PhoneTypesUIContext = createContext();

export function usePhoneTypesUIContext() {
  return useContext(PhoneTypesUIContext);
}

export const PhoneTypesUIConsumer = PhoneTypesUIContext.Consumer;

export function PhoneTypesUIProvider({ phoneTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PhoneTypeModel).initialFilter
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
    dataModel: PhoneTypeModel,
    newPhoneTypeButtonClick: phoneTypesUIEvents.newPhoneTypeButtonClick,
    openEditPhoneTypePage: phoneTypesUIEvents.openEditPhoneTypePage,
    openDeletePhoneTypeDialog: phoneTypesUIEvents.openDeletePhoneTypeDialog,
    openDeletePhoneTypesDialog: phoneTypesUIEvents.openDeletePhoneTypesDialog,
    openFetchPhoneTypesDialog: phoneTypesUIEvents.openFetchPhoneTypesDialog,
    openUpdatePhoneTypesStatusDialog: phoneTypesUIEvents.openUpdatePhoneTypesStatusDialog,
  };
  return (
    <PhoneTypesUIContext.Provider value={value}>{children}</PhoneTypesUIContext.Provider>
  );
}