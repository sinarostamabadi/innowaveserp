
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { ServiceItemsTable } from "./serviceItems-table/ServiceItemsTable";
import { useServiceItemsUIContext, ServiceItemsUIConsumer } from "./ServiceItemsUIContext";
import { useTranslation } from 'react-i18next';

export function ServiceItemsCard() {
  const { t } = useTranslation();

  const serviceItemsUIContext = useServiceItemsUIContext();

  const serviceItemsUIProps = useMemo(() => {
    return {
      ids: serviceItemsUIContext.ids,
      queryParams: serviceItemsUIContext.queryParams,
      setQueryParams: serviceItemsUIContext.setQueryParams,
      newServiceItemButtonClick: serviceItemsUIContext.newServiceItemButtonClick,
      openDeleteServiceItemsDialog: serviceItemsUIContext.openDeleteServiceItemsDialog,
      openEditServiceItemPage: serviceItemsUIContext.openEditServiceItemPage,
      openUpdateServiceItemsStatusDialog: serviceItemsUIContext.openUpdateServiceItemsStatusDialog,
      openFetchServiceItemsDialog: serviceItemsUIContext.openFetchServiceItemsDialog,
    };
  }, [serviceItemsUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("ServiceItem.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={serviceItemsUIProps.newServiceItemButtonClick}
          >
            {t("ServiceItem.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ServiceItemsUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </ServiceItemsUIConsumer>
        <ServiceItemsTable />
      </CardBody>
    </Card>
  );
}