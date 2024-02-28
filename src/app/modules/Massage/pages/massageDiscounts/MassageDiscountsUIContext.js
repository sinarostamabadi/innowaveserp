import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { MassageDiscountModel } from "../../../../../core/_models/Massage/MassageDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const MassageDiscountsUIContext = createContext();

export function useMassageDiscountsUIContext() {
  return useContext(MassageDiscountsUIContext);
}

export const MassageDiscountsUIConsumer = MassageDiscountsUIContext.Consumer;

export function MassageDiscountsUIProvider({
  massageDiscountsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(MassageDiscountModel).initialFilter
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
    dataModel: MassageDiscountModel,
    newMassageDiscountButtonClick:
      massageDiscountsUIEvents.newMassageDiscountButtonClick,
    openEditMassageDiscountPage:
      massageDiscountsUIEvents.openEditMassageDiscountPage,
    openDeleteMassageDiscountDialog:
      massageDiscountsUIEvents.openDeleteMassageDiscountDialog,
    openDeleteMassageDiscountsDialog:
      massageDiscountsUIEvents.openDeleteMassageDiscountsDialog,
    openFetchMassageDiscountsDialog:
      massageDiscountsUIEvents.openFetchMassageDiscountsDialog,
    openUpdateMassageDiscountsStatusDialog:
      massageDiscountsUIEvents.openUpdateMassageDiscountsStatusDialog,
  };
  return (
    <MassageDiscountsUIContext.Provider value={value}>
      {children}
    </MassageDiscountsUIContext.Provider>
  );
}
