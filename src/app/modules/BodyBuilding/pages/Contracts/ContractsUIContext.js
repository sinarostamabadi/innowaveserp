import { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingContractModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingContractModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const ContractsUIContext = createContext();

export function useContractsUIContext() {
  return useContext(ContractsUIContext);
}

export const ContractsUIConsumer = ContractsUIContext.Consumer;

export function ContractsUIProvider({ contractsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(BodyBuildingContractModel).initialFilter
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
    dataModel: BodyBuildingContractModel,
    newContractButtonClick: contractsUIEvents.newContractButtonClick,
    openEditContractPage: contractsUIEvents.openEditContractPage,
    openDeleteContractDialog: contractsUIEvents.openDeleteContractDialog,
    openShowContractDialog: contractsUIEvents.openShowContractDialog,
  };
  return (
    <ContractsUIContext.Provider value={value}>
      {children}
    </ContractsUIContext.Provider>
  );
}
