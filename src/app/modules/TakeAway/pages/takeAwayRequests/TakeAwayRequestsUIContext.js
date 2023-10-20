import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import moment from "jalali-moment";
import { TakeAwayRequestModel } from "../../../../../core/_models/TakeAway/TakeAwayRequestModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TakeAwayRequestsUIContext = createContext();

export function useTakeAwayRequestsUIContext() {
  return useContext(TakeAwayRequestsUIContext);
}
export const TakeAwayRequestsUIConsumer = TakeAwayRequestsUIContext.Consumer;

export function TakeAwayRequestsUIProvider({ takeAwayRequestsUIEvents, children }) {
  const toDateFilter = {
    Property: "ToDate",
    Operation: 4,
    Values: [moment.from().format("YYYY-MM-DDTHH:mm:ss")],
  };
  
  const [queryParams, setQueryParamsBase] = useState(
    {...getConfig(TakeAwayRequestModel, "CreationDate", "desc").initialFilter, Filters: []}
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
    dataModel: TakeAwayRequestModel,
    newTakeAwayRequestButtonClick: takeAwayRequestsUIEvents.newTakeAwayRequestButtonClick,
    openEditTakeAwayRequestPage: takeAwayRequestsUIEvents.openEditTakeAwayRequestPage,
    openDeleteTakeAwayRequestDialog: takeAwayRequestsUIEvents.openDeleteTakeAwayRequestDialog,
    openDeleteTakeAwayRequestsDialog: takeAwayRequestsUIEvents.openDeleteTakeAwayRequestsDialog,
    openFetchTakeAwayRequestsDialog: takeAwayRequestsUIEvents.openFetchTakeAwayRequestsDialog,
    openUpdateTakeAwayRequestsStatusDialog:
      takeAwayRequestsUIEvents.openUpdateTakeAwayRequestsStatusDialog,
  };
  return (
    <TakeAwayRequestsUIContext.Provider value={value}>
      {children}
    </TakeAwayRequestsUIContext.Provider>
  );
}
