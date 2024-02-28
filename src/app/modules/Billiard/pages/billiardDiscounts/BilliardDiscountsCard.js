import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BilliardDiscountsTable } from "./billiardDiscounts-table/BilliardDiscountsTable";
import {
  useBilliardDiscountsUIContext,
  BilliardDiscountsUIConsumer,
} from "./BilliardDiscountsUIContext";
import { useTranslation } from "react-i18next";

export function BilliardDiscountsCard() {
  const { t } = useTranslation();

  const billiardDiscountsUIContext = useBilliardDiscountsUIContext();

  const billiardDiscountsUIProps = useMemo(() => {
    return {
      ids: billiardDiscountsUIContext.ids,
      queryParams: billiardDiscountsUIContext.queryParams,
      setQueryParams: billiardDiscountsUIContext.setQueryParams,
      newBilliardDiscountButtonClick:
        billiardDiscountsUIContext.newBilliardDiscountButtonClick,
      openDeleteBilliardDiscountsDialog:
        billiardDiscountsUIContext.openDeleteBilliardDiscountsDialog,
      openEditBilliardDiscountPage:
        billiardDiscountsUIContext.openEditBilliardDiscountPage,
      openUpdateBilliardDiscountsStatusDialog:
        billiardDiscountsUIContext.openUpdateBilliardDiscountsStatusDialog,
      openFetchBilliardDiscountsDialog:
        billiardDiscountsUIContext.openFetchBilliardDiscountsDialog,
    };
  }, [billiardDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BilliardDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={billiardDiscountsUIProps.newBilliardDiscountButtonClick}
          >
            {t("BilliardDiscount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BilliardDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BilliardDiscountsUIConsumer>
        <BilliardDiscountsTable />
      </CardBody>
    </Card>
  );
}
