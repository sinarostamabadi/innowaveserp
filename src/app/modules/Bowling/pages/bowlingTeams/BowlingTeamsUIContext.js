import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BowlingTeamModel } from "../../../../../core/_models/Bowling/BowlingTeamModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const BowlingTeamsUIContext = createContext();

export function useBowlingTeamsUIContext() {
  return useContext(BowlingTeamsUIContext);
}

export const BowlingTeamsUIConsumer = BowlingTeamsUIContext.Consumer;

export function BowlingTeamsUIProvider({ bowlingTeamsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BowlingTeamModel).initialFilter
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
    dataModel: BowlingTeamModel,
    newBowlingTeamButtonClick: bowlingTeamsUIEvents.newBowlingTeamButtonClick,
    openEditBowlingTeamPage: bowlingTeamsUIEvents.openEditBowlingTeamPage,
    openDoneBowlingTeamDialog: bowlingTeamsUIEvents.openDoneBowlingTeamDialog,
    openAddTimeBowlingTeamDialog:
      bowlingTeamsUIEvents.openAddTimeBowlingTeamDialog,
    openDeleteBowlingTeamDialog:
      bowlingTeamsUIEvents.openDeleteBowlingTeamDialog,
    openDeleteBowlingTeamsDialog:
      bowlingTeamsUIEvents.openDeleteBowlingTeamsDialog,
    openFetchBowlingTeamsDialog:
      bowlingTeamsUIEvents.openFetchBowlingTeamsDialog,
    openUpdateBowlingTeamsStatusDialog:
      bowlingTeamsUIEvents.openUpdateBowlingTeamsStatusDialog,
    openRelocationDialog: bowlingTeamsUIEvents.openRelocationDialog,
  };

  return (
    <BowlingTeamsUIContext.Provider value={value}>
      {children}
    </BowlingTeamsUIContext.Provider>
  );
}
