import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ReserveModel } from "../../../../../core/_models/Bowling/ReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ReservesUIContext = createContext();

export function useReservesUIContext() {
  return useContext(ReservesUIContext);
}

export const ReservesUIConsumer = ReservesUIContext.Consumer;

export function ReservesUIProvider({ reservesUIEvents, children }) {
  const defaultFilter = {
    Property: "IsActive",
    Operation: 5,
    Values: ["1"],
  };
  const [queryParams, setQueryParamsBase] = useState({
    ...getConfig(ReserveModel).initialFilter,
    Filters: [defaultFilter],
  });

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

  const [showReportDialog, setShowReportDialog] = useState(false);
  const openReportDialog = () => {
    setShowReportDialog(true);
  };
  const closeReportDialog = () => {
    setShowReportDialog(false);
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    dataModel: ReserveModel,
    showReportDialog,
    openReportDialog,
    closeReportDialog,
    newReserveButtonClick: reservesUIEvents.newReserveButtonClick,
    openEditReservePage: reservesUIEvents.openEditReservePage,
    openDoneReserveDialog: reservesUIEvents.openDoneReserveDialog,
    openAddTimeReserveDialog: reservesUIEvents.openAddTimeReserveDialog,
    openDeleteReserveDialog: reservesUIEvents.openDeleteReserveDialog,
    openDeleteReservesDialog: reservesUIEvents.openDeleteReservesDialog,
    openFetchReservesDialog: reservesUIEvents.openFetchReservesDialog,
    openUpdateReservesStatusDialog:
      reservesUIEvents.openUpdateReservesStatusDialog,
    openRelocationDialog: reservesUIEvents.openRelocationDialog,
  };

  return (
    <ReservesUIContext.Provider value={value}>
      {children}
    </ReservesUIContext.Provider>
  );
}
