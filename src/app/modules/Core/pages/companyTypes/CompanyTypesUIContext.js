import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CompanyTypeModel } from "../../../../../core/_models/Core/CompanyTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const CompanyTypesUIContext = createContext();
export function useCompanyTypesUIContext() {
  return useContext(CompanyTypesUIContext);
}
export const CompanyTypesUIConsumer = CompanyTypesUIContext.Consumer;
export function CompanyTypesUIProvider({ companyTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CompanyTypeModel).initialFilter
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
    dataModel: CompanyTypeModel,
    newCompanyTypeButtonClick: companyTypesUIEvents.newCompanyTypeButtonClick,
    openEditCompanyTypePage: companyTypesUIEvents.openEditCompanyTypePage,
    openDeleteCompanyTypeDialog:
      companyTypesUIEvents.openDeleteCompanyTypeDialog,
    openDeleteCompanyTypesDialog:
      companyTypesUIEvents.openDeleteCompanyTypesDialog,
    openFetchCompanyTypesDialog:
      companyTypesUIEvents.openFetchCompanyTypesDialog,
    openUpdateCompanyTypesStatusDialog:
      companyTypesUIEvents.openUpdateCompanyTypesStatusDialog,
  };
  return (
    <CompanyTypesUIContext.Provider value={value}>
      {children}
    </CompanyTypesUIContext.Provider>
  );
}
