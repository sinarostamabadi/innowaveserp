import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { TimePriceingTable } from "./timePriceing-table/TimePriceingTable";
import {
  useTimePriceingUIContext,
  TimePriceingUIConsumer,
} from "./TimePriceingUIContext";
import { useTranslation } from "react-i18next";

export function TimePriceingCard() {
  const { t } = useTranslation();

  const timePriceingUIContext = useTimePriceingUIContext();

  const timePriceingUIProps = useMemo(() => {
    return {
      ids: timePriceingUIContext.ids,
      queryParams: timePriceingUIContext.queryParams,
      setQueryParams: timePriceingUIContext.setQueryParams,
      newTimePriceingButtonClick:
        timePriceingUIContext.newTimePriceingButtonClick,
      openDeleteTimePriceingDialog:
        timePriceingUIContext.openDeleteTimePriceingDialog,
      openEditTimePriceingPage: timePriceingUIContext.openEditTimePriceingPage,
      openUpdateTimePriceingStatusDialog:
        timePriceingUIContext.openUpdateTimePriceingStatusDialog,
      openFetchTimePriceingDialog:
        timePriceingUIContext.openFetchTimePriceingDialog,
    };
  }, [timePriceingUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("TimePriceing.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={timePriceingUIProps.newTimePriceingButtonClick}
          >
            {t("TimePriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <TimePriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </TimePriceingUIConsumer>
        <TimePriceingTable />
      </CardBody>
    </Card>
  );
}
