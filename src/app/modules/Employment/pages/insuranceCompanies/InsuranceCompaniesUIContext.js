import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InsuranceCompanyModel } from "../../../../../core/_models/Employment/InsuranceCompanyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InsuranceCompaniesUIContext = createContext();

export function useInsuranceCompaniesUIContext() {
  return useContext(InsuranceCompaniesUIContext);
}

export const InsuranceCompaniesUIConsumer =
  InsuranceCompaniesUIContext.Consumer;

export function InsuranceCompaniesUIProvider({
  insuranceCompaniesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InsuranceCompanyModel).initialFilter
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
    dataModel: InsuranceCompanyModel,
    newInsuranceCompanyButtonClick:
      insuranceCompaniesUIEvents.newInsuranceCompanyButtonClick,
    openEditInsuranceCompanyPage:
      insuranceCompaniesUIEvents.openEditInsuranceCompanyPage,
    openDeleteInsuranceCompanyDialog:
      insuranceCompaniesUIEvents.openDeleteInsuranceCompanyDialog,
    openDeleteInsuranceCompaniesDialog:
      insuranceCompaniesUIEvents.openDeleteInsuranceCompaniesDialog,
    openFetchInsuranceCompaniesDialog:
      insuranceCompaniesUIEvents.openFetchInsuranceCompaniesDialog,
    openUpdateInsuranceCompaniesStatusDialog:
      insuranceCompaniesUIEvents.openUpdateInsuranceCompaniesStatusDialog,
  };
  return (
    <InsuranceCompaniesUIContext.Provider value={value}>
      {children}
    </InsuranceCompaniesUIContext.Provider>
  );
}
