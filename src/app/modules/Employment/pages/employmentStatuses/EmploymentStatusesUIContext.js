
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmploymentStatusModel } from "../../../../../core/_models/Employment/EmploymentStatusModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmploymentStatusesUIContext = createContext();

export function useEmploymentStatusesUIContext() {
  return useContext(EmploymentStatusesUIContext);
}

export const EmploymentStatusesUIConsumer = EmploymentStatusesUIContext.Consumer;

export function EmploymentStatusesUIProvider({ employmentStatusesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmploymentStatusModel).initialFilter
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
    dataModel: EmploymentStatusModel,
    newEmploymentStatusButtonClick: employmentStatusesUIEvents.newEmploymentStatusButtonClick,
    openEditEmploymentStatusPage: employmentStatusesUIEvents.openEditEmploymentStatusPage,
    openDeleteEmploymentStatusDialog: employmentStatusesUIEvents.openDeleteEmploymentStatusDialog,
    openDeleteEmploymentStatusesDialog: employmentStatusesUIEvents.openDeleteEmploymentStatusesDialog,
    openFetchEmploymentStatusesDialog: employmentStatusesUIEvents.openFetchEmploymentStatusesDialog,
    openUpdateEmploymentStatusesStatusDialog: employmentStatusesUIEvents.openUpdateEmploymentStatusesStatusDialog,
  };
  return (
    <EmploymentStatusesUIContext.Provider value={value}>{children}</EmploymentStatusesUIContext.Provider>
  );
}