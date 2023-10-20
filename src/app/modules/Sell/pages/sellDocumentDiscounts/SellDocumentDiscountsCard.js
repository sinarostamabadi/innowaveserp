
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { SellDocumentDiscountsTable } from "./sellDocumentDiscounts-table/SellDocumentDiscountsTable";
import { useSellDocumentDiscountsUIContext, SellDocumentDiscountsUIConsumer } from "./SellDocumentDiscountsUIContext";
import { useTranslation } from 'react-i18next';

export function SellDocumentDiscountsCard() {
  const { t } = useTranslation();

  const sellDocumentDiscountsUIContext = useSellDocumentDiscountsUIContext();

  const sellDocumentDiscountsUIProps = useMemo(() => {
    return {
      ids: sellDocumentDiscountsUIContext.ids,
      queryParams: sellDocumentDiscountsUIContext.queryParams,
      setQueryParams: sellDocumentDiscountsUIContext.setQueryParams,
      newSellDocumentDiscountButtonClick: sellDocumentDiscountsUIContext.newSellDocumentDiscountButtonClick,
      openDeleteSellDocumentDiscountsDialog: sellDocumentDiscountsUIContext.openDeleteSellDocumentDiscountsDialog,
      openEditSellDocumentDiscountPage: sellDocumentDiscountsUIContext.openEditSellDocumentDiscountPage,
      openUpdateSellDocumentDiscountsStatusDialog: sellDocumentDiscountsUIContext.openUpdateSellDocumentDiscountsStatusDialog,
      openFetchSellDocumentDiscountsDialog: sellDocumentDiscountsUIContext.openFetchSellDocumentDiscountsDialog,
    };
  }, [sellDocumentDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("SellDocumentDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={sellDocumentDiscountsUIProps.newSellDocumentDiscountButtonClick}
          >
            {t("SellDocumentDiscount.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <SellDocumentDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </SellDocumentDiscountsUIConsumer>
        <SellDocumentDiscountsTable />
      </CardBody>
    </Card>
  );
}