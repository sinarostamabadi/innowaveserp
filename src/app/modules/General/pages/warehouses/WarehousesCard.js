
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { WarehousesTable } from "./warehouses-table/WarehousesTable";
import { useWarehousesUIContext, WarehousesUIConsumer } from "./WarehousesUIContext";
import { useTranslation } from 'react-i18next';

export function WarehousesCard() {
  const { t } = useTranslation();

  const warehousesUIContext = useWarehousesUIContext();

  const warehousesUIProps = useMemo(() => {
    return {
      ids: warehousesUIContext.ids,
      queryParams: warehousesUIContext.queryParams,
      setQueryParams: warehousesUIContext.setQueryParams,
      newWarehouseButtonClick: warehousesUIContext.newWarehouseButtonClick,
      openDeleteWarehousesDialog: warehousesUIContext.openDeleteWarehousesDialog,
      openEditWarehousePage: warehousesUIContext.openEditWarehousePage,
      openUpdateWarehousesStatusDialog: warehousesUIContext.openUpdateWarehousesStatusDialog,
      openFetchWarehousesDialog: warehousesUIContext.openFetchWarehousesDialog,
    };
  }, [warehousesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Warehouse.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={warehousesUIProps.newWarehouseButtonClick}
          >
           <i className="far fa-plus"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <WarehousesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </WarehousesUIConsumer>
        <WarehousesTable />
      </CardBody>
    </Card>
  );
}