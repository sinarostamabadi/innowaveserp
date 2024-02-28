import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalReserveDatesTable } from "./futsalReserveDates-table/FutsalReserveDatesTable";
import {
  useFutsalReserveDatesUIContext,
  FutsalReserveDatesUIConsumer,
} from "./FutsalReserveDatesUIContext";
import { useTranslation } from "react-i18next";

export function FutsalReserveDatesCard() {
  const { t } = useTranslation();

  const futsalReserveDatesUIContext = useFutsalReserveDatesUIContext();

  const futsalReserveDatesUIProps = useMemo(() => {
    return {
      ids: futsalReserveDatesUIContext.ids,
      queryParams: futsalReserveDatesUIContext.queryParams,
      setQueryParams: futsalReserveDatesUIContext.setQueryParams,
      newFutsalReserveDateButtonClick:
        futsalReserveDatesUIContext.newFutsalReserveDateButtonClick,
      openDeleteFutsalReserveDatesDialog:
        futsalReserveDatesUIContext.openDeleteFutsalReserveDatesDialog,
      openEditFutsalReserveDatePage:
        futsalReserveDatesUIContext.openEditFutsalReserveDatePage,
      openUpdateFutsalReserveDatesStatusDialog:
        futsalReserveDatesUIContext.openUpdateFutsalReserveDatesStatusDialog,
      openFetchFutsalReserveDatesDialog:
        futsalReserveDatesUIContext.openFetchFutsalReserveDatesDialog,
    };
  }, [futsalReserveDatesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("FutsalReserveDate.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalReserveDatesUIProps.newFutsalReserveDateButtonClick}
          >
            {t("FutsalReserveDate.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalReserveDatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalReserveDatesUIConsumer>
        <FutsalReserveDatesTable />
      </CardBody>
    </Card>
  );
}
