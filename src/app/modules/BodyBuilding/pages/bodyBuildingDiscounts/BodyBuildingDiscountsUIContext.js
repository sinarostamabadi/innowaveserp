import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingDiscountModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingDiscountModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BodyBuildingDiscountsUIContext = createContext();

export function useBodyBuildingDiscountsUIContext() {
  return useContext(BodyBuildingDiscountsUIContext);
}

export const BodyBuildingDiscountsUIConsumer =
  BodyBuildingDiscountsUIContext.Consumer;

export function BodyBuildingDiscountsUIProvider({
  bodyBuildingDiscountsUIEvents,
  children,
}) {
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
    newBodyBuildingDiscountButtonClick:
      bodyBuildingDiscountsUIEvents.newBodyBuildingDiscountButtonClick,
    openEditBodyBuildingDiscountPage:
      bodyBuildingDiscountsUIEvents.openEditBodyBuildingDiscountPage,
    openDeleteBodyBuildingDiscountDialog:
      bodyBuildingDiscountsUIEvents.openDeleteBodyBuildingDiscountDialog,
    openDeleteBodyBuildingDiscountsDialog:
      bodyBuildingDiscountsUIEvents.openDeleteBodyBuildingDiscountsDialog,
    openFetchBodyBuildingDiscountsDialog:
      bodyBuildingDiscountsUIEvents.openFetchBodyBuildingDiscountsDialog,
    openUpdateBodyBuildingDiscountsStatusDialog:
      bodyBuildingDiscountsUIEvents.openUpdateBodyBuildingDiscountsStatusDialog,
  };
  return (
    <BodyBuildingDiscountsUIContext.Provider value={value}>
      {children}
    </BodyBuildingDiscountsUIContext.Provider>
  );
}
