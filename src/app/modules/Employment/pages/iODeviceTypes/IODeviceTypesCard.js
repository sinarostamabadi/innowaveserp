import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { IODeviceTypesTable } from "./iODeviceTypes-table/IODeviceTypesTable";
import {
  useIODeviceTypesUIContext,
  IODeviceTypesUIConsumer,
} from "./IODeviceTypesUIContext";
import { useTranslation } from "react-i18next";

export function IODeviceTypesCard() {
  const { t } = useTranslation();

  const iODeviceTypesUIContext = useIODeviceTypesUIContext();

  const iODeviceTypesUIProps = useMemo(() => {
    return {
      ids: iODeviceTypesUIContext.ids,
      queryParams: iODeviceTypesUIContext.queryParams,
      setQueryParams: iODeviceTypesUIContext.setQueryParams,
      newIODeviceTypeButtonClick:
        iODeviceTypesUIContext.newIODeviceTypeButtonClick,
      openDeleteIODeviceTypesDialog:
        iODeviceTypesUIContext.openDeleteIODeviceTypesDialog,
      openEditIODeviceTypePage: iODeviceTypesUIContext.openEditIODeviceTypePage,
      openUpdateIODeviceTypesStatusDialog:
        iODeviceTypesUIContext.openUpdateIODeviceTypesStatusDialog,
      openFetchIODeviceTypesDialog:
        iODeviceTypesUIContext.openFetchIODeviceTypesDialog,
    };
  }, [iODeviceTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + " " + t("IODeviceType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iODeviceTypesUIProps.newIODeviceTypeButtonClick}
          >
            {t("IODeviceType.Entity")} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IODeviceTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </IODeviceTypesUIConsumer>
        <IODeviceTypesTable />
      </CardBody>
    </Card>
  );
}
