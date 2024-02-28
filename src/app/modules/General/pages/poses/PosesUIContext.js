import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PosModel } from "src/core/_models/General/PosModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const PosesUIContext = createContext();

export function usePosesUIContext() {
  return useContext(PosesUIContext);
}

export const PosesUIConsumer = PosesUIContext.Consumer;

export function PosesUIProvider({ posesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PosModel).initialFilter
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
    dataModel: PosModel,
    newPosButtonClick: posesUIEvents.newPosButtonClick,
    openEditPosPage: posesUIEvents.openEditPosPage,
    openDeletePosDialog: posesUIEvents.openDeletePosDialog,
    openDeletePosesDialog: posesUIEvents.openDeletePosesDialog,
    openFetchPosesDialog: posesUIEvents.openFetchPosesDialog,
    openUpdatePosesStatusDialog: posesUIEvents.openUpdatePosesStatusDialog,
  };
  return (
    <PosesUIContext.Provider value={value}>{children}</PosesUIContext.Provider>
  );
}
