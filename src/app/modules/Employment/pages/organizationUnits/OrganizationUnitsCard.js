import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { OrganizationUnitsTable } from "./organizationUnits-table/OrganizationUnitsTable";
import {
  useOrganizationUnitsUIContext,
  OrganizationUnitsUIConsumer,
} from "./OrganizationUnitsUIContext";
import { useTranslation } from "react-i18next";

export function OrganizationUnitsCard() {
  const { t } = useTranslation();

  const organizationUnitsUIContext = useOrganizationUnitsUIContext();

  const organizationUnitsUIProps = useMemo(() => {
    return {
      ids: organizationUnitsUIContext.ids,
      queryParams: organizationUnitsUIContext.queryParams,
      setQueryParams: organizationUnitsUIContext.setQueryParams,
      newOrganizationUnitButtonClick:
        organizationUnitsUIContext.newOrganizationUnitButtonClick,
      openDeleteOrganizationUnitsDialog:
        organizationUnitsUIContext.openDeleteOrganizationUnitsDialog,
      openEditOrganizationUnitPage:
        organizationUnitsUIContext.openEditOrganizationUnitPage,
      openUpdateOrganizationUnitsStatusDialog:
        organizationUnitsUIContext.openUpdateOrganizationUnitsStatusDialog,
      openFetchOrganizationUnitsDialog:
        organizationUnitsUIContext.openFetchOrganizationUnitsDialog,
    };
  }, [organizationUnitsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("OrganizationUnit.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={organizationUnitsUIProps.newOrganizationUnitButtonClick}
          >
            {t("OrganizationUnit.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <OrganizationUnitsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </OrganizationUnitsUIConsumer>
        <OrganizationUnitsTable />
      </CardBody>
    </Card>
  );
}
