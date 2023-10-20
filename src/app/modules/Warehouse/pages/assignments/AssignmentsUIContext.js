import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { AssignmentModel } from "../../../../../core/_models/Warehouse/AssignmentModel";
import { getConfig } from "../../../../../core/_models/ModelDescriber";
import { getStorage } from "../../../../../core/_helpers";

const AssignmentsUIContext = createContext();

export function useAssignmentsUIContext() {
  return useContext(AssignmentsUIContext);
}

export const AssignmentsUIConsumer = AssignmentsUIContext.Consumer;

export function AssignmentsUIProvider({ assignmentsUIEvents, mode, children }) {
  const defaultWarehouse = !!getStorage("defaultWarehouse")
    ? JSON.parse(getStorage("defaultWarehouse"))
    : null;
  const defaultYear = !!getStorage("defaultYear")
    ? JSON.parse(getStorage("defaultYear"))
    : null;

  const defaultFilter = [
    {
      Property: "WarehouseId",
      Operation: 5,
      Values: [!!defaultWarehouse ? defaultWarehouse.WarehouseId : null],
    },
    {
      Property: "YearId",
      Operation: 5,
      Values: [!!defaultYear ? defaultYear.YearId : null],
    },
  ];

  if (!!mode)
    defaultFilter.push({
      Property: "AssignmentTypeId",
      Operation: 5,
      Values: [mode + ""],
    });

  const [queryParams, setQueryParamsBase] = useState(
    !!defaultWarehouse
      ? {
          ...getConfig(AssignmentModel, "AssignmentDate", "desc").initialFilter,
          Filters: [...defaultFilter],
        }
      : getConfig(AssignmentModel, "AssignmentDate", "desc").initialFilter
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
    mode,
    dataModel: AssignmentModel,
    newAssignmentButtonClick: assignmentsUIEvents.newAssignmentButtonClick,
    openEditAssignmentPage: assignmentsUIEvents.openEditAssignmentPage,
    openDeleteAssignmentDialog: assignmentsUIEvents.openDeleteAssignmentDialog,
    openDeleteAssignmentsDialog:
      assignmentsUIEvents.openDeleteAssignmentsDialog,
    openFetchAssignmentsDialog: assignmentsUIEvents.openFetchAssignmentsDialog,
    openUpdateAssignmentsStatusDialog:
      assignmentsUIEvents.openUpdateAssignmentsStatusDialog,
  };
  return (
    <AssignmentsUIContext.Provider value={value}>
      {children}
    </AssignmentsUIContext.Provider>
  );
}
