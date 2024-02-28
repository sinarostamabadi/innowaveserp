import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { SoldiershipExemptionModel } from "../../../../../core/_models/Employment/SoldiershipExemptionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const SoldiershipExemptionsUIContext = createContext();

export function useSoldiershipExemptionsUIContext() {
  return useContext(SoldiershipExemptionsUIContext);
}

export const SoldiershipExemptionsUIConsumer =
  SoldiershipExemptionsUIContext.Consumer;

export function SoldiershipExemptionsUIProvider({
  soldiershipExemptionsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(SoldiershipExemptionModel).initialFilter
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
    dataModel: SoldiershipExemptionModel,
    newSoldiershipExemptionButtonClick:
      soldiershipExemptionsUIEvents.newSoldiershipExemptionButtonClick,
    openEditSoldiershipExemptionPage:
      soldiershipExemptionsUIEvents.openEditSoldiershipExemptionPage,
    openDeleteSoldiershipExemptionDialog:
      soldiershipExemptionsUIEvents.openDeleteSoldiershipExemptionDialog,
    openDeleteSoldiershipExemptionsDialog:
      soldiershipExemptionsUIEvents.openDeleteSoldiershipExemptionsDialog,
    openFetchSoldiershipExemptionsDialog:
      soldiershipExemptionsUIEvents.openFetchSoldiershipExemptionsDialog,
    openUpdateSoldiershipExemptionsStatusDialog:
      soldiershipExemptionsUIEvents.openUpdateSoldiershipExemptionsStatusDialog,
  };
  return (
    <SoldiershipExemptionsUIContext.Provider value={value}>
      {children}
    </SoldiershipExemptionsUIContext.Provider>
  );
}
