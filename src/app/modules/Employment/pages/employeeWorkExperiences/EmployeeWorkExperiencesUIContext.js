
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeWorkExperienceModel } from "../../../../../core/_models/Employment/EmployeeWorkExperienceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeWorkExperiencesUIContext = createContext();

export function useEmployeeWorkExperiencesUIContext() {
  return useContext(EmployeeWorkExperiencesUIContext);
}

export const EmployeeWorkExperiencesUIConsumer = EmployeeWorkExperiencesUIContext.Consumer;

export function EmployeeWorkExperiencesUIProvider({ employeeWorkExperiencesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeWorkExperienceModel).initialFilter
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
    dataModel: EmployeeWorkExperienceModel,
    newEmployeeWorkExperienceButtonClick: employeeWorkExperiencesUIEvents.newEmployeeWorkExperienceButtonClick,
    openEditEmployeeWorkExperiencePage: employeeWorkExperiencesUIEvents.openEditEmployeeWorkExperiencePage,
    openDeleteEmployeeWorkExperienceDialog: employeeWorkExperiencesUIEvents.openDeleteEmployeeWorkExperienceDialog,
    openDeleteEmployeeWorkExperiencesDialog: employeeWorkExperiencesUIEvents.openDeleteEmployeeWorkExperiencesDialog,
    openFetchEmployeeWorkExperiencesDialog: employeeWorkExperiencesUIEvents.openFetchEmployeeWorkExperiencesDialog,
    openUpdateEmployeeWorkExperiencesStatusDialog: employeeWorkExperiencesUIEvents.openUpdateEmployeeWorkExperiencesStatusDialog,
  };
  return (
    <EmployeeWorkExperiencesUIContext.Provider value={value}>{children}</EmployeeWorkExperiencesUIContext.Provider>
  );
}