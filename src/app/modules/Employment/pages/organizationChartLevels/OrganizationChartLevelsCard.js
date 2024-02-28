import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OrganizationChartLevelsTable } from "./organizationChartLevels-table/OrganizationChartLevelsTable";
import {
  useOrganizationChartLevelsUIContext,
  OrganizationChartLevelsUIConsumer,
} from "./OrganizationChartLevelsUIContext";
import { useTranslation } from "react-i18next";

export function OrganizationChartLevelsCard() {
  const { t } = useTranslation();

  const organizationChartLevelsUIContext =
    useOrganizationChartLevelsUIContext();

  const organizationChartLevelsUIProps = useMemo(() => {
    return {
      ids: organizationChartLevelsUIContext.ids,
      queryParams: organizationChartLevelsUIContext.queryParams,
      setQueryParams: organizationChartLevelsUIContext.setQueryParams,
      newOrganizationChartLevelButtonClick:
        organizationChartLevelsUIContext.newOrganizationChartLevelButtonClick,
      openDeleteOrganizationChartLevelsDialog:
        organizationChartLevelsUIContext.openDeleteOrganizationChartLevelsDialog,
      openEditOrganizationChartLevelPage:
        organizationChartLevelsUIContext.openEditOrganizationChartLevelPage,
      openUpdateOrganizationChartLevelsStatusDialog:
        organizationChartLevelsUIContext.openUpdateOrganizationChartLevelsStatusDialog,
      openFetchOrganizationChartLevelsDialog:
        organizationChartLevelsUIContext.openFetchOrganizationChartLevelsDialog,
    };
  }, [organizationChartLevelsUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("OrganizationChartLevel.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              organizationChartLevelsUIProps.newOrganizationChartLevelButtonClick
            }
          >
            {t("OrganizationChartLevel.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrganizationChartLevelsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OrganizationChartLevelsUIConsumer>
        <OrganizationChartLevelsTable />
      </CardBody>
    </Card>
  );
}
