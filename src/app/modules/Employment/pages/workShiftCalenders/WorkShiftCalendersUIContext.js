import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { WorkShiftCalenderModel } from "../../../../../core/_models/Employment/WorkShiftCalenderModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const WorkShiftCalendersUIContext = createContext();

export function useWorkShiftCalendersUIContext() {
  return useContext(WorkShiftCalendersUIContext);
}

export const WorkShiftCalendersUIConsumer =
  WorkShiftCalendersUIContext.Consumer;

export function WorkShiftCalendersUIProvider({
  workShiftCalendersUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(WorkShiftCalenderModel).initialFilter
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
    dataModel: WorkShiftCalenderModel,
    newWorkShiftCalenderButtonClick:
      workShiftCalendersUIEvents.newWorkShiftCalenderButtonClick,
    openEditWorkShiftCalenderPage:
      workShiftCalendersUIEvents.openEditWorkShiftCalenderPage,
    openDeleteWorkShiftCalenderDialog:
      workShiftCalendersUIEvents.openDeleteWorkShiftCalenderDialog,
    openDeleteWorkShiftCalendersDialog:
      workShiftCalendersUIEvents.openDeleteWorkShiftCalendersDialog,
    openFetchWorkShiftCalendersDialog:
      workShiftCalendersUIEvents.openFetchWorkShiftCalendersDialog,
    openUpdateWorkShiftCalendersStatusDialog:
      workShiftCalendersUIEvents.openUpdateWorkShiftCalendersStatusDialog,
  };
  return (
    <WorkShiftCalendersUIContext.Provider value={value}>
      {children}
    </WorkShiftCalendersUIContext.Provider>
  );
}
