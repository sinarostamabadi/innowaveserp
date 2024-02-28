import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { WorkShiftModel } from "../../../../../core/_models/Employment/WorkShiftModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const WorkShiftsUIContext = createContext();

export function useWorkShiftsUIContext() {
  return useContext(WorkShiftsUIContext);
}

export const WorkShiftsUIConsumer = WorkShiftsUIContext.Consumer;

export function WorkShiftsUIProvider({ workShiftsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(WorkShiftModel).initialFilter
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
    dataModel: WorkShiftModel,
    newWorkShiftButtonClick: workShiftsUIEvents.newWorkShiftButtonClick,
    openEditWorkShiftPage: workShiftsUIEvents.openEditWorkShiftPage,
    openDeleteWorkShiftDialog: workShiftsUIEvents.openDeleteWorkShiftDialog,
    openDeleteWorkShiftsDialog: workShiftsUIEvents.openDeleteWorkShiftsDialog,
    openFetchWorkShiftsDialog: workShiftsUIEvents.openFetchWorkShiftsDialog,
    openUpdateWorkShiftsStatusDialog:
      workShiftsUIEvents.openUpdateWorkShiftsStatusDialog,
  };
  return (
    <WorkShiftsUIContext.Provider value={value}>
      {children}
    </WorkShiftsUIContext.Provider>
  );
}
