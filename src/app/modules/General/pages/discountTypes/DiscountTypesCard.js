import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DiscountTypesTable } from "./discountTypes-table/DiscountTypesTable";
import { useDiscountTypesUIContext, DiscountTypesUIConsumer } from "./DiscountTypesUIContext";
import { useTranslation } from 'react-i18next';

export function DiscountTypesCard() {
  const { t } = useTranslation();

  const discountTypesUIContext = useDiscountTypesUIContext();

  const discountTypesUIProps = useMemo(() => {
    return {
      ids: discountTypesUIContext.ids,
      queryParams: discountTypesUIContext.queryParams,
      setQueryParams: discountTypesUIContext.setQueryParams,
      newDiscountTypeButtonClick: discountTypesUIContext.newDiscountTypeButtonClick,
      openDeleteDiscountTypesDialog: discountTypesUIContext.openDeleteDiscountTypesDialog,
      openEditDiscountTypePage: discountTypesUIContext.openEditDiscountTypePage,
      openUpdateDiscountTypesStatusDialog: discountTypesUIContext.openUpdateDiscountTypesStatusDialog,
      openFetchDiscountTypesDialog: discountTypesUIContext.openFetchDiscountTypesDialog,
    };
  }, [discountTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("DiscountType.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={discountTypesUIProps.newDiscountTypeButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DiscountTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DiscountTypesUIConsumer>
        <DiscountTypesTable />
      </CardBody>
    </Card>
  );
}