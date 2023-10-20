
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { InfoAreaModel } from "../../../../../core/_models/Employment/InfoAreaModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const InfoAreasUIContext = createContext();

export function useInfoAreasUIContext() {
  return useContext(InfoAreasUIContext);
}

export const InfoAreasUIConsumer = InfoAreasUIContext.Consumer;

export function InfoAreasUIProvider({ infoAreasUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(InfoAreaModel).initialFilter
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
    dataModel: InfoAreaModel,
    newInfoAreaButtonClick: infoAreasUIEvents.newInfoAreaButtonClick,
    openEditInfoAreaPage: infoAreasUIEvents.openEditInfoAreaPage,
    openDeleteInfoAreaDialog: infoAreasUIEvents.openDeleteInfoAreaDialog,
    openDeleteInfoAreasDialog: infoAreasUIEvents.openDeleteInfoAreasDialog,
    openFetchInfoAreasDialog: infoAreasUIEvents.openFetchInfoAreasDialog,
    openUpdateInfoAreasStatusDialog: infoAreasUIEvents.openUpdateInfoAreasStatusDialog,
  };
  return (
    <InfoAreasUIContext.Provider value={value}>{children}</InfoAreasUIContext.Provider>
  );
}