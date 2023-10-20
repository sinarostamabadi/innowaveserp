
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeContractModel } from "../../../../../core/_models/Employment/EmployeeContractModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeContractsUIContext = createContext();

export function useEmployeeContractsUIContext() {
  return useContext(EmployeeContractsUIContext);
}

export const EmployeeContractsUIConsumer = EmployeeContractsUIContext.Consumer;

export function EmployeeContractsUIProvider({ employeeContractsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeContractModel).initialFilter
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
    dataModel: EmployeeContractModel,
    newEmployeeContractButtonClick: employeeContractsUIEvents.newEmployeeContractButtonClick,
    openEditEmployeeContractPage: employeeContractsUIEvents.openEditEmployeeContractPage,
    openDeleteEmployeeContractDialog: employeeContractsUIEvents.openDeleteEmployeeContractDialog,
    openDeleteEmployeeContractsDialog: employeeContractsUIEvents.openDeleteEmployeeContractsDialog,
    openFetchEmployeeContractsDialog: employeeContractsUIEvents.openFetchEmployeeContractsDialog,
    openUpdateEmployeeContractsStatusDialog: employeeContractsUIEvents.openUpdateEmployeeContractsStatusDialog,
  };
  return (
    <EmployeeContractsUIContext.Provider value={value}>{children}</EmployeeContractsUIContext.Provider>
  );
}