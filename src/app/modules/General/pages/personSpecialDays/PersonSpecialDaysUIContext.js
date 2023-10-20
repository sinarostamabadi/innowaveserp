import React, { createContext, useContext, useState, useCallback } from "react";  
import { isEqual, isFunction } from "lodash";  
import { PersonSpecialDayModel } from "../../../../../core/_models/General/PersonSpecialDayModel";  
import { getConfig } from "../../../../../core/_models/ModelDescriber";  
const PersonSpecialDaysUIContext = createContext();  
export function usePersonSpecialDaysUIContext() {  
  return useContext(PersonSpecialDaysUIContext);  
}  
export const PersonSpecialDaysUIConsumer = PersonSpecialDaysUIContext.Consumer;  
export function PersonSpecialDaysUIProvider({ personSpecialDaysUIEvents, children }) {  
  const [queryParams, setQueryParamsBase] = useState(getConfig(PersonSpecialDayModel).initialFilter);  
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
    dataModel: PersonSpecialDayModel,  
    newPersonSpecialDayButtonClick: personSpecialDaysUIEvents.newPersonSpecialDayButtonClick,  
    openEditPersonSpecialDayPage: personSpecialDaysUIEvents.openEditPersonSpecialDayPage,  
    openDeletePersonSpecialDayDialog: personSpecialDaysUIEvents.openDeletePersonSpecialDayDialog,  
    openDeletePersonSpecialDaysDialog: personSpecialDaysUIEvents.openDeletePersonSpecialDaysDialog,  
    openFetchPersonSpecialDaysDialog: personSpecialDaysUIEvents.openFetchPersonSpecialDaysDialog,  
    openUpdatePersonSpecialDaysStatusDialog:  
      personSpecialDaysUIEvents.openUpdatePersonSpecialDaysStatusDialog,  
  };  
  return (  
    <PersonSpecialDaysUIContext.Provider value={value}>  
      {children}  
    </PersonSpecialDaysUIContext.Provider>  
  );  
}  
