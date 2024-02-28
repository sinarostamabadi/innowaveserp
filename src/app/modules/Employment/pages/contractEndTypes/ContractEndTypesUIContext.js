import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ContractEndTypeModel } from "../../../../../core/_models/Employment/ContractEndTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ContractEndTypesUIContext = createContext();

export function useContractEndTypesUIContext() {
  return useContext(ContractEndTypesUIContext);
}

export const ContractEndTypesUIConsumer = ContractEndTypesUIContext.Consumer;

export function ContractEndTypesUIProvider({
  contractEndTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ContractEndTypeModel).initialFilter
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
    dataModel: ContractEndTypeModel,
    newContractEndTypeButtonClick:
      contractEndTypesUIEvents.newContractEndTypeButtonClick,
    openEditContractEndTypePage:
      contractEndTypesUIEvents.openEditContractEndTypePage,
    openDeleteContractEndTypeDialog:
      contractEndTypesUIEvents.openDeleteContractEndTypeDialog,
    openDeleteContractEndTypesDialog:
      contractEndTypesUIEvents.openDeleteContractEndTypesDialog,
    openFetchContractEndTypesDialog:
      contractEndTypesUIEvents.openFetchContractEndTypesDialog,
    openUpdateContractEndTypesStatusDialog:
      contractEndTypesUIEvents.openUpdateContractEndTypesStatusDialog,
  };
  return (
    <ContractEndTypesUIContext.Provider value={value}>
      {children}
    </ContractEndTypesUIContext.Provider>
  );
}
