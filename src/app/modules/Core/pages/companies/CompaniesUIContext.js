import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CompanyModel } from "../../../../../core/_models/Core/CompanyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const CompaniesUIContext = createContext();
export function useCompaniesUIContext() {
  return useContext(CompaniesUIContext);
}
export const CompaniesUIConsumer = CompaniesUIContext.Consumer;
export function CompaniesUIProvider({ companiesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CompanyModel).initialFilter
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
    dataModel: CompanyModel,
    newCompanyButtonClick: companiesUIEvents.newCompanyButtonClick,
    openEditCompanyPage: companiesUIEvents.openEditCompanyPage,
    openDeleteCompanyDialog: companiesUIEvents.openDeleteCompanyDialog,
    openDeleteCompaniesDialog: companiesUIEvents.openDeleteCompaniesDialog,
    openFetchCompaniesDialog: companiesUIEvents.openFetchCompaniesDialog,
    openUpdateCompaniesStatusDialog:
      companiesUIEvents.openUpdateCompaniesStatusDialog,
  };
  return (
    <CompaniesUIContext.Provider value={value}>
      {children}
    </CompaniesUIContext.Provider>
  );
}
