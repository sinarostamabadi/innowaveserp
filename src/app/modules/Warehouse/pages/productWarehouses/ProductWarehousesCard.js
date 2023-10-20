
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProductWarehousesTable } from "./productWarehouses-table/ProductWarehousesTable";
import { useProductWarehousesUIContext, ProductWarehousesUIConsumer } from "./ProductWarehousesUIContext";
import { useTranslation } from 'react-i18next';

export function ProductWarehousesCard() {
  const { t } = useTranslation();

  const productWarehousesUIContext = useProductWarehousesUIContext();

  const productWarehousesUIProps = useMemo(() => {
    return {
      ids: productWarehousesUIContext.ids,
      queryParams: productWarehousesUIContext.queryParams,
      setQueryParams: productWarehousesUIContext.setQueryParams,
      newProductWarehouseButtonClick: productWarehousesUIContext.newProductWarehouseButtonClick,
      openDeleteProductWarehousesDialog: productWarehousesUIContext.openDeleteProductWarehousesDialog,
      openEditProductWarehousePage: productWarehousesUIContext.openEditProductWarehousePage,
      openUpdateProductWarehousesStatusDialog: productWarehousesUIContext.openUpdateProductWarehousesStatusDialog,
      openFetchProductWarehousesDialog: productWarehousesUIContext.openFetchProductWarehousesDialog,
    };
  }, [productWarehousesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ProductWarehouse.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productWarehousesUIProps.newProductWarehouseButtonClick}
          >
            {t("ProductWarehouse.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductWarehousesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProductWarehousesUIConsumer>
        <ProductWarehousesTable />
      </CardBody>
    </Card>
  );
}