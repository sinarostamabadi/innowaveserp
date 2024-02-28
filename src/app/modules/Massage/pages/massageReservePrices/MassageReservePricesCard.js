import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageReservePricesTable } from "./massageReservePrices-table/MassageReservePricesTable";
import {
  useMassageReservePricesUIContext,
  MassageReservePricesUIConsumer,
} from "./MassageReservePricesUIContext";
import { useTranslation } from "react-i18next";

export function MassageReservePricesCard() {
  const { t } = useTranslation();

  const massageReservePricesUIContext = useMassageReservePricesUIContext();

  const massageReservePricesUIProps = useMemo(() => {
    return {
      ids: massageReservePricesUIContext.ids,
      queryParams: massageReservePricesUIContext.queryParams,
      setQueryParams: massageReservePricesUIContext.setQueryParams,
      newMassageReservePriceButtonClick:
        massageReservePricesUIContext.newMassageReservePriceButtonClick,
      openDeleteMassageReservePricesDialog:
        massageReservePricesUIContext.openDeleteMassageReservePricesDialog,
      openEditMassageReservePricePage:
        massageReservePricesUIContext.openEditMassageReservePricePage,
      openUpdateMassageReservePricesStatusDialog:
        massageReservePricesUIContext.openUpdateMassageReservePricesStatusDialog,
      openFetchMassageReservePricesDialog:
        massageReservePricesUIContext.openFetchMassageReservePricesDialog,
    };
  }, [massageReservePricesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("MassageReservePrice.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              massageReservePricesUIProps.newMassageReservePriceButtonClick
            }
          >
            {t("MassageReservePrice.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageReservePricesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageReservePricesUIConsumer>
        <MassageReservePricesTable />
      </CardBody>
    </Card>
  );
}
