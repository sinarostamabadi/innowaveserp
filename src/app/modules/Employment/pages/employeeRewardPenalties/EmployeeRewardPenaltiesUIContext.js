
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeRewardPenaltyModel } from "../../../../../core/_models/Employment/EmployeeRewardPenaltyModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeRewardPenaltiesUIContext = createContext();

export function useEmployeeRewardPenaltiesUIContext() {
  return useContext(EmployeeRewardPenaltiesUIContext);
}

export const EmployeeRewardPenaltiesUIConsumer = EmployeeRewardPenaltiesUIContext.Consumer;

export function EmployeeRewardPenaltiesUIProvider({ employeeRewardPenaltiesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeRewardPenaltyModel).initialFilter
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
    dataModel: EmployeeRewardPenaltyModel,
    newEmployeeRewardPenaltyButtonClick: employeeRewardPenaltiesUIEvents.newEmployeeRewardPenaltyButtonClick,
    openEditEmployeeRewardPenaltyPage: employeeRewardPenaltiesUIEvents.openEditEmployeeRewardPenaltyPage,
    openDeleteEmployeeRewardPenaltyDialog: employeeRewardPenaltiesUIEvents.openDeleteEmployeeRewardPenaltyDialog,
    openDeleteEmployeeRewardPenaltiesDialog: employeeRewardPenaltiesUIEvents.openDeleteEmployeeRewardPenaltiesDialog,
    openFetchEmployeeRewardPenaltiesDialog: employeeRewardPenaltiesUIEvents.openFetchEmployeeRewardPenaltiesDialog,
    openUpdateEmployeeRewardPenaltiesStatusDialog: employeeRewardPenaltiesUIEvents.openUpdateEmployeeRewardPenaltiesStatusDialog,
  };
  return (
    <EmployeeRewardPenaltiesUIContext.Provider value={value}>{children}</EmployeeRewardPenaltiesUIContext.Provider>
  );
}