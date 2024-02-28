import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PoolTimePriceingTable } from "./poolTimePriceing-table/PoolTimePriceingTable";
import {
  usePoolTimePriceingUIContext,
  PoolTimePriceingUIConsumer,
} from "./PoolTimePriceingUIContext";
import { useTranslation } from "react-i18next";

export function PoolTimePriceingCard() {
  const { t } = useTranslation();

  const poolTimePriceingUIContext = usePoolTimePriceingUIContext();

  const poolTimePriceingUIProps = useMemo(() => {
    return {
      ids: poolTimePriceingUIContext.ids,
      queryParams: poolTimePriceingUIContext.queryParams,
      setQueryParams: poolTimePriceingUIContext.setQueryParams,
      newPoolTimePriceingButtonClick:
        poolTimePriceingUIContext.newPoolTimePriceingButtonClick,
      openDeletePoolTimePriceingDialog:
        poolTimePriceingUIContext.openDeletePoolTimePriceingDialog,
      openEditPoolTimePriceingPage:
        poolTimePriceingUIContext.openEditPoolTimePriceingPage,
      openUpdatePoolTimePriceingStatusDialog:
        poolTimePriceingUIContext.openUpdatePoolTimePriceingStatusDialog,
      openFetchPoolTimePriceingDialog:
        poolTimePriceingUIContext.openFetchPoolTimePriceingDialog,
    };
  }, [poolTimePriceingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("PoolTimePriceing.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={poolTimePriceingUIProps.newPoolTimePriceingButtonClick}
          >
            {t("PoolTimePriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PoolTimePriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PoolTimePriceingUIConsumer>
        <PoolTimePriceingTable />
      </CardBody>
    </Card>
  );
}
