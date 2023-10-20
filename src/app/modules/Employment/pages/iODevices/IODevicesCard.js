
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { IODevicesTable } from "./iODevices-table/IODevicesTable";
import { useIODevicesUIContext, IODevicesUIConsumer } from "./IODevicesUIContext";
import { useTranslation } from 'react-i18next';

export function IODevicesCard() {
  const { t } = useTranslation();

  const iODevicesUIContext = useIODevicesUIContext();

  const iODevicesUIProps = useMemo(() => {
    return {
      ids: iODevicesUIContext.ids,
      queryParams: iODevicesUIContext.queryParams,
      setQueryParams: iODevicesUIContext.setQueryParams,
      newIODeviceButtonClick: iODevicesUIContext.newIODeviceButtonClick,
      openDeleteIODevicesDialog: iODevicesUIContext.openDeleteIODevicesDialog,
      openEditIODevicePage: iODevicesUIContext.openEditIODevicePage,
      openUpdateIODevicesStatusDialog: iODevicesUIContext.openUpdateIODevicesStatusDialog,
      openFetchIODevicesDialog: iODevicesUIContext.openFetchIODevicesDialog,
    };
  }, [iODevicesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("IODevice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iODevicesUIProps.newIODeviceButtonClick}
          >
            {t("IODevice.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IODevicesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </IODevicesUIConsumer>
        <IODevicesTable />
      </CardBody>
    </Card>
  );
}