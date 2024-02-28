import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OrganizationChartEmployeesTable } from "./organizationChartEmployees-table/OrganizationChartEmployeesTable";
import {
  useOrganizationChartEmployeesUIContext,
  OrganizationChartEmployeesUIConsumer,
} from "./OrganizationChartEmployeesUIContext";
import { useTranslation } from "react-i18next";

export function OrganizationChartEmployeesCard() {
  const { t } = useTranslation();

  const organizationChartEmployeesUIContext =
    useOrganizationChartEmployeesUIContext();

  const organizationChartEmployeesUIProps = useMemo(() => {
    return {
      ids: organizationChartEmployeesUIContext.ids,
      queryParams: organizationChartEmployeesUIContext.queryParams,
      setQueryParams: organizationChartEmployeesUIContext.setQueryParams,
      newOrganizationChartEmployeeButtonClick:
        organizationChartEmployeesUIContext.newOrganizationChartEmployeeButtonClick,
      openDeleteOrganizationChartEmployeesDialog:
        organizationChartEmployeesUIContext.openDeleteOrganizationChartEmployeesDialog,
      openEditOrganizationChartEmployeePage:
        organizationChartEmployeesUIContext.openEditOrganizationChartEmployeePage,
      openUpdateOrganizationChartEmployeesStatusDialog:
        organizationChartEmployeesUIContext.openUpdateOrganizationChartEmployeesStatusDialog,
      openFetchOrganizationChartEmployeesDialog:
        organizationChartEmployeesUIContext.openFetchOrganizationChartEmployeesDialog,
    };
  }, [organizationChartEmployeesUIContext]);

  return (
    <Card>
      <CardHeader
        title={t("Common.List") + " " + t("OrganizationChartEmployee.Entity")}
      >
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={
              organizationChartEmployeesUIProps.newOrganizationChartEmployeeButtonClick
            }
          >
            {t("OrganizationChartEmployee.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrganizationChartEmployeesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OrganizationChartEmployeesUIConsumer>
        <OrganizationChartEmployeesTable />
      </CardBody>
    </Card>
  );
}
