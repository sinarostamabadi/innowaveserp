
import { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingPackModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingPackModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const PacksUIContext = createContext();

export function usePacksUIContext() {
  return useContext(PacksUIContext);
}

export const PacksUIConsumer = PacksUIContext.Consumer;

export function PacksUIProvider({ packsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(getConfig(BodyBuildingPackModel).initialFilter);

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
    dataModel: BodyBuildingPackModel,
    newPackButtonClick: packsUIEvents.newPackButtonClick,
    openEditPackPage: packsUIEvents.openEditPackPage,
    openDeletePackDialog: packsUIEvents.openDeletePackDialog,
    openDeletePacksDialog: packsUIEvents.openDeletePacksDialog,
    openFetchPacksDialog: packsUIEvents.openFetchPacksDialog,
    openUpdatePacksStatusDialog: packsUIEvents.openUpdatePacksStatusDialog,
  };
  return (
    <PacksUIContext.Provider value={value}>{children}</PacksUIContext.Provider>
  );
}