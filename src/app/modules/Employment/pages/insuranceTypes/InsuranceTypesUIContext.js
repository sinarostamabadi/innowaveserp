import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InsuranceTypeModel } from "../../../../../core/_models/Employment/InsuranceTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InsuranceTypesUIContext = createContext();

export function useInsuranceTypesUIContext() {
  return useContext(InsuranceTypesUIContext);
}

export const InsuranceTypesUIConsumer = InsuranceTypesUIContext.Consumer;

export function InsuranceTypesUIProvider({ insuranceTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InsuranceTypeModel).initialFilter
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
    dataModel: InsuranceTypeModel,
    newInsuranceTypeButtonClick:
      insuranceTypesUIEvents.newInsuranceTypeButtonClick,
    openEditInsuranceTypePage: insuranceTypesUIEvents.openEditInsuranceTypePage,
    openDeleteInsuranceTypeDialog:
      insuranceTypesUIEvents.openDeleteInsuranceTypeDialog,
    openDeleteInsuranceTypesDialog:
      insuranceTypesUIEvents.openDeleteInsuranceTypesDialog,
    openFetchInsuranceTypesDialog:
      insuranceTypesUIEvents.openFetchInsuranceTypesDialog,
    openUpdateInsuranceTypesStatusDialog:
      insuranceTypesUIEvents.openUpdateInsuranceTypesStatusDialog,
  };
  return (
    <InsuranceTypesUIContext.Provider value={value}>
      {children}
    </InsuranceTypesUIContext.Provider>
  );
}
