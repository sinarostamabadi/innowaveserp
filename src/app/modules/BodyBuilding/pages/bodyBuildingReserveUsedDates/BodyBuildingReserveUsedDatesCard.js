import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { BodyBuildingReserveUsedDatesTable } from "./bodyBuildingReserveUsedDates-table/BodyBuildingReserveUsedDatesTable";
import {
  useBodyBuildingReserveUsedDatesUIContext,
  BodyBuildingReserveUsedDatesUIConsumer,
} from "./BodyBuildingReserveUsedDatesUIContext";
import { useTranslation } from "react-i18next";

export function BodyBuildingReserveUsedDatesCard() {
  const { t } = useTranslation();

  const bodyBuildingReserveUsedDatesUIContext =
    useBodyBuildingReserveUsedDatesUIContext();

  const bodyBuildingReserveUsedDatesUIProps = useMemo(() => {
    return {
      ids: bodyBuildingReserveUsedDatesUIContext.ids,
      queryParams: bodyBuildingReserveUsedDatesUIContext.queryParams,
      setQueryParams: bodyBuildingReserveUsedDatesUIContext.setQueryParams,
      newBodyBuildingReserveUsedDateButtonClick:
        bodyBuildingReserveUsedDatesUIContext.newBodyBuildingReserveUsedDateButtonClick,
      openDeleteBodyBuildingReserveUsedDatesDialog:
        bodyBuildingReserveUsedDatesUIContext.openDeleteBodyBuildingReserveUsedDatesDialog,
      openEditBodyBuildingReserveUsedDatePage:
        bodyBuildingReserveUsedDatesUIContext.openEditBodyBuildingReserveUsedDatePage,
      openUpdateBodyBuildingReserveUsedDatesStatusDialog:
        bodyBuildingReserveUsedDatesUIContext.openUpdateBodyBuildingReserveUsedDatesStatusDialog,
      openFetchBodyBuildingReserveUsedDatesDialog:
        bodyBuildingReserveUsedDatesUIContext.openFetchBodyBuildingReserveUsedDatesDialog,
    };
  }, [bodyBuildingReserveUsedDatesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("BodyBuildingReserveUsedDate.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              bodyBuildingReserveUsedDatesUIProps.newBodyBuildingReserveUsedDateButtonClick
            }
          >
            {t("BodyBuildingReserveUsedDate.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <BodyBuildingReserveUsedDatesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </BodyBuildingReserveUsedDatesUIConsumer>
        <BodyBuildingReserveUsedDatesTable />
      </CardBody>
    </Card>
  );
}
