
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AssignmentSerialModel } from "../../../../../core/_models/Warehouse/AssignmentSerialModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AssignmentSerialsUIContext = createContext();

export function useAssignmentSerialsUIContext() {
  return useContext(AssignmentSerialsUIContext);
}

export const AssignmentSerialsUIConsumer = AssignmentSerialsUIContext.Consumer;

export function AssignmentSerialsUIProvider({ assignmentSerialsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AssignmentSerialModel).initialFilter
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
    dataModel: AssignmentSerialModel,
    newAssignmentSerialButtonClick: assignmentSerialsUIEvents.newAssignmentSerialButtonClick,
    openEditAssignmentSerialPage: assignmentSerialsUIEvents.openEditAssignmentSerialPage,
    openDeleteAssignmentSerialDialog: assignmentSerialsUIEvents.openDeleteAssignmentSerialDialog,
    openDeleteAssignmentSerialsDialog: assignmentSerialsUIEvents.openDeleteAssignmentSerialsDialog,
    openFetchAssignmentSerialsDialog: assignmentSerialsUIEvents.openFetchAssignmentSerialsDialog,
    openUpdateAssignmentSerialsStatusDialog: assignmentSerialsUIEvents.openUpdateAssignmentSerialsStatusDialog,
  };
  return (
    <AssignmentSerialsUIContext.Provider value={value}>{children}</AssignmentSerialsUIContext.Provider>
  );
}