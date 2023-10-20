
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ContractTypeModel } from "../../../../../core/_models/Employment/ContractTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ContractTypesUIContext = createContext();

export function useContractTypesUIContext() {
  return useContext(ContractTypesUIContext);
}

export const ContractTypesUIConsumer = ContractTypesUIContext.Consumer;

export function ContractTypesUIProvider({ contractTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ContractTypeModel).initialFilter
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
    dataModel: ContractTypeModel,
    newContractTypeButtonClick: contractTypesUIEvents.newContractTypeButtonClick,
    openEditContractTypePage: contractTypesUIEvents.openEditContractTypePage,
    openDeleteContractTypeDialog: contractTypesUIEvents.openDeleteContractTypeDialog,
    openDeleteContractTypesDialog: contractTypesUIEvents.openDeleteContractTypesDialog,
    openFetchContractTypesDialog: contractTypesUIEvents.openFetchContractTypesDialog,
    openUpdateContractTypesStatusDialog: contractTypesUIEvents.openUpdateContractTypesStatusDialog,
  };
  return (
    <ContractTypesUIContext.Provider value={value}>{children}</ContractTypesUIContext.Provider>
  );
}