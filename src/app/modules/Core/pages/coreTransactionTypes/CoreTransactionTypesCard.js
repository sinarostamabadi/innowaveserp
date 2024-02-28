import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoreTransactionTypesTable } from "./coreTransactionTypes-table/CoreTransactionTypesTable";
import {
  useCoreTransactionTypesUIContext,
  CoreTransactionTypesUIConsumer,
} from "./CoreTransactionTypesUIContext";
export function CoreTransactionTypesCard() {
  const coreTransactionTypesUIContext = useCoreTransactionTypesUIContext();
  const coreTransactionTypesUIProps = useMemo(() => {
    return {
      ids: coreTransactionTypesUIContext.ids,
      queryParams: coreTransactionTypesUIContext.queryParams,
      setQueryParams: coreTransactionTypesUIContext.setQueryParams,
      newCoreTransactionTypeButtonClick:
        coreTransactionTypesUIContext.newCoreTransactionTypeButtonClick,
      openDeleteCoreTransactionTypesDialog:
        coreTransactionTypesUIContext.openDeleteCoreTransactionTypesDialog,
      openEditCoreTransactionTypePage:
        coreTransactionTypesUIContext.openEditCoreTransactionTypePage,
      openUpdateCoreTransactionTypesStatusDialog:
        coreTransactionTypesUIContext.openUpdateCoreTransactionTypesStatusDialog,
      openFetchCoreTransactionTypesDialog:
        coreTransactionTypesUIContext.openFetchCoreTransactionTypesDialog,
    };
  }, [coreTransactionTypesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              coreTransactionTypesUIProps.newCoreTransactionTypeButtonClick
            }
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoreTransactionTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoreTransactionTypesUIConsumer>
        <CoreTransactionTypesTable />
      </CardBody>
    </Card>
  );
}
