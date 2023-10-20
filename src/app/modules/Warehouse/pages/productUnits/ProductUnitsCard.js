
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProductUnitsTable } from "./productUnits-table/ProductUnitsTable";
import { useProductUnitsUIContext, ProductUnitsUIConsumer } from "./ProductUnitsUIContext";
import { useTranslation } from 'react-i18next';

export function ProductUnitsCard() {
  const { t } = useTranslation();

  const productUnitsUIContext = useProductUnitsUIContext();

  const productUnitsUIProps = useMemo(() => {
    return {
      ids: productUnitsUIContext.ids,
      queryParams: productUnitsUIContext.queryParams,
      setQueryParams: productUnitsUIContext.setQueryParams,
      newProductUnitButtonClick: productUnitsUIContext.newProductUnitButtonClick,
      openDeleteProductUnitsDialog: productUnitsUIContext.openDeleteProductUnitsDialog,
      openEditProductUnitPage: productUnitsUIContext.openEditProductUnitPage,
      openUpdateProductUnitsStatusDialog: productUnitsUIContext.openUpdateProductUnitsStatusDialog,
      openFetchProductUnitsDialog: productUnitsUIContext.openFetchProductUnitsDialog,
    };
  }, [productUnitsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ProductUnit.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productUnitsUIProps.newProductUnitButtonClick}
          >
            {t("ProductUnit.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductUnitsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProductUnitsUIConsumer>
        <ProductUnitsTable />
      </CardBody>
    </Card>
  );
}