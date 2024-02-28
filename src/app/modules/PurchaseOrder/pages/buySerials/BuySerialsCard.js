import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BuySerialsTable } from "./buySerials-table/BuySerialsTable";
import {
  useBuySerialsUIContext,
  BuySerialsUIConsumer,
} from "./BuySerialsUIContext";
import { useTranslation } from "react-i18next";

export function BuySerialsCard() {
  const { t } = useTranslation();

  const buySerialsUIContext = useBuySerialsUIContext();

  const buySerialsUIProps = useMemo(() => {
    return {
      ids: buySerialsUIContext.ids,
      queryParams: buySerialsUIContext.queryParams,
      setQueryParams: buySerialsUIContext.setQueryParams,
      newBuySerialButtonClick: buySerialsUIContext.newBuySerialButtonClick,
      openDeleteBuySerialsDialog:
        buySerialsUIContext.openDeleteBuySerialsDialog,
      openEditBuySerialPage: buySerialsUIContext.openEditBuySerialPage,
      openUpdateBuySerialsStatusDialog:
        buySerialsUIContext.openUpdateBuySerialsStatusDialog,
      openFetchBuySerialsDialog: buySerialsUIContext.openFetchBuySerialsDialog,
    };
  }, [buySerialsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("BuySerial.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={buySerialsUIProps.newBuySerialButtonClick}
          >
            {t("BuySerial.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BuySerialsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BuySerialsUIConsumer>
        <BuySerialsTable />
      </CardBody>
    </Card>
  );
}
