import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PersonModel } from "../../../../../core/_models/Core/PersonModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
const peopleUIContext = createContext();
export function usepeopleUIContext() {
  return useContext(peopleUIContext);
}
export const peopleUIConsumer = peopleUIContext.Consumer;
export function peopleUIProvider({ peopleUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PersonModel).initialFilter
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
    dataModel: PersonModel,
    newPersonButtonClick: peopleUIEvents.newPersonButtonClick,
    openEditPersonPage: peopleUIEvents.openEditPersonPage,
    openDeletePersonDialog: peopleUIEvents.openDeletePersonDialog,
    openDeletepeopleDialog: peopleUIEvents.openDeletepeopleDialog,
    openFetchpeopleDialog: peopleUIEvents.openFetchpeopleDialog,
    openUpdatepeopleStatusDialog: peopleUIEvents.openUpdatepeopleStatusDialog,
  };
  return (
    <peopleUIContext.Provider value={value}>
      {children}
    </peopleUIContext.Provider>
  );
}
