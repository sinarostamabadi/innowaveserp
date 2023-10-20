import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EducationModel } from "../../../../../core/_models/General/EducationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EducationsUIContext = createContext();

export function useEducationsUIContext() {
  return useContext(EducationsUIContext);
}

export const EducationsUIConsumer = EducationsUIContext.Consumer;

export function EducationsUIProvider({ educationsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EducationModel).initialFilter
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
    dataModel: EducationModel,
    newEducationButtonClick: educationsUIEvents.newEducationButtonClick,
    openEditEducationPage: educationsUIEvents.openEditEducationPage,
    openDeleteEducationDialog: educationsUIEvents.openDeleteEducationDialog,
    openDeleteEducationsDialog: educationsUIEvents.openDeleteEducationsDialog,
    openFetchEducationsDialog: educationsUIEvents.openFetchEducationsDialog,
    openUpdateEducationsStatusDialog: educationsUIEvents.openUpdateEducationsStatusDialog,
  };
  return (
    <EducationsUIContext.Provider value={value}>{children}</EducationsUIContext.Provider>
  );
}