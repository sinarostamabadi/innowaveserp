
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { CouponModel } from "src/core/_models/Cash/CouponModel";
import { getConfig } from "src/core/_models/ModelDescriber";

const CouponsUIContext = createContext();

export function useCouponsUIContext() {
  return useContext(CouponsUIContext);
}

export const CouponsUIConsumer = CouponsUIContext.Consumer;

export function CouponsUIProvider({ couponsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(CouponModel).initialFilter
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
    dataModel: CouponModel,
    newCouponButtonClick: couponsUIEvents.newCouponButtonClick,
    openEditCouponPage: couponsUIEvents.openEditCouponPage,
    openDeleteCouponDialog: couponsUIEvents.openDeleteCouponDialog,
    openDeleteCouponsDialog: couponsUIEvents.openDeleteCouponsDialog,
    openFetchCouponsDialog: couponsUIEvents.openFetchCouponsDialog,
    openUpdateCouponsStatusDialog: couponsUIEvents.openUpdateCouponsStatusDialog,
  };
  return (
    <CouponsUIContext.Provider value={value}>{children}</CouponsUIContext.Provider>
  );
}