import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ReceiptModel } from "src/core/_models/Warehouse/ReceiptModel";
import { getConfig } from "src/core/_models/ModelDescriber";
import { getStorage } from "src/core/_helpers";

const ReceiptsUIContext = createContext();

export function useReceiptsUIContext() {
  return useContext(ReceiptsUIContext);
}
export const ReceiptsUIConsumer = ReceiptsUIContext.Consumer;

export function ReceiptsUIProvider({ receiptsUIEvents, mode, children }) {
  const defaultWarehouse = !!getStorage("defaultWarehouse")
  ? JSON.parse(getStorage("defaultWarehouse"))
  : null;
  const defaultYear = !!getStorage("defaultYear")
  ? JSON.parse(getStorage("defaultYear"))
  : null;

  const defaultFilter = [{
    Property: "WarehouseId",
    Operation: 5,
    Values: [!!defaultWarehouse? defaultWarehouse.WarehouseId: null],
  },
  {
    Property: "YearId",
    Operation: 5,
    Values: [!!defaultYear? defaultYear.YearId: null],
  }];
  
  if(!!mode)
    defaultFilter.push({
      Property: "ReceiptTypeId",
      Operation: 5,
      Values: [mode + ""],
    });

  const [queryParams, setQueryParamsBase] = useState(
    !!defaultWarehouse
      ? {
          ...getConfig(ReceiptModel, "ReceiptDate", "desc").initialFilter,
          Filters: [...defaultFilter],
        }
      : getConfig(ReceiptModel, "ReceiptDate", "desc").initialFilter
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
    mode,
    dataModel: ReceiptModel,
    newReceiptButtonClick: receiptsUIEvents.newReceiptButtonClick,
    openEditReceiptPage: receiptsUIEvents.openEditReceiptPage,
    openDeleteReceiptDialog: receiptsUIEvents.openDeleteReceiptDialog,
    openDeleteReceiptsDialog: receiptsUIEvents.openDeleteReceiptsDialog,
    openFetchReceiptsDialog: receiptsUIEvents.openFetchReceiptsDialog,
    openUpdateReceiptsStatusDialog:
      receiptsUIEvents.openUpdateReceiptsStatusDialog,
  };
  return (
    <ReceiptsUIContext.Provider value={value}>
      {children}
    </ReceiptsUIContext.Provider>
  );
}
