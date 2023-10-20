
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ServiceActionsesTable } from "./serviceActionses-table/ServiceActionsesTable";
import { useServiceActionsesUIContext, ServiceActionsesUIConsumer } from "./ServiceActionsesUIContext";
import { useTranslation } from 'react-i18next';

export function ServiceActionsesCard() {
  const { t } = useTranslation();

  const serviceActionsesUIContext = useServiceActionsesUIContext();

  const serviceActionsesUIProps = useMemo(() => {
    return {
      ids: serviceActionsesUIContext.ids,
      queryParams: serviceActionsesUIContext.queryParams,
      setQueryParams: serviceActionsesUIContext.setQueryParams,
      newServiceActionsButtonClick: serviceActionsesUIContext.newServiceActionsButtonClick,
      openDeleteServiceActionsesDialog: serviceActionsesUIContext.openDeleteServiceActionsesDialog,
      openEditServiceActionsPage: serviceActionsesUIContext.openEditServiceActionsPage,
      openUpdateServiceActionsesStatusDialog: serviceActionsesUIContext.openUpdateServiceActionsesStatusDialog,
      openFetchServiceActionsesDialog: serviceActionsesUIContext.openFetchServiceActionsesDialog,
    };
  }, [serviceActionsesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ServiceActions.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={serviceActionsesUIProps.newServiceActionsButtonClick}
          >
            {t("ServiceActions.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ServiceActionsesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ServiceActionsesUIConsumer>
        <ServiceActionsesTable />
      </CardBody>
    </Card>
  );
}