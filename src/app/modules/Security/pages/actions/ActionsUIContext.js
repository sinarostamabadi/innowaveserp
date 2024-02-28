import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { ActionModel } from "../../../../../core/_models/Security/ActionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ActionsUIContext = createContext();

export function useActionsUIContext() {
  return useContext(ActionsUIContext);
}

export const ActionsUIConsumer = ActionsUIContext.Consumer;

export function ActionsUIProvider({ actionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(ActionModel).initialFilter
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
    dataModel: ActionModel,
    newActionButtonClick: actionsUIEvents.newActionButtonClick,
    openEditActionPage: actionsUIEvents.openEditActionPage,
    openDeleteActionDialog: actionsUIEvents.openDeleteActionDialog,
    openDeleteActionsDialog: actionsUIEvents.openDeleteActionsDialog,
    openFetchActionsDialog: actionsUIEvents.openFetchActionsDialog,
    openUpdateActionsStatusDialog:
      actionsUIEvents.openUpdateActionsStatusDialog,
  };
  return (
    <ActionsUIContext.Provider value={value}>
      {children}
    </ActionsUIContext.Provider>
  );
}
