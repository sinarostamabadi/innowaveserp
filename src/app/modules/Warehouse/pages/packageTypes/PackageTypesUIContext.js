
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PackageTypeModel } from "../../../../../core/_models/Warehouse/PackageTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PackageTypesUIContext = createContext();

export function usePackageTypesUIContext() {
  return useContext(PackageTypesUIContext);
}

export const PackageTypesUIConsumer = PackageTypesUIContext.Consumer;

export function PackageTypesUIProvider({ packageTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PackageTypeModel).initialFilter
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
    dataModel: PackageTypeModel,
    newPackageTypeButtonClick: packageTypesUIEvents.newPackageTypeButtonClick,
    openEditPackageTypePage: packageTypesUIEvents.openEditPackageTypePage,
    openDeletePackageTypeDialog: packageTypesUIEvents.openDeletePackageTypeDialog,
    openDeletePackageTypesDialog: packageTypesUIEvents.openDeletePackageTypesDialog,
    openFetchPackageTypesDialog: packageTypesUIEvents.openFetchPackageTypesDialog,
    openUpdatePackageTypesStatusDialog: packageTypesUIEvents.openUpdatePackageTypesStatusDialog,
  };
  return (
    <PackageTypesUIContext.Provider value={value}>{children}</PackageTypesUIContext.Provider>
  );
}