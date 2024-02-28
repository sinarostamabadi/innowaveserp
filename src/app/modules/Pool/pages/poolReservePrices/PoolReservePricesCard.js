import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PoolReservePricesTable } from "./poolReservePrices-table/PoolReservePricesTable";
import {
  usePoolReservePricesUIContext,
  PoolReservePricesUIConsumer,
} from "./PoolReservePricesUIContext";
import { useTranslation } from "react-i18next";

export function PoolReservePricesCard() {
  const { t } = useTranslation();

  const poolReservePricesUIContext = usePoolReservePricesUIContext();

  const poolReservePricesUIProps = useMemo(() => {
    return {
      ids: poolReservePricesUIContext.ids,
      queryParams: poolReservePricesUIContext.queryParams,
      setQueryParams: poolReservePricesUIContext.setQueryParams,
      newPoolReservePriceButtonClick:
        poolReservePricesUIContext.newPoolReservePriceButtonClick,
      openDeletePoolReservePricesDialog:
        poolReservePricesUIContext.openDeletePoolReservePricesDialog,
      openEditPoolReservePricePage:
        poolReservePricesUIContext.openEditPoolReservePricePage,
      openUpdatePoolReservePricesStatusDialog:
        poolReservePricesUIContext.openUpdatePoolReservePricesStatusDialog,
      openFetchPoolReservePricesDialog:
        poolReservePricesUIContext.openFetchPoolReservePricesDialog,
    };
  }, [poolReservePricesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("PoolReservePrice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={poolReservePricesUIProps.newPoolReservePriceButtonClick}
          >
            {t("PoolReservePrice.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PoolReservePricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PoolReservePricesUIConsumer>
        <PoolReservePricesTable />
      </CardBody>
    </Card>
  );
}
