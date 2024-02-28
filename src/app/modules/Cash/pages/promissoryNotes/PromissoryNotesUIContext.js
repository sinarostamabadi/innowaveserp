import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PromissoryNoteModel } from "../../../../../core/_models/Cash/PromissoryNoteModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PromissoryNotesUIContext = createContext();

export function usePromissoryNotesUIContext() {
  return useContext(PromissoryNotesUIContext);
}

export const PromissoryNotesUIConsumer = PromissoryNotesUIContext.Consumer;

export function PromissoryNotesUIProvider({
  promissoryNotesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PromissoryNoteModel).initialFilter
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
    dataModel: PromissoryNoteModel,
    newPromissoryNoteButtonClick:
      promissoryNotesUIEvents.newPromissoryNoteButtonClick,
    openEditPromissoryNotePage:
      promissoryNotesUIEvents.openEditPromissoryNotePage,
    openDeletePromissoryNoteDialog:
      promissoryNotesUIEvents.openDeletePromissoryNoteDialog,
    openDeletePromissoryNotesDialog:
      promissoryNotesUIEvents.openDeletePromissoryNotesDialog,
    openFetchPromissoryNotesDialog:
      promissoryNotesUIEvents.openFetchPromissoryNotesDialog,
    openUpdatePromissoryNotesStatusDialog:
      promissoryNotesUIEvents.openUpdatePromissoryNotesStatusDialog,
  };
  return (
    <PromissoryNotesUIContext.Provider value={value}>
      {children}
    </PromissoryNotesUIContext.Provider>
  );
}
