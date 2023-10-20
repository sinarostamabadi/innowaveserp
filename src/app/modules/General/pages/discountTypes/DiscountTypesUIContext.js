import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { DiscountTypeModel } from "../../../../../core/_models/General/DiscountTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const DiscountTypesUIContext = createContext();

export function useDiscountTypesUIContext() {
  return useContext(DiscountTypesUIContext);
}

export const DiscountTypesUIConsumer = DiscountTypesUIContext.Consumer;

export function DiscountTypesUIProvider({ discountTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(DiscountTypeModel).initialFilter
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
    dataModel: DiscountTypeModel,
    newDiscountTypeButtonClick: discountTypesUIEvents.newDiscountTypeButtonClick,
    openEditDiscountTypePage: discountTypesUIEvents.openEditDiscountTypePage,
    openDeleteDiscountTypeDialog: discountTypesUIEvents.openDeleteDiscountTypeDialog,
    openDeleteDiscountTypesDialog: discountTypesUIEvents.openDeleteDiscountTypesDialog,
    openFetchDiscountTypesDialog: discountTypesUIEvents.openFetchDiscountTypesDialog,
    openUpdateDiscountTypesStatusDialog: discountTypesUIEvents.openUpdateDiscountTypesStatusDialog,
  };
  return (
    <DiscountTypesUIContext.Provider value={value}>{children}</DiscountTypesUIContext.Provider>
  );
}