import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { PoolReservesTable } from "./poolReserves-table/PoolReservesTable";
import {
  usePoolReservesUIContext,
  PoolReservesUIConsumer,
} from "./PoolReservesUIContext";
import { useTranslation } from "react-i18next";

export function PoolReservesCard() {
  const { t } = useTranslation();

  const poolReservesUIContext = usePoolReservesUIContext();

  const poolReservesUIProps = useMemo(() => {
    return {
      ids: poolReservesUIContext.ids,
      queryParams: poolReservesUIContext.queryParams,
      setQueryParams: poolReservesUIContext.setQueryParams,
      newPoolReserveButtonClick:
        poolReservesUIContext.newPoolReserveButtonClick,
      openDeletePoolReservesDialog:
        poolReservesUIContext.openDeletePoolReservesDialog,
      openEditPoolReservePage: poolReservesUIContext.openEditPoolReservePage,
      openUpdatePoolReservesStatusDialog:
        poolReservesUIContext.openUpdatePoolReservesStatusDialog,
      openFetchPoolReservesDialog:
        poolReservesUIContext.openFetchPoolReservesDialog,
    };
  }, [poolReservesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("PoolReserve.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={poolReservesUIProps.newPoolReserveButtonClick}
          >
            {t("PoolReserve.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <PoolReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </PoolReservesUIConsumer>
        <PoolReservesTable />
      </CardBody>
    </Card>
  );
}
