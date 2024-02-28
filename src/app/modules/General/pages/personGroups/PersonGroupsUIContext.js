import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PersonGroupModel } from "../../../../../core/_models/General/PersonGroupModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PersonGroupsUIContext = createContext();

export function usePersonGroupsUIContext() {
  return useContext(PersonGroupsUIContext);
}

export const PersonGroupsUIConsumer = PersonGroupsUIContext.Consumer;

export function PersonGroupsUIProvider({ personGroupsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PersonGroupModel).initialFilter
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
    dataModel: PersonGroupModel,
    newPersonGroupButtonClick: personGroupsUIEvents.newPersonGroupButtonClick,
    openEditPersonGroupPage: personGroupsUIEvents.openEditPersonGroupPage,
    openDeletePersonGroupDialog:
      personGroupsUIEvents.openDeletePersonGroupDialog,
    openDeletePersonGroupsDialog:
      personGroupsUIEvents.openDeletePersonGroupsDialog,
    openFetchPersonGroupsDialog:
      personGroupsUIEvents.openFetchPersonGroupsDialog,
    openUpdatePersonGroupsStatusDialog:
      personGroupsUIEvents.openUpdatePersonGroupsStatusDialog,
  };
  return (
    <PersonGroupsUIContext.Provider value={value}>
      {children}
    </PersonGroupsUIContext.Provider>
  );
}
