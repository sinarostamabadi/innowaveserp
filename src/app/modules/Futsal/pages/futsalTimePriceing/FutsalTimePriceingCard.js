import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalTimePriceingTable } from "./futsalTimePriceing-table/FutsalTimePriceingTable";
import {
  useFutsalTimePriceingUIContext,
  FutsalTimePriceingUIConsumer,
} from "./FutsalTimePriceingUIContext";
import { useTranslation } from "react-i18next";

export function FutsalTimePriceingCard() {
  const { t } = useTranslation();

  const futsalTimePriceingUIContext = useFutsalTimePriceingUIContext();

  const futsalTimePriceingUIProps = useMemo(() => {
    return {
      ids: futsalTimePriceingUIContext.ids,
      queryParams: futsalTimePriceingUIContext.queryParams,
      setQueryParams: futsalTimePriceingUIContext.setQueryParams,
      newFutsalTimePriceingButtonClick:
        futsalTimePriceingUIContext.newFutsalTimePriceingButtonClick,
      openDeleteFutsalTimePriceingDialog:
        futsalTimePriceingUIContext.openDeleteFutsalTimePriceingDialog,
      openEditFutsalTimePriceingPage:
        futsalTimePriceingUIContext.openEditFutsalTimePriceingPage,
      openUpdateFutsalTimePriceingStatusDialog:
        futsalTimePriceingUIContext.openUpdateFutsalTimePriceingStatusDialog,
      openFetchFutsalTimePriceingDialog:
        futsalTimePriceingUIContext.openFetchFutsalTimePriceingDialog,
    };
  }, [futsalTimePriceingUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("FutsalTimePriceing.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalTimePriceingUIProps.newFutsalTimePriceingButtonClick}
          >
            {t("FutsalTimePriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalTimePriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalTimePriceingUIConsumer>
        <FutsalTimePriceingTable />
      </CardBody>
    </Card>
  );
}
