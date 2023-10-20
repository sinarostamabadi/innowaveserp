
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProductsTable } from "./products-table/ProductsTable";
import { useProductsUIContext, ProductsUIConsumer } from "./ProductsUIContext";
import { useTranslation } from 'react-i18next';

export function ProductsCard() {
  const { t } = useTranslation();

  const productsUIContext = useProductsUIContext();

  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      newProductButtonClick: productsUIContext.newProductButtonClick,
      openDeleteProductsDialog: productsUIContext.openDeleteProductsDialog,
      openEditProductPage: productsUIContext.openEditProductPage,
      openUpdateProductsStatusDialog: productsUIContext.openUpdateProductsStatusDialog,
      openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
      openPrintLabelDialog: productsUIContext.openPrintLabelDialog,
      openPrintGroupLabelDialog: productsUIContext.openPrintGroupLabelDialog
    };
  }, [productsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Product.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={productsUIProps.openPrintGroupLabelDialog}
          >
            {t("Common.Print")} {' '} {t("Common.GroupLabels")}
          </button>
          <button
            type="button"
            className="btn btn-primary mx-3"
            onClick={productsUIProps.openPrintLabelDialog}
          >
            {t("Common.Print")} {' '} {t("Common.Labels")}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productsUIProps.newProductButtonClick}
          >
            {t("Product.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProductsUIConsumer>
        <ProductsTable />
      </CardBody>
    </Card>
  );
}