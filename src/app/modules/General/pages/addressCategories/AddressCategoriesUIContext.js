import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AddressCategoryModel } from "../../../../../core/_models/General/AddressCategoryModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const AddressCategoriesUIContext = createContext();

export function useAddressCategoriesUIContext() {
  return useContext(AddressCategoriesUIContext);
}

export const AddressCategoriesUIConsumer = AddressCategoriesUIContext.Consumer;

export function AddressCategoriesUIProvider({
  addressCategoriesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(AddressCategoryModel).initialFilter
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
    dataModel: AddressCategoryModel,
    newAddressCategoryButtonClick:
      addressCategoriesUIEvents.newAddressCategoryButtonClick,
    openEditAddressCategoryPage:
      addressCategoriesUIEvents.openEditAddressCategoryPage,
    openDeleteAddressCategoryDialog:
      addressCategoriesUIEvents.openDeleteAddressCategoryDialog,
    openDeleteAddressCategoriesDialog:
      addressCategoriesUIEvents.openDeleteAddressCategoriesDialog,
    openFetchAddressCategoriesDialog:
      addressCategoriesUIEvents.openFetchAddressCategoriesDialog,
    openUpdateAddressCategoriesStatusDialog:
      addressCategoriesUIEvents.openUpdateAddressCategoriesStatusDialog,
  };
  return (
    <AddressCategoriesUIContext.Provider value={value}>
      {children}
    </AddressCategoriesUIContext.Provider>
  );
}
