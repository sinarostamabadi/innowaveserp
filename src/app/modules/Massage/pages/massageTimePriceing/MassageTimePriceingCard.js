import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageTimePriceingTable } from "./massageTimePriceing-table/MassageTimePriceingTable";
import {
  useMassageTimePriceingUIContext,
  MassageTimePriceingUIConsumer,
} from "./MassageTimePriceingUIContext";
import { useTranslation } from "react-i18next";

export function MassageTimePriceingCard() {
  const { t } = useTranslation();

  const massageTimePriceingUIContext = useMassageTimePriceingUIContext();

  const massageTimePriceingUIProps = useMemo(() => {
    return {
      ids: massageTimePriceingUIContext.ids,
      queryParams: massageTimePriceingUIContext.queryParams,
      setQueryParams: massageTimePriceingUIContext.setQueryParams,
      newMassageTimePriceingButtonClick:
        massageTimePriceingUIContext.newMassageTimePriceingButtonClick,
      openDeleteMassageTimePriceingDialog:
        massageTimePriceingUIContext.openDeleteMassageTimePriceingDialog,
      openEditMassageTimePriceingPage:
        massageTimePriceingUIContext.openEditMassageTimePriceingPage,
      openUpdateMassageTimePriceingStatusDialog:
        massageTimePriceingUIContext.openUpdateMassageTimePriceingStatusDialog,
      openFetchMassageTimePriceingDialog:
        massageTimePriceingUIContext.openFetchMassageTimePriceingDialog,
    };
  }, [massageTimePriceingUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("MassageTimePriceing.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              massageTimePriceingUIProps.newMassageTimePriceingButtonClick
            }
          >
            {t("MassageTimePriceing.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageTimePriceingUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageTimePriceingUIConsumer>
        <MassageTimePriceingTable />
      </CardBody>
    </Card>
  );
}
