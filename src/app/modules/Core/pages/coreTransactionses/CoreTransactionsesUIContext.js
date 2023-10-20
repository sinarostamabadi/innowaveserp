import React, { createContext, useContext, useState, useCallback } from "react";  
import { isEqual, isFunction } from "lodash";  
import { CoreTransactionsModel } from "../../../../../core/_models/Core/CoreTransactionsModel";  
import { getConfig } from "../../../../../core/_models/ModelDescriber";  
const CoreTransactionsesUIContext = createContext();  
export function useCoreTransactionsesUIContext() {  
  return useContext(CoreTransactionsesUIContext);  
}  
export const CoreTransactionsesUIConsumer = CoreTransactionsesUIContext.Consumer;  
export function CoreTransactionsesUIProvider({ coreTransactionsesUIEvents, children }) {  
  const [queryParams, setQueryParamsBase] = useState(getConfig(CoreTransactionsModel).initialFilter);  
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
    dataModel: CoreTransactionsModel,  
    newCoreTransactionsButtonClick: coreTransactionsesUIEvents.newCoreTransactionsButtonClick,  
    openEditCoreTransactionsPage: coreTransactionsesUIEvents.openEditCoreTransactionsPage,  
    openDeleteCoreTransactionsDialog: coreTransactionsesUIEvents.openDeleteCoreTransactionsDialog,  
    openDeleteCoreTransactionsesDialog: coreTransactionsesUIEvents.openDeleteCoreTransactionsesDialog,  
    openFetchCoreTransactionsesDialog: coreTransactionsesUIEvents.openFetchCoreTransactionsesDialog,  
    openUpdateCoreTransactionsesStatusDialog:  
      coreTransactionsesUIEvents.openUpdateCoreTransactionsesStatusDialog,  
  };  
  return (  
    <CoreTransactionsesUIContext.Provider value={value}>  
      {children}  
    </CoreTransactionsesUIContext.Provider>  
  );  
}  
