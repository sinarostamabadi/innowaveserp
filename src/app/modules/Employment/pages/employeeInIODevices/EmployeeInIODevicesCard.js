
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { EmployeeInIODevicesTable } from "./employeeInIODevices-table/EmployeeInIODevicesTable";
import { useEmployeeInIODevicesUIContext, EmployeeInIODevicesUIConsumer } from "./EmployeeInIODevicesUIContext";
import { useTranslation } from 'react-i18next';

export function EmployeeInIODevicesCard() {
  const { t } = useTranslation();

  const employeeInIODevicesUIContext = useEmployeeInIODevicesUIContext();

  const employeeInIODevicesUIProps = useMemo(() => {
    return {
      ids: employeeInIODevicesUIContext.ids,
      queryParams: employeeInIODevicesUIContext.queryParams,
      setQueryParams: employeeInIODevicesUIContext.setQueryParams,
      newEmployeeInIODeviceButtonClick: employeeInIODevicesUIContext.newEmployeeInIODeviceButtonClick,
      openDeleteEmployeeInIODevicesDialog: employeeInIODevicesUIContext.openDeleteEmployeeInIODevicesDialog,
      openEditEmployeeInIODevicePage: employeeInIODevicesUIContext.openEditEmployeeInIODevicePage,
      openUpdateEmployeeInIODevicesStatusDialog: employeeInIODevicesUIContext.openUpdateEmployeeInIODevicesStatusDialog,
      openFetchEmployeeInIODevicesDialog: employeeInIODevicesUIContext.openFetchEmployeeInIODevicesDialog,
    };
  }, [employeeInIODevicesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("EmployeeInIODevice.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={employeeInIODevicesUIProps.newEmployeeInIODeviceButtonClick}
          >
            {t("EmployeeInIODevice.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <EmployeeInIODevicesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </EmployeeInIODevicesUIConsumer>
        <EmployeeInIODevicesTable />
      </CardBody>
    </Card>
  );
}