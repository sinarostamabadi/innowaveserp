import { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingClosetModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingClosetModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ClosetsUIContext = createContext();

export function useClosetsUIContext() {
  return useContext(ClosetsUIContext);
}

export const ClosetsUIConsumer = ClosetsUIContext.Consumer;

export function ClosetsUIProvider({ closetsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingClosetModel).initialFilter
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
    dataModel: BodyBuildingClosetModel,
    newClosetButtonClick: closetsUIEvents.newClosetButtonClick,
    openEditClosetPage: closetsUIEvents.openEditClosetPage,
    openDeleteClosetDialog: closetsUIEvents.openDeleteClosetDialog,
    openClosetOpenDialog: closetsUIEvents.openClosetOpenDialog,
    openClosetFreeDialog: closetsUIEvents.openClosetFreeDialog,
    openDeleteClosetsDialog: closetsUIEvents.openDeleteClosetsDialog,
    openFetchClosetsDialog: closetsUIEvents.openFetchClosetsDialog,
    openUpdateClosetsStatusDialog:
      closetsUIEvents.openUpdateClosetsStatusDialog,
  };
  return (
    <ClosetsUIContext.Provider value={value}>
      {children}
    </ClosetsUIContext.Provider>
  );
}
