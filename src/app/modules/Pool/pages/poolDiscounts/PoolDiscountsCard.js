import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PoolDiscountsTable } from "./poolDiscounts-table/PoolDiscountsTable";
import {
  usePoolDiscountsUIContext,
  PoolDiscountsUIConsumer,
} from "./PoolDiscountsUIContext";
import { useTranslation } from "react-i18next";

export function PoolDiscountsCard() {
  const { t } = useTranslation();

  const poolDiscountsUIContext = usePoolDiscountsUIContext();

  const poolDiscountsUIProps = useMemo(() => {
    return {
      ids: poolDiscountsUIContext.ids,
      queryParams: poolDiscountsUIContext.queryParams,
      setQueryParams: poolDiscountsUIContext.setQueryParams,
      newPoolDiscountButtonClick:
        poolDiscountsUIContext.newPoolDiscountButtonClick,
      openDeletePoolDiscountsDialog:
        poolDiscountsUIContext.openDeletePoolDiscountsDialog,
      openEditPoolDiscountPage: poolDiscountsUIContext.openEditPoolDiscountPage,
      openUpdatePoolDiscountsStatusDialog:
        poolDiscountsUIContext.openUpdatePoolDiscountsStatusDialog,
      openFetchPoolDiscountsDialog:
        poolDiscountsUIContext.openFetchPoolDiscountsDialog,
    };
  }, [poolDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("PoolDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={poolDiscountsUIProps.newPoolDiscountButtonClick}
          >
            {t("PoolDiscount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PoolDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PoolDiscountsUIConsumer>
        <PoolDiscountsTable />
      </CardBody>
    </Card>
  );
}
