
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LeaveTypeModel } from "../../../../../core/_models/Employment/LeaveTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LeaveTypesUIContext = createContext();

export function useLeaveTypesUIContext() {
  return useContext(LeaveTypesUIContext);
}

export const LeaveTypesUIConsumer = LeaveTypesUIContext.Consumer;

export function LeaveTypesUIProvider({ leaveTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LeaveTypeModel).initialFilter
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
    dataModel: LeaveTypeModel,
    newLeaveTypeButtonClick: leaveTypesUIEvents.newLeaveTypeButtonClick,
    openEditLeaveTypePage: leaveTypesUIEvents.openEditLeaveTypePage,
    openDeleteLeaveTypeDialog: leaveTypesUIEvents.openDeleteLeaveTypeDialog,
    openDeleteLeaveTypesDialog: leaveTypesUIEvents.openDeleteLeaveTypesDialog,
    openFetchLeaveTypesDialog: leaveTypesUIEvents.openFetchLeaveTypesDialog,
    openUpdateLeaveTypesStatusDialog: leaveTypesUIEvents.openUpdateLeaveTypesStatusDialog,
  };
  return (
    <LeaveTypesUIContext.Provider value={value}>{children}</LeaveTypesUIContext.Provider>
  );
}