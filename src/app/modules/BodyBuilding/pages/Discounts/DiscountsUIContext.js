import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingDiscountModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DiscountsUIContext = createContext();

export function useDiscountsUIContext() {
  return useContext(DiscountsUIContext);
}

export const DiscountsUIConsumer = DiscountsUIContext.Consumer;

export function DiscountsUIProvider({ discountsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingDiscountModel).initialFilter
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
    dataModel: BodyBuildingDiscountModel,
    newDiscountButtonClick: discountsUIEvents.newDiscountButtonClick,
    openEditDiscountPage: discountsUIEvents.openEditDiscountPage,
    openDeleteDiscountDialog: discountsUIEvents.openDeleteDiscountDialog,
    openDeleteDiscountsDialog: discountsUIEvents.openDeleteDiscountsDialog,
    openFetchDiscountsDialog: discountsUIEvents.openFetchDiscountsDialog,
    openUpdateDiscountsStatusDialog:
      discountsUIEvents.openUpdateDiscountsStatusDialog,
  };
  return (
    <DiscountsUIContext.Provider value={value}>
      {children}
    </DiscountsUIContext.Provider>
  );
}
