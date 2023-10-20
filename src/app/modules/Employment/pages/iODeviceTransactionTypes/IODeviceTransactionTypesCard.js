
import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../core/_partials/controls";
import { AdvancedFilter } from "../../../../../core/_partials/custom/advanced-filter/AdvancedFilter";
import { IODeviceTransactionTypesTable } from "./iODeviceTransactionTypes-table/IODeviceTransactionTypesTable";
import { useIODeviceTransactionTypesUIContext, IODeviceTransactionTypesUIConsumer } from "./IODeviceTransactionTypesUIContext";
import { useTranslation } from 'react-i18next';

export function IODeviceTransactionTypesCard() {
  const { t } = useTranslation();

  const iODeviceTransactionTypesUIContext = useIODeviceTransactionTypesUIContext();

  const iODeviceTransactionTypesUIProps = useMemo(() => {
    return {
      ids: iODeviceTransactionTypesUIContext.ids,
      queryParams: iODeviceTransactionTypesUIContext.queryParams,
      setQueryParams: iODeviceTransactionTypesUIContext.setQueryParams,
      newIODeviceTransactionTypeButtonClick: iODeviceTransactionTypesUIContext.newIODeviceTransactionTypeButtonClick,
      openDeleteIODeviceTransactionTypesDialog: iODeviceTransactionTypesUIContext.openDeleteIODeviceTransactionTypesDialog,
      openEditIODeviceTransactionTypePage: iODeviceTransactionTypesUIContext.openEditIODeviceTransactionTypePage,
      openUpdateIODeviceTransactionTypesStatusDialog: iODeviceTransactionTypesUIContext.openUpdateIODeviceTransactionTypesStatusDialog,
      openFetchIODeviceTransactionTypesDialog: iODeviceTransactionTypesUIContext.openFetchIODeviceTransactionTypesDialog,
    };
  }, [iODeviceTransactionTypesUIContext]);

  return (
    <Card>
      <CardHeader title={t("Common.List") + ' ' + t("IODeviceTransactionType.Entity")}>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={iODeviceTransactionTypesUIProps.newIODeviceTransactionTypeButtonClick}
          >
            {t("IODeviceTransactionType.Entity")} {' '} {t("Common.New")}
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <IODeviceTransactionTypesUIConsumer>
          {(dataUI) => <AdvancedFilter uiActions={dataUI} />}
        </IODeviceTransactionTypesUIConsumer>
        <IODeviceTransactionTypesTable />
      </CardBody>
    </Card>
  );
}