import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingReservesTable } from "./bodyBuildingReserves-table/BodyBuildingReservesTable";
import {
  useBodyBuildingReservesUIContext,
  BodyBuildingReservesUIConsumer,
} from "./BodyBuildingReservesUIContext";
import { useTranslation } from "react-i18next";

export function BodyBuildingReservesCard() {
  const { t } = useTranslation();

  const bodyBuildingReservesUIContext = useBodyBuildingReservesUIContext();

  const bodyBuildingReservesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingReservesUIContext.ids,
      queryParams: bodyBuildingReservesUIContext.queryParams,
      setQueryParams: bodyBuildingReservesUIContext.setQueryParams,
      newBodyBuildingReserveButtonClick:
        bodyBuildingReservesUIContext.newBodyBuildingReserveButtonClick,
      openDeleteBodyBuildingReservesDialog:
        bodyBuildingReservesUIContext.openDeleteBodyBuildingReservesDialog,
      openEditBodyBuildingReservePage:
        bodyBuildingReservesUIContext.openEditBodyBuildingReservePage,
      openUpdateBodyBuildingReservesStatusDialog:
        bodyBuildingReservesUIContext.openUpdateBodyBuildingReservesStatusDialog,
      openFetchBodyBuildingReservesDialog:
        bodyBuildingReservesUIContext.openFetchBodyBuildingReservesDialog,
    };
  }, [bodyBuildingReservesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingReserve.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              bodyBuildingReservesUIProps.newBodyBuildingReserveButtonClick
            }
          >
            {t("BodyBuildingReserve.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingReservesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingReservesUIConsumer>
        <BodyBuildingReservesTable />
      </CardBody>
    </Card>
  );
}
