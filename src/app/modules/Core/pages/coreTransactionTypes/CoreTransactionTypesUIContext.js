import React, { createContext, useContext, useState, useCallback } from "react";  
import { isEqual, isFunction } from "lodash";  
import { CoreTransactionTypeModel } from "../../../../../core/_models/Core/CoreTransactionTypeModel";  
import { getConfig } from "../../../../../core/_models/ModelDescriber";  
const CoreTransactionTypesUIContext = createContext();  
export function useCoreTransactionTypesUIContext() {  
  return useContext(CoreTransactionTypesUIContext);  
}  
export const CoreTransactionTypesUIConsumer = CoreTransactionTypesUIContext.Consumer;  
export function CoreTransactionTypesUIProvider({ coreTransactionTypesUIEvents, children }) {  
  const [queryParams, setQueryParamsBase] = useState(getConfig(CoreTransactionTypeModel).initialFilter);  
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
    dataModel: CoreTransactionTypeModel,  
    newCoreTransactionTypeButtonClick: coreTransactionTypesUIEvents.newCoreTransactionTypeButtonClick,  
    openEditCoreTransactionTypePage: coreTransactionTypesUIEvents.openEditCoreTransactionTypePage,  
    openDeleteCoreTransactionTypeDialog: coreTransactionTypesUIEvents.openDeleteCoreTransactionTypeDialog,  
    openDeleteCoreTransactionTypesDialog: coreTransactionTypesUIEvents.openDeleteCoreTransactionTypesDialog,  
    openFetchCoreTransactionTypesDialog: coreTransactionTypesUIEvents.openFetchCoreTransactionTypesDialog,  
    openUpdateCoreTransactionTypesStatusDialog:  
      coreTransactionTypesUIEvents.openUpdateCoreTransactionTypesStatusDialog,  
  };  
  return (  
    <CoreTransactionTypesUIContext.Provider value={value}>  
      {children}  
    </CoreTransactionTypesUIContext.Provider>  
  );  
}  
