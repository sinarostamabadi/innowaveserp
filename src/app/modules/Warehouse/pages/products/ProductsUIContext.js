
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ProductModel } from "../../../../../core/_models/Warehouse/ProductModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ProductsUIContext = createContext();

export function useProductsUIContext() {
  return useContext(ProductsUIContext);
}

export const ProductsUIConsumer = ProductsUIContext.Consumer;

export function ProductsUIProvider({ productsUIEvents, children, groupId }) {
  const defaultFilter = {
    Property: "ProductGroupId",
    Operation: 5,
    Values: [!!groupId? groupId: null],
  };

  const [queryParams, setQueryParamsBase] = useState(
    !!groupId
    ? {
        ...getConfig(ProductModel).initialFilter,
        Filters: [defaultFilter],
      }
    : getConfig(ProductModel).initialFilter
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
    dataModel: ProductModel,
    newProductButtonClick: productsUIEvents.newProductButtonClick,
    openEditProductPage: productsUIEvents.openEditProductPage,
    openDeleteProductDialog: productsUIEvents.openDeleteProductDialog,
    openDeleteProductsDialog: productsUIEvents.openDeleteProductsDialog,
    openFetchProductsDialog: productsUIEvents.openFetchProductsDialog,
    openUpdateProductsStatusDialog: productsUIEvents.openUpdateProductsStatusDialog,
    openPrintLabelDialog: productsUIEvents.openPrintLabelDialog,
    openPrintGroupLabelDialog: productsUIEvents.openPrintGroupLabelDialog
  };
  return (
    <ProductsUIContext.Provider value={value}>{children}</ProductsUIContext.Provider>
  );
}