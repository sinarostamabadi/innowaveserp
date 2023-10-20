
import { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { BodyBuildingEmployeeTypeModel } from "../../../../../core/_models/BodyBuilding/BodyBuildingEmployeeTypeModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeTypesUIContext = createContext();

export function useEmployeeTypesUIContext() {
  return useContext(EmployeeTypesUIContext);
}

export const EmployeeTypesUIConsumer = EmployeeTypesUIContext.Consumer;

export function EmployeeTypesUIProvider({ employeeTypesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(getConfig(BodyBuildingEmployeeTypeModel).initialFilter);

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
    dataModel: BodyBuildingEmployeeTypeModel,
    newEmployeeTypeButtonClick: employeeTypesUIEvents.newEmployeeTypeButtonClick,
    openEditEmployeeTypePage: employeeTypesUIEvents.openEditEmployeeTypePage,
    openDeleteEmployeeTypeDialog: employeeTypesUIEvents.openDeleteEmployeeTypeDialog,
    openDeleteEmployeeTypesDialog: employeeTypesUIEvents.openDeleteEmployeeTypesDialog,
    openFetchEmployeeTypesDialog: employeeTypesUIEvents.openFetchEmployeeTypesDialog,
    openUpdateEmployeeTypesStatusDialog: employeeTypesUIEvents.openUpdateEmployeeTypesStatusDialog,
  };
  return (
    <EmployeeTypesUIContext.Provider value={value}>{children}</EmployeeTypesUIContext.Provider>
  );
}