
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeePromissoryNoteModel } from "../../../../../core/_models/Employment/EmployeePromissoryNoteModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeePromissoryNotesUIContext = createContext();

export function useEmployeePromissoryNotesUIContext() {
  return useContext(EmployeePromissoryNotesUIContext);
}

export const EmployeePromissoryNotesUIConsumer = EmployeePromissoryNotesUIContext.Consumer;

export function EmployeePromissoryNotesUIProvider({ employeePromissoryNotesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeePromissoryNoteModel).initialFilter
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
    dataModel: EmployeePromissoryNoteModel,
    newEmployeePromissoryNoteButtonClick: employeePromissoryNotesUIEvents.newEmployeePromissoryNoteButtonClick,
    openEditEmployeePromissoryNotePage: employeePromissoryNotesUIEvents.openEditEmployeePromissoryNotePage,
    openDeleteEmployeePromissoryNoteDialog: employeePromissoryNotesUIEvents.openDeleteEmployeePromissoryNoteDialog,
    openDeleteEmployeePromissoryNotesDialog: employeePromissoryNotesUIEvents.openDeleteEmployeePromissoryNotesDialog,
    openFetchEmployeePromissoryNotesDialog: employeePromissoryNotesUIEvents.openFetchEmployeePromissoryNotesDialog,
    openUpdateEmployeePromissoryNotesStatusDialog: employeePromissoryNotesUIEvents.openUpdateEmployeePromissoryNotesStatusDialog,
  };
  return (
    <EmployeePromissoryNotesUIContext.Provider value={value}>{children}</EmployeePromissoryNotesUIContext.Provider>
  );
}