import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MajorModel } from "../../../../../core/_models/General/MajorModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MajorsUIContext = createContext();

export function useMajorsUIContext() {
  return useContext(MajorsUIContext);
}

export const MajorsUIConsumer = MajorsUIContext.Consumer;

export function MajorsUIProvider({ majorsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MajorModel).initialFilter
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
    dataModel: MajorModel,
    newMajorButtonClick: majorsUIEvents.newMajorButtonClick,
    openEditMajorPage: majorsUIEvents.openEditMajorPage,
    openDeleteMajorDialog: majorsUIEvents.openDeleteMajorDialog,
    openDeleteMajorsDialog: majorsUIEvents.openDeleteMajorsDialog,
    openFetchMajorsDialog: majorsUIEvents.openFetchMajorsDialog,
    openUpdateMajorsStatusDialog: majorsUIEvents.openUpdateMajorsStatusDialog,
  };
  return (
    <MajorsUIContext.Provider value={value}>
      {children}
    </MajorsUIContext.Provider>
  );
}
