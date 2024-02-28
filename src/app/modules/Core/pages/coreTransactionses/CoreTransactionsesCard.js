import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoreTransactionsesTable } from "./coreTransactionses-table/CoreTransactionsesTable";
import {
  useCoreTransactionsesUIContext,
  CoreTransactionsesUIConsumer,
} from "./CoreTransactionsesUIContext";
export function CoreTransactionsesCard() {
  const coreTransactionsesUIContext = useCoreTransactionsesUIContext();
  const coreTransactionsesUIProps = useMemo(() => {
    return {
      ids: coreTransactionsesUIContext.ids,
      queryParams: coreTransactionsesUIContext.queryParams,
      setQueryParams: coreTransactionsesUIContext.setQueryParams,
      newCoreTransactionsButtonClick:
        coreTransactionsesUIContext.newCoreTransactionsButtonClick,
      openDeleteCoreTransactionsesDialog:
        coreTransactionsesUIContext.openDeleteCoreTransactionsesDialog,
      openEditCoreTransactionsPage:
        coreTransactionsesUIContext.openEditCoreTransactionsPage,
      openUpdateCoreTransactionsesStatusDialog:
        coreTransactionsesUIContext.openUpdateCoreTransactionsesStatusDialog,
      openFetchCoreTransactionsesDialog:
        coreTransactionsesUIContext.openFetchCoreTransactionsesDialog,
    };
  }, [coreTransactionsesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={coreTransactionsesUIProps.newCoreTransactionsButtonClick}
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoreTransactionsesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoreTransactionsesUIConsumer>
        <CoreTransactionsesTable />
      </CardBody>
    </Card>
  );
}
