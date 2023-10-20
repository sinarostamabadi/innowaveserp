
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuyDiscountsTable } from "./buyDiscounts-table/BuyDiscountsTable";
import { useBuyDiscountsUIContext, BuyDiscountsUIConsumer } from "./BuyDiscountsUIContext";
import { useTranslation } from 'react-i18next';

export function BuyDiscountsCard() {
  const { t } = useTranslation();

  const buyDiscountsUIContext = useBuyDiscountsUIContext();

  const buyDiscountsUIProps = useMemo(() => {
    return {
      ids: buyDiscountsUIContext.ids,
      queryParams: buyDiscountsUIContext.queryParams,
      setQueryParams: buyDiscountsUIContext.setQueryParams,
      newBuyDiscountButtonClick: buyDiscountsUIContext.newBuyDiscountButtonClick,
      openDeleteBuyDiscountsDialog: buyDiscountsUIContext.openDeleteBuyDiscountsDialog,
      openEditBuyDiscountPage: buyDiscountsUIContext.openEditBuyDiscountPage,
      openUpdateBuyDiscountsStatusDialog: buyDiscountsUIContext.openUpdateBuyDiscountsStatusDialog,
      openFetchBuyDiscountsDialog: buyDiscountsUIContext.openFetchBuyDiscountsDialog,
    };
  }, [buyDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("BuyDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buyDiscountsUIProps.newBuyDiscountButtonClick}
          >
            {t("BuyDiscount.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuyDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuyDiscountsUIConsumer>
        <BuyDiscountsTable />
      </CardBody>
    </Card>
  );
}