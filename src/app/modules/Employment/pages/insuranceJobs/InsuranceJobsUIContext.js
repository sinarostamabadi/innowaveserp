import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InsuranceJobModel } from "../../../../../core/_models/Employment/InsuranceJobModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InsuranceJobsUIContext = createContext();

export function useInsuranceJobsUIContext() {
  return useContext(InsuranceJobsUIContext);
}

export const InsuranceJobsUIConsumer = InsuranceJobsUIContext.Consumer;

export function InsuranceJobsUIProvider({ insuranceJobsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InsuranceJobModel).initialFilter
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
    dataModel: InsuranceJobModel,
    newInsuranceJobButtonClick:
      insuranceJobsUIEvents.newInsuranceJobButtonClick,
    openEditInsuranceJobPage: insuranceJobsUIEvents.openEditInsuranceJobPage,
    openDeleteInsuranceJobDialog:
      insuranceJobsUIEvents.openDeleteInsuranceJobDialog,
    openDeleteInsuranceJobsDialog:
      insuranceJobsUIEvents.openDeleteInsuranceJobsDialog,
    openFetchInsuranceJobsDialog:
      insuranceJobsUIEvents.openFetchInsuranceJobsDialog,
    openUpdateInsuranceJobsStatusDialog:
      insuranceJobsUIEvents.openUpdateInsuranceJobsStatusDialog,
  };
  return (
    <InsuranceJobsUIContext.Provider value={value}>
      {children}
    </InsuranceJobsUIContext.Provider>
  );
}
