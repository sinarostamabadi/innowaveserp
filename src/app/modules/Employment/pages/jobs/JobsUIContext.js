import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { JobModel } from "../../../../../core/_models/Employment/JobModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const JobsUIContext = createContext();

export function useJobsUIContext() {
  return useContext(JobsUIContext);
}

export const JobsUIConsumer = JobsUIContext.Consumer;

export function JobsUIProvider({ jobsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(JobModel).initialFilter
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
    dataModel: JobModel,
    newJobButtonClick: jobsUIEvents.newJobButtonClick,
    openEditJobPage: jobsUIEvents.openEditJobPage,
    openDeleteJobDialog: jobsUIEvents.openDeleteJobDialog,
    openDeleteJobsDialog: jobsUIEvents.openDeleteJobsDialog,
    openFetchJobsDialog: jobsUIEvents.openFetchJobsDialog,
    openUpdateJobsStatusDialog: jobsUIEvents.openUpdateJobsStatusDialog,
  };
  return (
    <JobsUIContext.Provider value={value}>{children}</JobsUIContext.Provider>
  );
}
