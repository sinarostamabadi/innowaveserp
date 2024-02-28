import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { RewardOrPenaltyTypeModel } from "../../../../../core/_models/Employment/RewardOrPenaltyTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const RewardOrPenaltyTypesUIContext = createContext();

export function useRewardOrPenaltyTypesUIContext() {
  return useContext(RewardOrPenaltyTypesUIContext);
}

export const RewardOrPenaltyTypesUIConsumer =
  RewardOrPenaltyTypesUIContext.Consumer;

export function RewardOrPenaltyTypesUIProvider({
  rewardOrPenaltyTypesUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(RewardOrPenaltyTypeModel).initialFilter
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
    dataModel: RewardOrPenaltyTypeModel,
    newRewardOrPenaltyTypeButtonClick:
      rewardOrPenaltyTypesUIEvents.newRewardOrPenaltyTypeButtonClick,
    openEditRewardOrPenaltyTypePage:
      rewardOrPenaltyTypesUIEvents.openEditRewardOrPenaltyTypePage,
    openDeleteRewardOrPenaltyTypeDialog:
      rewardOrPenaltyTypesUIEvents.openDeleteRewardOrPenaltyTypeDialog,
    openDeleteRewardOrPenaltyTypesDialog:
      rewardOrPenaltyTypesUIEvents.openDeleteRewardOrPenaltyTypesDialog,
    openFetchRewardOrPenaltyTypesDialog:
      rewardOrPenaltyTypesUIEvents.openFetchRewardOrPenaltyTypesDialog,
    openUpdateRewardOrPenaltyTypesStatusDialog:
      rewardOrPenaltyTypesUIEvents.openUpdateRewardOrPenaltyTypesStatusDialog,
  };
  return (
    <RewardOrPenaltyTypesUIContext.Provider value={value}>
      {children}
    </RewardOrPenaltyTypesUIContext.Provider>
  );
}
