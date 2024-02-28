import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalDiscountsTable } from "./futsalDiscounts-table/FutsalDiscountsTable";
import {
  useFutsalDiscountsUIContext,
  FutsalDiscountsUIConsumer,
} from "./FutsalDiscountsUIContext";
import { useTranslation } from "react-i18next";

export function FutsalDiscountsCard() {
  const { t } = useTranslation();

  const futsalDiscountsUIContext = useFutsalDiscountsUIContext();

  const futsalDiscountsUIProps = useMemo(() => {
    return {
      ids: futsalDiscountsUIContext.ids,
      queryParams: futsalDiscountsUIContext.queryParams,
      setQueryParams: futsalDiscountsUIContext.setQueryParams,
      newFutsalDiscountButtonClick:
        futsalDiscountsUIContext.newFutsalDiscountButtonClick,
      openDeleteFutsalDiscountsDialog:
        futsalDiscountsUIContext.openDeleteFutsalDiscountsDialog,
      openEditFutsalDiscountPage:
        futsalDiscountsUIContext.openEditFutsalDiscountPage,
      openUpdateFutsalDiscountsStatusDialog:
        futsalDiscountsUIContext.openUpdateFutsalDiscountsStatusDialog,
      openFetchFutsalDiscountsDialog:
        futsalDiscountsUIContext.openFetchFutsalDiscountsDialog,
    };
  }, [futsalDiscountsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("FutsalDiscount.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalDiscountsUIProps.newFutsalDiscountButtonClick}
          >
            {t("FutsalDiscount.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalDiscountsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalDiscountsUIConsumer>
        <FutsalDiscountsTable />
      </CardBody>
    </Card>
  );
}
