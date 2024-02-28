import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { FutsalReservesTable } from "./futsalReserves-table/FutsalReservesTable";
import {
  useFutsalReservesUIContext,
  FutsalReservesUIConsumer,
} from "./FutsalReservesUIContext";
import { useTranslation } from "react-i18next";

export function FutsalReservesCard() {
  const { t } = useTranslation();

  const futsalReservesUIContext = useFutsalReservesUIContext();

  const futsalReservesUIProps = useMemo(() => {
    return {
      ids: futsalReservesUIContext.ids,
      queryParams: futsalReservesUIContext.queryParams,
      setQueryParams: futsalReservesUIContext.setQueryParams,
      newFutsalReserveButtonClick:
        futsalReservesUIContext.newFutsalReserveButtonClick,
      openDeleteFutsalReservesDialog:
        futsalReservesUIContext.openDeleteFutsalReservesDialog,
      openEditFutsalReservePage:
        futsalReservesUIContext.openEditFutsalReservePage,
      openUpdateFutsalReservesStatusDialog:
        futsalReservesUIContext.openUpdateFutsalReservesStatusDialog,
      openFetchFutsalReservesDialog:
        futsalReservesUIContext.openFetchFutsalReservesDialog,
    };
  }, [futsalReservesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("FutsalReserve.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={futsalReservesUIProps.newFutsalReserveButtonClick}
          >
            {t("FutsalReserve.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <FutsalReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </FutsalReservesUIConsumer>
        <FutsalReservesTable />
      </CardBody>
    </Card>
  );
}
