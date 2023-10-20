
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OrganizationChartsTable } from "./organizationCharts-table/OrganizationChartsTable";
import { useOrganizationChartsUIContext, OrganizationChartsUIConsumer } from "./OrganizationChartsUIContext";
import { useTranslation } from 'react-i18next';

export function OrganizationChartsCard() {
  const { t } = useTranslation();

  const organizationChartsUIContext = useOrganizationChartsUIContext();

  const organizationChartsUIProps = useMemo(() => {
    return {
      ids: organizationChartsUIContext.ids,
      queryParams: organizationChartsUIContext.queryParams,
      setQueryParams: organizationChartsUIContext.setQueryParams,
      newOrganizationChartButtonClick: organizationChartsUIContext.newOrganizationChartButtonClick,
      openDeleteOrganizationChartsDialog: organizationChartsUIContext.openDeleteOrganizationChartsDialog,
      openEditOrganizationChartPage: organizationChartsUIContext.openEditOrganizationChartPage,
      openUpdateOrganizationChartsStatusDialog: organizationChartsUIContext.openUpdateOrganizationChartsStatusDialog,
      openFetchOrganizationChartsDialog: organizationChartsUIContext.openFetchOrganizationChartsDialog,
    };
  }, [organizationChartsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("OrganizationChart.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={organizationChartsUIProps.newOrganizationChartButtonClick}
          >
            {t("OrganizationChart.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrganizationChartsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OrganizationChartsUIConsumer>
        <OrganizationChartsTable />
      </CardBody>
    </Card>
  );
}