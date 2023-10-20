import React, { createContext, useContext, useState, useCallback } from "react";  
import { isEqual, isFunction } from "lodash";  
import { CalendarModel } from "../../../../../core/_models/General/CalendarModel";  
import { getConfig } from "../../../../../core/_models/ModelDescriber";  
const CalendarsUIContext = createContext();  
export function useCalendarsUIContext() {  
  return useContext(CalendarsUIContext);  
}  
export const CalendarsUIConsumer = CalendarsUIContext.Consumer;  
export function CalendarsUIProvider({ calendarsUIEvents, children }) {  
  const [queryParams, setQueryParamsBase] = useState(getConfig(CalendarModel).initialFilter);  
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
    dataModel: CalendarModel,  
    newCalendarButtonClick: calendarsUIEvents.newCalendarButtonClick,  
    openEditCalendarPage: calendarsUIEvents.openEditCalendarPage,  
    openDeleteCalendarDialog: calendarsUIEvents.openDeleteCalendarDialog,  
    openDeleteCalendarsDialog: calendarsUIEvents.openDeleteCalendarsDialog,  
    openFetchCalendarsDialog: calendarsUIEvents.openFetchCalendarsDialog,  
    openUpdateCalendarsStatusDialog:  
      calendarsUIEvents.openUpdateCalendarsStatusDialog,  
  };  
  return (  
    <CalendarsUIContext.Provider value={value}>  
      {children}  
    </CalendarsUIContext.Provider>  
  );  
}  
