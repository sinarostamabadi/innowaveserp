
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AssignmentDtlModel } from "../../../../../core/_models/Warehouse/AssignmentDtlModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AssignmentDtlsUIContext = createContext();

export function useAssignmentDtlsUIContext() {
  return useContext(AssignmentDtlsUIContext);
}

export const AssignmentDtlsUIConsumer = AssignmentDtlsUIContext.Consumer;

export function AssignmentDtlsUIProvider({ assignmentDtlsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AssignmentDtlModel).initialFilter
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
    dataModel: AssignmentDtlModel,
    newAssignmentDtlButtonClick: assignmentDtlsUIEvents.newAssignmentDtlButtonClick,
    openEditAssignmentDtlPage: assignmentDtlsUIEvents.openEditAssignmentDtlPage,
    openDeleteAssignmentDtlDialog: assignmentDtlsUIEvents.openDeleteAssignmentDtlDialog,
    openDeleteAssignmentDtlsDialog: assignmentDtlsUIEvents.openDeleteAssignmentDtlsDialog,
    openFetchAssignmentDtlsDialog: assignmentDtlsUIEvents.openFetchAssignmentDtlsDialog,
    openUpdateAssignmentDtlsStatusDialog: assignmentDtlsUIEvents.openUpdateAssignmentDtlsStatusDialog,
  };
  return (
    <AssignmentDtlsUIContext.Provider value={value}>{children}</AssignmentDtlsUIContext.Provider>
  );
}