import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageReserveModel } from "../../../../../core/_models/Massage/MassageReserveModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageReservesUIContext = createContext();

export function useMassageReservesUIContext() {
  return useContext(MassageReservesUIContext);
}

export const MassageReservesUIConsumer = MassageReservesUIContext.Consumer;

export function MassageReservesUIProvider({
  massageReservesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageReserveModel).initialFilter
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
    dataModel: MassageReserveModel,
    newMassageReserveButtonClick:
      massageReservesUIEvents.newMassageReserveButtonClick,
    openEditMassageReservePage:
      massageReservesUIEvents.openEditMassageReservePage,
    openDeleteMassageReserveDialog:
      massageReservesUIEvents.openDeleteMassageReserveDialog,
    openDeleteMassageReservesDialog:
      massageReservesUIEvents.openDeleteMassageReservesDialog,
    openFetchMassageReservesDialog:
      massageReservesUIEvents.openFetchMassageReservesDialog,
    openUpdateMassageReservesStatusDialog:
      massageReservesUIEvents.openUpdateMassageReservesStatusDialog,
  };
  return (
    <MassageReservesUIContext.Provider value={value}>
      {children}
    </MassageReservesUIContext.Provider>
  );
}
