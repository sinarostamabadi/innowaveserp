import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BuyRequestModel } from "src/core/_models/PurchaseOrder/BuyRequestModel";
import { getConfig } from "src/core/_models/ModelDescriber";
import { getStorage } from "src/core/_helpers";

const BuyRequestsUIContext = createContext();
const defaultWarehouse = !!getStorage("defaultWarehouse")
? JSON.parse(getStorage("defaultWarehouse"))
: null;

const defaultFilter = [{
  Property: "WarehouseId",
  Operation: 5,
  Values: [!!defaultWarehouse? defaultWarehouse.WarehouseId: null],
}];
export const BuyRequestStatus = {
  "1": "درخواست ثبت شده",
  "2": "کارتابل مدیر",
  "3": "کارتابل انبار",
  "4": "در دست تامین",
  "5": "درخواست به اتمام رسیده",
};

export function useBuyRequestsUIContext() {
  return useContext(BuyRequestsUIContext);
}

export const BuyRequestsUIConsumer = BuyRequestsUIContext.Consumer;

export function BuyRequestsUIProvider({ buyRequestsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    !!defaultWarehouse
    ? {
        ...getConfig(BuyRequestModel, "BuyRequestDate", "desc").initialFilter,
        Filters: [...defaultFilter],
      }
    : getConfig(BuyRequestModel, "BuyRequestDate", "desc").initialFilter,
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
    dataModel: BuyRequestModel,
    newBuyRequestButtonClick: buyRequestsUIEvents.newBuyRequestButtonClick,
    openEditBuyRequestPage: buyRequestsUIEvents.openEditBuyRequestPage,
    openDeleteBuyRequestDialog: buyRequestsUIEvents.openDeleteBuyRequestDialog,
    openDeleteBuyRequestsDialog:
      buyRequestsUIEvents.openDeleteBuyRequestsDialog,
    openFetchBuyRequestsDialog: buyRequestsUIEvents.openFetchBuyRequestsDialog,
    openUpdateBuyRequestsStatusDialog:
      buyRequestsUIEvents.openUpdateBuyRequestsStatusDialog,
  };
  return (
    <BuyRequestsUIContext.Provider value={value}>
      {children}
    </BuyRequestsUIContext.Provider>
  );
}
