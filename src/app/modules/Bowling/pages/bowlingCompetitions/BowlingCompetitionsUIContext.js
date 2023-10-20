import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BowlingCompetitionModel } from "../../../../../core/_models/Bowling/BowlingCompetitionModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { getStorage } from "../../../../../core/_helpers";

const BowlingCompetitionsUIContext = createContext();

export function useBowlingCompetitionsUIContext() {
  return useContext(BowlingCompetitionsUIContext);
}
export const BowlingCompetitionsUIConsumer = BowlingCompetitionsUIContext.Consumer;

export function BowlingCompetitionsUIProvider({ bowlingCompetitionsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(getConfig(BowlingCompetitionModel, "Title", "asc").initialFilter);

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
    dataModel: BowlingCompetitionModel,
    newBowlingCompetitionButtonClick: bowlingCompetitionsUIEvents.newBowlingCompetitionButtonClick,
    openEditBowlingCompetitionPage: bowlingCompetitionsUIEvents.openEditBowlingCompetitionPage,
    openDeleteBowlingCompetitionDialog: bowlingCompetitionsUIEvents.openDeleteBowlingCompetitionDialog,
    openDeleteBowlingCompetitionsDialog: bowlingCompetitionsUIEvents.openDeleteBowlingCompetitionsDialog,
    openFetchBowlingCompetitionsDialog: bowlingCompetitionsUIEvents.openFetchBowlingCompetitionsDialog,
    openUpdateBowlingCompetitionsStatusDialog:
      bowlingCompetitionsUIEvents.openUpdateBowlingCompetitionsStatusDialog,
  };
  return (
    <BowlingCompetitionsUIContext.Provider value={value}>
      {children}
    </BowlingCompetitionsUIContext.Provider>
  );
}
