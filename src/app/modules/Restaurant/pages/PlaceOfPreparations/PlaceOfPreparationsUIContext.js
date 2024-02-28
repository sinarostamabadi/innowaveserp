import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { PlaceOfPreparationModel } from "../../../../../core/_models//PlaceOfPreparationModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PlaceOfPreparationsUIContext = createContext();

export function usePlaceOfPreparationsUIContext() {
  return useContext(PlaceOfPreparationsUIContext);
}

export const PlaceOfPreparationsUIConsumer =
  PlaceOfPreparationsUIContext.Consumer;

export function PlaceOfPreparationsUIProvider({
  placeOfPreparationsUIEvents,
  children,
}) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(PlaceOfPreparationModel).initialFilter
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
    dataModel: PlaceOfPreparationModel,
    newPlaceOfPreparationButtonClick:
      placeOfPreparationsUIEvents.newPlaceOfPreparationButtonClick,
    openEditPlaceOfPreparationPage:
      placeOfPreparationsUIEvents.openEditPlaceOfPreparationPage,
    openDeletePlaceOfPreparationDialog:
      placeOfPreparationsUIEvents.openDeletePlaceOfPreparationDialog,
    openDeletePlaceOfPreparationsDialog:
      placeOfPreparationsUIEvents.openDeletePlaceOfPreparationsDialog,
    openFetchPlaceOfPreparationsDialog:
      placeOfPreparationsUIEvents.openFetchPlaceOfPreparationsDialog,
    openUpdatePlaceOfPreparationsStatusDialog:
      placeOfPreparationsUIEvents.openUpdatePlaceOfPreparationsStatusDialog,
  };
  return (
    <PlaceOfPreparationsUIContext.Provider value={value}>
      {children}
    </PlaceOfPreparationsUIContext.Provider>
  );
}
