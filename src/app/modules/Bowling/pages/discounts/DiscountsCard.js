import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { DiscountsTable } from "./discounts-table/DiscountsTable";
import {
  useDiscountsUIContext,
  DiscountsUIConsumer,
} from "./DiscountsUIContext";
import { useTranslation } from "react-i18next";

export function DiscountsCard() {
  const { t } = useTranslation();

  const discountsUIContext = useDiscountsUIContext();

  const discountsUIProps = useMemo(() => {
    return {
      ids: discountsUIContext.ids,
      queryParams: discountsUIContext.queryParams,
      setQueryParams: discountsUIContext.setQueryParams,
      newDiscountButtonClick: discountsUIContext.newDiscountButtonClick,
      openDeleteDiscountsDialog: discountsUIContext.openDeleteDiscountsDialog,
      openEditDiscountPage: discountsUIContext.openEditDiscountPage,
      openUpdateDiscountsStatusDialog:
        discountsUIContext.openUpdateDiscountsStatusDialog,
      openFetchDiscountsDialog: discountsUIContext.openFetchDiscountsDialog,
    };
  }, [discountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("Discount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={discountsUIProps.newDiscountButtonClick}
          >
            {t("Discount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <DiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </DiscountsUIConsumer>
        <DiscountsTable />
      </CardBody>
    </Card>
  );
}
