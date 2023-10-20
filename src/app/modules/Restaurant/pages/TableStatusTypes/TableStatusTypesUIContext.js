
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { TableStatusTypeModel } from "../../../../../core/_models//TableStatusTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TableStatusTypesUIContext = createContext();

export function useTableStatusTypesUIContext() {
  return useContext(TableStatusTypesUIContext);
}

export const TableStatusTypesUIConsumer = TableStatusTypesUIContext.Consumer;

export function TableStatusTypesUIProvider({ tableStatusTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(TableStatusTypeModel).initialFilter
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
    dataModel: TableStatusTypeModel,
    newTableStatusTypeButtonClick: tableStatusTypesUIEvents.newTableStatusTypeButtonClick,
    openEditTableStatusTypePage: tableStatusTypesUIEvents.openEditTableStatusTypePage,
    openDeleteTableStatusTypeDialog: tableStatusTypesUIEvents.openDeleteTableStatusTypeDialog,
    openDeleteTableStatusTypesDialog: tableStatusTypesUIEvents.openDeleteTableStatusTypesDialog,
    openFetchTableStatusTypesDialog: tableStatusTypesUIEvents.openFetchTableStatusTypesDialog,
    openUpdateTableStatusTypesStatusDialog: tableStatusTypesUIEvents.openUpdateTableStatusTypesStatusDialog,
  };
  return (
    <TableStatusTypesUIContext.Provider value={value}>{children}</TableStatusTypesUIContext.Provider>
  );
}