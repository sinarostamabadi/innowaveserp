import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeInsuranceModel } from "../../../../../core/_models/Employment/EmployeeInsuranceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeInsurancesUIContext = createContext();

export function useEmployeeInsurancesUIContext() {
  return useContext(EmployeeInsurancesUIContext);
}

export const EmployeeInsurancesUIConsumer =
  EmployeeInsurancesUIContext.Consumer;

export function EmployeeInsurancesUIProvider({
  employeeInsurancesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeInsuranceModel).initialFilter
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
    dataModel: EmployeeInsuranceModel,
    newEmployeeInsuranceButtonClick:
      employeeInsurancesUIEvents.newEmployeeInsuranceButtonClick,
    openEditEmployeeInsurancePage:
      employeeInsurancesUIEvents.openEditEmployeeInsurancePage,
    openDeleteEmployeeInsuranceDialog:
      employeeInsurancesUIEvents.openDeleteEmployeeInsuranceDialog,
    openDeleteEmployeeInsurancesDialog:
      employeeInsurancesUIEvents.openDeleteEmployeeInsurancesDialog,
    openFetchEmployeeInsurancesDialog:
      employeeInsurancesUIEvents.openFetchEmployeeInsurancesDialog,
    openUpdateEmployeeInsurancesStatusDialog:
      employeeInsurancesUIEvents.openUpdateEmployeeInsurancesStatusDialog,
  };
  return (
    <EmployeeInsurancesUIContext.Provider value={value}>
      {children}
    </EmployeeInsurancesUIContext.Provider>
  );
}
