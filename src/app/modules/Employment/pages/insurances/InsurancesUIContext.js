import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InsuranceModel } from "../../../../../core/_models/Employment/InsuranceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InsurancesUIContext = createContext();

export function useInsurancesUIContext() {
  return useContext(InsurancesUIContext);
}

export const InsurancesUIConsumer = InsurancesUIContext.Consumer;

export function InsurancesUIProvider({ insurancesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InsuranceModel).initialFilter
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
    dataModel: InsuranceModel,
    newInsuranceButtonClick: insurancesUIEvents.newInsuranceButtonClick,
    openEditInsurancePage: insurancesUIEvents.openEditInsurancePage,
    openDeleteInsuranceDialog: insurancesUIEvents.openDeleteInsuranceDialog,
    openDeleteInsurancesDialog: insurancesUIEvents.openDeleteInsurancesDialog,
    openFetchInsurancesDialog: insurancesUIEvents.openFetchInsurancesDialog,
    openUpdateInsurancesStatusDialog:
      insurancesUIEvents.openUpdateInsurancesStatusDialog,
  };
  return (
    <InsurancesUIContext.Provider value={value}>
      {children}
    </InsurancesUIContext.Provider>
  );
}
