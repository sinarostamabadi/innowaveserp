
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ProductGroupsTable } from "./productGroups-table/ProductGroupsTable";
import { useProductGroupsUIContext, ProductGroupsUIConsumer } from "./ProductGroupsUIContext";
import { useTranslation } from 'react-i18next';

export function ProductGroupsCard({history}) {
  const { t } = useTranslation();

  const productGroupsUIContext = useProductGroupsUIContext();

  const productGroupsUIProps = useMemo(() => {
    return {
      ids: productGroupsUIContext.ids,
      queryParams: productGroupsUIContext.queryParams,
      setQueryParams: productGroupsUIContext.setQueryParams,
      newProductGroupButtonClick: productGroupsUIContext.newProductGroupButtonClick,
      openDeleteProductGroupsDialog: productGroupsUIContext.openDeleteProductGroupsDialog,
      openEditProductGroupPage: productGroupsUIContext.openEditProductGroupPage,
      openUpdateProductGroupsStatusDialog: productGroupsUIContext.openUpdateProductGroupsStatusDialog,
      openFetchProductGroupsDialog: productGroupsUIContext.openFetchProductGroupsDialog,
    };
  }, [productGroupsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ProductGroup.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={productGroupsUIProps.newProductGroupButtonClick}
          >
            {t("ProductGroup.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ProductGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ProductGroupsUIConsumer>
        <ProductGroupsTable history={history}/>
      </CardBody>
    </Card>
  );
}