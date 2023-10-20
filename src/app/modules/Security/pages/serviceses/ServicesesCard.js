
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ServicesesTable } from "./serviceses-table/ServicesesTable";
import { useServicesesUIContext, ServicesesUIConsumer } from "./ServicesesUIContext";
import { useTranslation } from 'react-i18next';

export function ServicesesCard() {
  const { t } = useTranslation();

  const servicesesUIContext = useServicesesUIContext();

  const servicesesUIProps = useMemo(() => {
    return {
      ids: servicesesUIContext.ids,
      queryParams: servicesesUIContext.queryParams,
      setQueryParams: servicesesUIContext.setQueryParams,
      newServicesButtonClick: servicesesUIContext.newServicesButtonClick,
      openDeleteServicesesDialog: servicesesUIContext.openDeleteServicesesDialog,
      openEditServicesPage: servicesesUIContext.openEditServicesPage,
      openUpdateServicesesStatusDialog: servicesesUIContext.openUpdateServicesesStatusDialog,
      openFetchServicesesDialog: servicesesUIContext.openFetchServicesesDialog,
    };
  }, [servicesesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("Services.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={servicesesUIProps.newServicesButtonClick}
          >
            {t("Services.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ServicesesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ServicesesUIConsumer>
        <ServicesesTable />
      </CardBody>
    </Card>
  );
}