import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PhoneModel } from "../../../../../core/_models/Core/PhoneModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const PhonesUIContext = createContext();
export function usePhonesUIContext() {
  return useContext(PhonesUIContext);
}
export const PhonesUIConsumer = PhonesUIContext.Consumer;
export function PhonesUIProvider({ phonesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PhoneModel).initialFilter
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
    dataModel: PhoneModel,
    newPhoneButtonClick: phonesUIEvents.newPhoneButtonClick,
    openEditPhonePage: phonesUIEvents.openEditPhonePage,
    openDeletePhoneDialog: phonesUIEvents.openDeletePhoneDialog,
    openDeletePhonesDialog: phonesUIEvents.openDeletePhonesDialog,
    openFetchPhonesDialog: phonesUIEvents.openFetchPhonesDialog,
    openUpdatePhonesStatusDialog: phonesUIEvents.openUpdatePhonesStatusDialog,
  };
  return (
    <PhonesUIContext.Provider value={value}>
      {children}
    </PhonesUIContext.Provider>
  );
}
