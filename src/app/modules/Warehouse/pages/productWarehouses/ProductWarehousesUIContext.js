
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ProductWarehouseModel } from "../../../../../core/_models/Warehouse/ProductWarehouseModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ProductWarehousesUIContext = createContext();

export function useProductWarehousesUIContext() {
  return useContext(ProductWarehousesUIContext);
}

export const ProductWarehousesUIConsumer = ProductWarehousesUIContext.Consumer;

export function ProductWarehousesUIProvider({ productWarehousesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ProductWarehouseModel).initialFilter
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
    dataModel: ProductWarehouseModel,
    newProductWarehouseButtonClick: productWarehousesUIEvents.newProductWarehouseButtonClick,
    openEditProductWarehousePage: productWarehousesUIEvents.openEditProductWarehousePage,
    openDeleteProductWarehouseDialog: productWarehousesUIEvents.openDeleteProductWarehouseDialog,
    openDeleteProductWarehousesDialog: productWarehousesUIEvents.openDeleteProductWarehousesDialog,
    openFetchProductWarehousesDialog: productWarehousesUIEvents.openFetchProductWarehousesDialog,
    openUpdateProductWarehousesStatusDialog: productWarehousesUIEvents.openUpdateProductWarehousesStatusDialog,
  };
  return (
    <ProductWarehousesUIContext.Provider value={value}>{children}</ProductWarehousesUIContext.Provider>
  );
}