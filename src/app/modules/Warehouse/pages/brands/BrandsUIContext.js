
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BrandModel } from "../../../../../core/_models/Warehouse/BrandModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BrandsUIContext = createContext();

export function useBrandsUIContext() {
  return useContext(BrandsUIContext);
}

export const BrandsUIConsumer = BrandsUIContext.Consumer;

export function BrandsUIProvider({ brandsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BrandModel).initialFilter
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
    dataModel: BrandModel,
    newBrandButtonClick: brandsUIEvents.newBrandButtonClick,
    openEditBrandPage: brandsUIEvents.openEditBrandPage,
    openDeleteBrandDialog: brandsUIEvents.openDeleteBrandDialog,
    openDeleteBrandsDialog: brandsUIEvents.openDeleteBrandsDialog,
    openFetchBrandsDialog: brandsUIEvents.openFetchBrandsDialog,
    openUpdateBrandsStatusDialog: brandsUIEvents.openUpdateBrandsStatusDialog,
  };
  return (
    <BrandsUIContext.Provider value={value}>{children}</BrandsUIContext.Provider>
  );
}