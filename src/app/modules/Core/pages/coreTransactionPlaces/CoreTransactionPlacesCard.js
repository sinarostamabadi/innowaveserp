import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { CoreTransactionPlacesTable } from "./coreTransactionPlaces-table/CoreTransactionPlacesTable";
import {
  useCoreTransactionPlacesUIContext,
  CoreTransactionPlacesUIConsumer,
} from "./CoreTransactionPlacesUIContext";
export function CoreTransactionPlacesCard() {
  const coreTransactionPlacesUIContext = useCoreTransactionPlacesUIContext();
  const coreTransactionPlacesUIProps = useMemo(() => {
    return {
      ids: coreTransactionPlacesUIContext.ids,
      queryParams: coreTransactionPlacesUIContext.queryParams,
      setQueryParams: coreTransactionPlacesUIContext.setQueryParams,
      newCoreTransactionPlaceButtonClick:
        coreTransactionPlacesUIContext.newCoreTransactionPlaceButtonClick,
      openDeleteCoreTransactionPlacesDialog:
        coreTransactionPlacesUIContext.openDeleteCoreTransactionPlacesDialog,
      openEditCoreTransactionPlacePage:
        coreTransactionPlacesUIContext.openEditCoreTransactionPlacePage,
      openUpdateCoreTransactionPlacesStatusDialog:
        coreTransactionPlacesUIContext.openUpdateCoreTransactionPlacesStatusDialog,
      openFetchCoreTransactionPlacesDialog:
        coreTransactionPlacesUIContext.openFetchCoreTransactionPlacesDialog,
    };
  }, [coreTransactionPlacesUIContext]);
  return (
    <Card>
      <CardHeader title="EntityTitle">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              coreTransactionPlacesUIProps.newCoreTransactionPlaceButtonClick
            }
          >
            EntityTitle
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CoreTransactionPlacesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </CoreTransactionPlacesUIConsumer>
        <CoreTransactionPlacesTable />
      </CardBody>
    </Card>
  );
}
