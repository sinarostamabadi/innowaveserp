import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { MassageReservesTable } from "./massageReserves-table/MassageReservesTable";
import {
  useMassageReservesUIContext,
  MassageReservesUIConsumer,
} from "./MassageReservesUIContext";
import { useTranslation } from "react-i18next";

export function MassageReservesCard() {
  const { t } = useTranslation();

  const massageReservesUIContext = useMassageReservesUIContext();

  const massageReservesUIProps = useMemo(() => {
    return {
      ids: massageReservesUIContext.ids,
      queryParams: massageReservesUIContext.queryParams,
      setQueryParams: massageReservesUIContext.setQueryParams,
      newMassageReserveButtonClick:
        massageReservesUIContext.newMassageReserveButtonClick,
      openDeleteMassageReservesDialog:
        massageReservesUIContext.openDeleteMassageReservesDialog,
      openEditMassageReservePage:
        massageReservesUIContext.openEditMassageReservePage,
      openUpdateMassageReservesStatusDialog:
        massageReservesUIContext.openUpdateMassageReservesStatusDialog,
      openFetchMassageReservesDialog:
        massageReservesUIContext.openFetchMassageReservesDialog,
    };
  }, [massageReservesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("MassageReserve.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={massageReservesUIProps.newMassageReserveButtonClick}
          >
            {t("MassageReserve.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <MassageReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </MassageReservesUIConsumer>
        <MassageReservesTable />
      </CardBody>
    </Card>
  );
}
