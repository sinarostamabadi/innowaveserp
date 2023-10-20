
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ProductUnitModel } from "../../../../../core/_models/Warehouse/ProductUnitModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ProductUnitsUIContext = createContext();

export function useProductUnitsUIContext() {
  return useContext(ProductUnitsUIContext);
}

export const ProductUnitsUIConsumer = ProductUnitsUIContext.Consumer;

export function ProductUnitsUIProvider({ productUnitsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ProductUnitModel).initialFilter
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
    dataModel: ProductUnitModel,
    newProductUnitButtonClick: productUnitsUIEvents.newProductUnitButtonClick,
    openEditProductUnitPage: productUnitsUIEvents.openEditProductUnitPage,
    openDeleteProductUnitDialog: productUnitsUIEvents.openDeleteProductUnitDialog,
    openDeleteProductUnitsDialog: productUnitsUIEvents.openDeleteProductUnitsDialog,
    openFetchProductUnitsDialog: productUnitsUIEvents.openFetchProductUnitsDialog,
    openUpdateProductUnitsStatusDialog: productUnitsUIEvents.openUpdateProductUnitsStatusDialog,
  };
  return (
    <ProductUnitsUIContext.Provider value={value}>{children}</ProductUnitsUIContext.Provider>
  );
}