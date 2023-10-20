
import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { EmployeeInIODeviceModel } from "../../../../../core/_models/Employment/EmployeeInIODeviceModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";

const EmployeeInIODevicesUIContext = createContext();

export function useEmployeeInIODevicesUIContext() {
  return useContext(EmployeeInIODevicesUIContext);
}

export const EmployeeInIODevicesUIConsumer = EmployeeInIODevicesUIContext.Consumer;

export function EmployeeInIODevicesUIProvider({ employeeInIODevicesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(
    getConfig(EmployeeInIODeviceModel).initialFilter
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
    dataModel: EmployeeInIODeviceModel,
    newEmployeeInIODeviceButtonClick: employeeInIODevicesUIEvents.newEmployeeInIODeviceButtonClick,
    openEditEmployeeInIODevicePage: employeeInIODevicesUIEvents.openEditEmployeeInIODevicePage,
    openDeleteEmployeeInIODeviceDialog: employeeInIODevicesUIEvents.openDeleteEmployeeInIODeviceDialog,
    openDeleteEmployeeInIODevicesDialog: employeeInIODevicesUIEvents.openDeleteEmployeeInIODevicesDialog,
    openFetchEmployeeInIODevicesDialog: employeeInIODevicesUIEvents.openFetchEmployeeInIODevicesDialog,
    openUpdateEmployeeInIODevicesStatusDialog: employeeInIODevicesUIEvents.openUpdateEmployeeInIODevicesStatusDialog,
  };
  return (
    <EmployeeInIODevicesUIContext.Provider value={value}>{children}</EmployeeInIODevicesUIContext.Provider>
  );
}