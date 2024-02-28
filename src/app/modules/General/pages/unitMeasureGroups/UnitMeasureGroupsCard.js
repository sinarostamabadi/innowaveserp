import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { UnitMeasureGroupsTable } from "./unitMeasureGroups-table/UnitMeasureGroupsTable";
import {
  useUnitMeasureGroupsUIContext,
  UnitMeasureGroupsUIConsumer,
} from "./UnitMeasureGroupsUIContext";
import { useTranslation } from "react-i18next";

export function UnitMeasureGroupsCard() {
  const { t } = useTranslation();

  const unitMeasureGroupsUIContext = useUnitMeasureGroupsUIContext();

  const unitMeasureGroupsUIProps = useMemo(() => {
    return {
      ids: unitMeasureGroupsUIContext.ids,
      queryParams: unitMeasureGroupsUIContext.queryParams,
      setQueryParams: unitMeasureGroupsUIContext.setQueryParams,
      newUnitMeasureGroupButtonClick:
        unitMeasureGroupsUIContext.newUnitMeasureGroupButtonClick,
      openDeleteUnitMeasureGroupsDialog:
        unitMeasureGroupsUIContext.openDeleteUnitMeasureGroupsDialog,
      openEditUnitMeasureGroupPage:
        unitMeasureGroupsUIContext.openEditUnitMeasureGroupPage,
      openUpdateUnitMeasureGroupsStatusDialog:
        unitMeasureGroupsUIContext.openUpdateUnitMeasureGroupsStatusDialog,
      openFetchUnitMeasureGroupsDialog:
        unitMeasureGroupsUIContext.openFetchUnitMeasureGroupsDialog,
    };
  }, [unitMeasureGroupsUIContext]);

  return (
    <Card>
      <CardHeader title={t("UnitMeasureGroup.Plural")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={unitMeasureGroupsUIProps.newUnitMeasureGroupButtonClick}
          >
            <i className="far fa-plus ml-1"></i> {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <UnitMeasureGroupsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </UnitMeasureGroupsUIConsumer>
        <UnitMeasureGroupsTable />
      </CardBody>
    </Card>
  );
}
