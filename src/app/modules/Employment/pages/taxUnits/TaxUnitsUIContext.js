import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { TaxUnitModel } from "../../../../../core/_models/Employment/TaxUnitModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const TaxUnitsUIContext = createContext();

export function useTaxUnitsUIContext() {
  return useContext(TaxUnitsUIContext);
}

export const TaxUnitsUIConsumer = TaxUnitsUIContext.Consumer;

export function TaxUnitsUIProvider({ taxUnitsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(TaxUnitModel).initialFilter
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
    dataModel: TaxUnitModel,
    newTaxUnitButtonClick: taxUnitsUIEvents.newTaxUnitButtonClick,
    openEditTaxUnitPage: taxUnitsUIEvents.openEditTaxUnitPage,
    openDeleteTaxUnitDialog: taxUnitsUIEvents.openDeleteTaxUnitDialog,
    openDeleteTaxUnitsDialog: taxUnitsUIEvents.openDeleteTaxUnitsDialog,
    openFetchTaxUnitsDialog: taxUnitsUIEvents.openFetchTaxUnitsDialog,
    openUpdateTaxUnitsStatusDialog:
      taxUnitsUIEvents.openUpdateTaxUnitsStatusDialog,
  };
  return (
    <TaxUnitsUIContext.Provider value={value}>
      {children}
    </TaxUnitsUIContext.Provider>
  );
}
