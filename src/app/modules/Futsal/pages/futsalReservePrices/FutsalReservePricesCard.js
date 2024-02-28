import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalReservePricesTable } from "./futsalReservePrices-table/FutsalReservePricesTable";
import {
  useFutsalReservePricesUIContext,
  FutsalReservePricesUIConsumer,
} from "./FutsalReservePricesUIContext";
import { useTranslation } from "react-i18next";

export function FutsalReservePricesCard() {
  const { t } = useTranslation();

  const futsalReservePricesUIContext = useFutsalReservePricesUIContext();

  const futsalReservePricesUIProps = useMemo(() => {
    return {
      ids: futsalReservePricesUIContext.ids,
      queryParams: futsalReservePricesUIContext.queryParams,
      setQueryParams: futsalReservePricesUIContext.setQueryParams,
      newFutsalReservePriceButtonClick:
        futsalReservePricesUIContext.newFutsalReservePriceButtonClick,
      openDeleteFutsalReservePricesDialog:
        futsalReservePricesUIContext.openDeleteFutsalReservePricesDialog,
      openEditFutsalReservePricePage:
        futsalReservePricesUIContext.openEditFutsalReservePricePage,
      openUpdateFutsalReservePricesStatusDialog:
        futsalReservePricesUIContext.openUpdateFutsalReservePricesStatusDialog,
      openFetchFutsalReservePricesDialog:
        futsalReservePricesUIContext.openFetchFutsalReservePricesDialog,
    };
  }, [futsalReservePricesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("FutsalReservePrice.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              futsalReservePricesUIProps.newFutsalReservePriceButtonClick
            }
          >
            {t("FutsalReservePrice.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalReservePricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalReservePricesUIConsumer>
        <FutsalReservePricesTable />
      </CardBody>
    </Card>
  );
}
