import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { LineModel } from "../../../../../core/_models/Bowling/LineModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const LinesUIContext = createContext();

export function useLinesUIContext() {
  return useContext(LinesUIContext);
}

export const LinesUIConsumer = LinesUIContext.Consumer;

export function LinesUIProvider({ linesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(LineModel).initialFilter
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
    dataModel: LineModel,
    newLineButtonClick: linesUIEvents.newLineButtonClick,
    openEditLinePage: linesUIEvents.openEditLinePage,
    openDeleteLineDialog: linesUIEvents.openDeleteLineDialog,
    openDeleteLinesDialog: linesUIEvents.openDeleteLinesDialog,
    openFetchLinesDialog: linesUIEvents.openFetchLinesDialog,
    openUpdateLinesStatusDialog: linesUIEvents.openUpdateLinesStatusDialog,
  };
  return (
    <LinesUIContext.Provider value={value}>{children}</LinesUIContext.Provider>
  );
}
