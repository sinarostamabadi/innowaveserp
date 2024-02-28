import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageReservePriceModel } from "../../../../../core/_models/Massage/MassageReservePriceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageReservePricesUIContext = createContext();

export function useMassageReservePricesUIContext() {
  return useContext(MassageReservePricesUIContext);
}

export const MassageReservePricesUIConsumer =
  MassageReservePricesUIContext.Consumer;

export function MassageReservePricesUIProvider({
  massageReservePricesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageReservePriceModel).initialFilter
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
    dataModel: MassageReservePriceModel,
    newMassageReservePriceButtonClick:
      massageReservePricesUIEvents.newMassageReservePriceButtonClick,
    openEditMassageReservePricePage:
      massageReservePricesUIEvents.openEditMassageReservePricePage,
    openDeleteMassageReservePriceDialog:
      massageReservePricesUIEvents.openDeleteMassageReservePriceDialog,
    openDeleteMassageReservePricesDialog:
      massageReservePricesUIEvents.openDeleteMassageReservePricesDialog,
    openFetchMassageReservePricesDialog:
      massageReservePricesUIEvents.openFetchMassageReservePricesDialog,
    openUpdateMassageReservePricesStatusDialog:
      massageReservePricesUIEvents.openUpdateMassageReservePricesStatusDialog,
  };
  return (
    <MassageReservePricesUIContext.Provider value={value}>
      {children}
    </MassageReservePricesUIContext.Provider>
  );
}
