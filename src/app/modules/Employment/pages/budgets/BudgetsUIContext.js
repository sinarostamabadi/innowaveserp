import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BudgetModel } from "../../../../../core/_models/Employment/BudgetModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BudgetsUIContext = createContext();

export function useBudgetsUIContext() {
  return useContext(BudgetsUIContext);
}

export const BudgetsUIConsumer = BudgetsUIContext.Consumer;

export function BudgetsUIProvider({ budgetsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BudgetModel).initialFilter
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
    dataModel: BudgetModel,
    newBudgetButtonClick: budgetsUIEvents.newBudgetButtonClick,
    openEditBudgetPage: budgetsUIEvents.openEditBudgetPage,
    openDeleteBudgetDialog: budgetsUIEvents.openDeleteBudgetDialog,
    openDeleteBudgetsDialog: budgetsUIEvents.openDeleteBudgetsDialog,
    openFetchBudgetsDialog: budgetsUIEvents.openFetchBudgetsDialog,
    openUpdateBudgetsStatusDialog:
      budgetsUIEvents.openUpdateBudgetsStatusDialog,
  };
  return (
    <BudgetsUIContext.Provider value={value}>
      {children}
    </BudgetsUIContext.Provider>
  );
}
