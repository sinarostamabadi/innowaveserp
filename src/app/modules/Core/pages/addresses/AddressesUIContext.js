import React, { createContext, useContext, useState, useCallback } from "react";  
import { isEqual, isFunction } from "lodash";  
import { AddressModel } from "../../../../../core/_models/Core/AddressModel";  
import { getConfig } from "../../../../../core/_models/ModelDescriber";  
const AddressesUIContext = createContext();  
export function useAddressesUIContext() {  
  return useContext(AddressesUIContext);  
}  
export const AddressesUIConsumer = AddressesUIContext.Consumer;  
export function AddressesUIProvider({ addressesUIEvents, children }) {  
  const [queryParams, setQueryParamsBase] = useState(getConfig(AddressModel).initialFilter);  
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
    dataModel: AddressModel,  
    newAddressButtonClick: addressesUIEvents.newAddressButtonClick,  
    openEditAddressPage: addressesUIEvents.openEditAddressPage,  
    openDeleteAddressDialog: addressesUIEvents.openDeleteAddressDialog,  
    openDeleteAddressesDialog: addressesUIEvents.openDeleteAddressesDialog,  
    openFetchAddressesDialog: addressesUIEvents.openFetchAddressesDialog,  
    openUpdateAddressesStatusDialog:  
      addressesUIEvents.openUpdateAddressesStatusDialog,  
  };  
  return (  
    <AddressesUIContext.Provider value={value}>  
      {children}  
    </AddressesUIContext.Provider>  
  );  
}  
